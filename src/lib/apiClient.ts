// API Client for CVM TV
// Base URL: https://cvmapi.cvmtv.com/api

// Use proxy in development to avoid CORS issues
// In production, use the actual API URL
const API_BASE_URL = import.meta.env.DEV 
  ? '/api'  // In development, use Vite proxy
  : 'https://cvmapi.cvmtv.com/api'; // In production, use actual API URL

// Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string | boolean;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  type: 'email';
}

export interface SigninData {
  email: string;
  password: string;
  type?: 'email';
}

// User data structure from API
export interface UserData {
  id: number;
  firebase_id: string;
  name: string;
  type: string;
  email: string;
  mobile: string;
  profile: string;
  fcm_id: string;
  status: number;
  date: string;
  role: number;
  created_at: string;
  updated_at: string;
  token: string;
}

// API Auth Response structure
export interface AuthResponse {
  error: boolean;
  message: string;
  data: UserData;
}

// Error Handler
class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// API Client Class
class CVMApiClient {
  private baseURL: string;
  private token: string | null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.token = this.getStoredToken();
  }

  // Get stored token from localStorage
  private getStoredToken(): string | null {
    return localStorage.getItem('api_token');
  }

  // Store token in localStorage
  private setStoredToken(token: string): void {
    localStorage.setItem('api_token', token);
    this.token = token;
  }

  // Remove token from localStorage
  private removeStoredToken(): void {
    localStorage.removeItem('api_token');
    this.token = null;
  }

  // Generic request method with error handling
  private async request<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;

    // Default headers
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers,
    };

    // Add authorization header if token exists
    if (this.token) {
      (headers as any)['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        mode: 'cors', // Explicitly set CORS mode
        credentials: 'omit', // Don't send cookies with cross-origin requests
      });

      // Parse response
      let data;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      // Handle errors based on API response structure
      // The API returns {error: true/false, message: string, data: object}
      if (!response.ok || data?.error === true) {
        throw new ApiError(
          response.status,
          data?.message || data?.error || `HTTP Error: ${response.status}`,
          data
        );
      }

      return {
        success: true,
        data: data, // Keep the full response structure
        message: data?.message,
        error: data?.error,
      };
    } catch (error) {
      if (error instanceof ApiError) {
        return {
          success: false,
          error: error.message,
          data: error.data,
        };
      }

      // Network or other errors
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      };
    }
  }

  // GET request
  async get<T = any>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  // POST request
  async post<T = any>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  // PUT request
  async put<T = any>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  // DELETE request
  async delete<T = any>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  // PATCH request
  async patch<T = any>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  // ============================================
  // Authentication APIs
  // ============================================

  /**
   * Sign up a new user
   * POST /auth/signup
   */
  async signup(data: SignupData): Promise<ApiResponse<UserData>> {
    const response = await this.post<AuthResponse>('/auth/signup', data);
    
    if (response.success && response.data) {
      const userData = response.data.data as UserData;
      
      // Store token
      if (userData.token) {
        this.setStoredToken(userData.token);
      }
      
      // Store complete user data
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Store demoUser with name for compatibility
      localStorage.setItem('demoUser', JSON.stringify({ 
        email: userData.email,
        name: userData.name,
        id: userData.id,
        isLoggedIn: true 
      }));
      
      // Trigger user login event
      window.dispatchEvent(new Event('userLogin'));
      
      // Return the extracted user data
      return {
        success: true,
        data: userData,
        message: response.data?.message
      };
    }
    
    return {
      success: false,
      error: response.error || 'Signup failed'
    };
  }

  /**
   * Sign in an existing user
   * POST /auth/signin
   */
  async signin(data: SigninData): Promise<ApiResponse<UserData>> {
    const response = await this.post<AuthResponse>('/auth/signin', {
      ...data,
      type: data.type || 'email'
    });
    
    if (response.success && response.data) {
      const userData = response.data.data as UserData;
      
      // Store token
      if (userData.token) {
        this.setStoredToken(userData.token);
      }
      
      // Store complete user data
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Store demoUser with name for compatibility
      localStorage.setItem('demoUser', JSON.stringify({ 
        email: userData.email,
        name: userData.name,
        id: userData.id,
        isLoggedIn: true 
      }));
      
      // Trigger user login event
      window.dispatchEvent(new Event('userLogin'));
      
      // Return the extracted user data
      return {
        success: true,
        data: userData,
        message: response.data?.message
      };
    }
    
    return {
      success: false,
      error: response.error || 'Signin failed'
    };
  }

  /**
   * Sign out current user
   * POST /auth/signout
   */
  async signout(): Promise<ApiResponse> {
    const response = await this.post('/auth/signout');
    
    // Clear local storage regardless of API response
    this.removeStoredToken();
    localStorage.removeItem('user');
    localStorage.removeItem('demoUser');
    window.dispatchEvent(new Event('userLogin'));
    
    return response;
  }

  /**
   * Get current user profile
   * GET /auth/me or /user/profile
   */
  async getCurrentUser(): Promise<ApiResponse<UserData>> {
    return this.get('/auth/me');
  }

  /**
   * Get user by ID
   * GET /get_user_by_id/:id
   */
  async getUserById(userId: number): Promise<ApiResponse<UserData>> {
    return this.get(`/get_user_by_id/${userId}`);
  }

  /**
   * Get user data from localStorage
   */
  getStoredUser(): UserData | null {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }

  // ============================================
  // Stories/News APIs (customize as needed)
  // ============================================

  /**
   * Get all stories
   * GET /stories
   */
  async getStories(params?: {
    category?: string;
    limit?: number;
    page?: number;
    search?: string;
  }): Promise<ApiResponse> {
    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.append('category', params.category);
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.search) queryParams.append('search', params.search);

    const query = queryParams.toString();
    return this.get(`/stories${query ? `?${query}` : ''}`);
  }

  /**
   * Get single story by ID or slug
   * GET /stories/:id
   */
  async getStory(id: string): Promise<ApiResponse> {
    return this.get(`/stories/${id}`);
  }

  /**
   * Get stories by category
   * GET /stories/category/:category
   */
  async getStoriesByCategory(category: string, page: number = 1): Promise<ApiResponse> {
    return this.get(`/stories/category/${category}?page=${page}`);
  }

  /**
   * Get stories by author
   * GET /stories/author/:author
   */
  async getStoriesByAuthor(author: string): Promise<ApiResponse> {
    return this.get(`/stories/author/${encodeURIComponent(author)}`);
  }

  /**
   * Search stories
   * GET /stories/search
   */
  async searchStories(query: string): Promise<ApiResponse> {
    return this.get(`/stories/search?q=${encodeURIComponent(query)}`);
  }

  /**
   * Get featured sections with news
   * GET /get_featured_sections
   */
  async getFeaturedSections(params?: {
    language_id?: number;
    offset?: number;
    limit?: number;
    slug?: string;
    latitude?: string;
    longitude?: string;
    section_id?: string;
  }): Promise<ApiResponse> {
    const queryParams = new URLSearchParams();
    queryParams.append('language_id', (params?.language_id || 1).toString());
    queryParams.append('offset', (params?.offset || 0).toString());
    queryParams.append('limit', (params?.limit || 9).toString());
    if (params?.slug) queryParams.append('slug', params.slug);
    if (params?.latitude) queryParams.append('latitude', params.latitude);
    if (params?.longitude) queryParams.append('longitude', params.longitude);
    if (params?.section_id) queryParams.append('section_id', params.section_id);

    return this.get(`/get_featured_sections?${queryParams.toString()}`);
  }

  /**
   * Get categories
   * GET /get_category
   */
  async getCategories(params?: {
    language_id?: number;
    offset?: number;
    limit?: number;
  }): Promise<ApiResponse> {
    const queryParams = new URLSearchParams();
    queryParams.append('language_id', (params?.language_id || 1).toString());
    queryParams.append('offset', (params?.offset || 0).toString());
    queryParams.append('limit', (params?.limit || 15).toString());

    return this.get(`/get_category?${queryParams.toString()}`);
  }

  /**
   * Get news by category slug
   * GET /get_news
   */
  async getNewsByCategory(params: {
    category_slug: string;
    language_id?: number;
    offset?: number;
    limit?: number;
  }): Promise<ApiResponse> {
    const queryParams = new URLSearchParams();
    queryParams.append('category_slug', params.category_slug);
    queryParams.append('language_id', (params?.language_id || 1).toString());
    queryParams.append('offset', (params?.offset || 0).toString());
    queryParams.append('limit', (params?.limit || 20).toString());

    return this.get(`/get_news?${queryParams.toString()}`);
  }
  async getHeadlineCategory(params: {
    category_slug: string;
    language_id?: number;
    offset?: number;
    limit?: number;
  }): Promise<ApiResponse> {
    const queryParams = new URLSearchParams();
    queryParams.append('category_slug', params.category_slug);
    queryParams.append('language_id', (params?.language_id || 1).toString());
    queryParams.append('offset', (params?.offset || 0).toString());
    queryParams.append('limit', (params?.limit || 20).toString());

    return this.get(`/get_news?${queryParams.toString()}&is_headline=1`);
  }

  /**
   * Get news by slug (for detail page)
   * GET /get_news
   */
  async getNewsBySlug(params: {
    slug: string;
    language_id?: number;
  }): Promise<ApiResponse> {
    const queryParams = new URLSearchParams();
    queryParams.append('slug', params.slug);
    queryParams.append('language_id', (params?.language_id || 1).toString());
    queryParams.append('offset', '0');
    queryParams.append('limit', '1');
     return this.get(`/get_news?${queryParams.toString()}`);
  }

  /**
   * Get news by tag slug
   * GET /get_news
   */
  async getNewsByTag(params: {
    tag_slug: string;
    language_id?: number;
    offset?: number;
    limit?: number;
  }): Promise<ApiResponse> {
    const queryParams = new URLSearchParams();
    queryParams.append('tag_slug', params.tag_slug);
    queryParams.append('language_id', (params?.language_id || 1).toString());
    queryParams.append('offset', (params?.offset || 0).toString());
    queryParams.append('limit', (params?.limit || 20).toString());

    return this.get(`/get_news?${queryParams.toString()}`);
  }

  /**
   * Search news by query
   * GET /get_news
   */
  async searchNews(params: {
    q: string;
    language_id?: number;
    offset?: number;
    limit?: number;
  }): Promise<ApiResponse> {
    const queryParams = new URLSearchParams();
    queryParams.append('search', params.q);
    queryParams.append('language_id', (params?.language_id || 1).toString());
    queryParams.append('offset', (params?.offset || 0).toString());
    queryParams.append('limit', (params?.limit || 10).toString());

    return this.get(`/get_news?${queryParams.toString()}`);
  }

  /**
   * Get breaking news
   * GET /get_breaking_news
   */
  async getBreakingNews(params?: {
    language_id?: number;
    slug?: string;
    offset?: number;
    limit?: number;
  }): Promise<ApiResponse> {
    const queryParams = new URLSearchParams();
    queryParams.append('language_id', (params?.language_id || 1).toString());
    queryParams.append('slug', params?.slug || '');
    queryParams.append('offset', (params?.offset || 0).toString());
    queryParams.append('limit', (params?.limit || 10).toString());
    queryParams.append('is_headline', '1');

    return this.get(`/get_breaking_news?${queryParams.toString()}`);
  }
  async getBreakingNewsHeadlines(params?: {
    language_id?: number;
    slug?: string;
    offset?: number;
    limit?: number;
  }): Promise<ApiResponse> {
    const queryParams = new URLSearchParams();
    queryParams.append('language_id', (params?.language_id || 1).toString());
    queryParams.append('slug', params?.slug || '');
    queryParams.append('offset', (params?.offset || 0).toString());
    queryParams.append('limit', (params?.limit || 10).toString());
    queryParams.append('is_headline', '1');

    return this.get(`/get_breaking_news?${queryParams.toString()}&is_headline=1`);
  }

  /**
   * Set like/dislike for news
   * POST /set_like_dislike
   * REQUIRES AUTHENTICATION
   */
  async setLikeDislike(data: {
    news_id: number;
    status: 1 | 0; // 1 = like, 0 = remove like/dislike
  }): Promise<ApiResponse> {
    return this.post('/set_like_dislike', data);
  }

  // ============================================
  // User Profile APIs
  // ============================================

  /**
   * Update user profile
   * POST /update_profile
   */
  async updateProfile(data: {
    name: string;
    email: string;
    mobile: string;
  }): Promise<ApiResponse> {
    return this.post('/update_profile', data);
  }

  /**
   * Change password
   * POST /user/change-password
   */
  async changePassword(data: {
    current_password: string;
    new_password: string;
    new_password_confirmation: string;
  }): Promise<ApiResponse> {
    return this.post('/user/change-password', data);
  }

  // ============================================
  // Favorites APIs
  // ============================================

  /**
   * Get user favorites
   * GET /user/favorites
   */
  async getFavorites(): Promise<ApiResponse> {
    return this.get('/user/favorites');
  }

  /**
   * Add to favorites
   * POST /user/favorites
   */
  async addFavorite(storyId: string): Promise<ApiResponse> {
    return this.post('/user/favorites', { story_id: storyId });
  }

  /**
   * Remove from favorites
   * DELETE /user/favorites/:id
   */
  async removeFavorite(storyId: string): Promise<ApiResponse> {
    return this.delete(`/user/favorites/${storyId}`);
  }
  
  async userViewCount(news_id: number): Promise<ApiResponse> {
    return this.post('/set_news_view', { news_id });
  }

  async userBreakingNewsViewCount(breaking_news_id: number): Promise<ApiResponse> {
    return this.post('/set_breaking_news_view', { breaking_news_id });
  }

  async setBookmark(data: {
    news_id: number;
    status: number;
  }): Promise<ApiResponse> {
    return this.post(`/set_bookmark`, data);
  }
  async deleteBookmark(news_id: number): Promise<ApiResponse> {
    // Always set status to 0 when deleting bookmark
    return this.post('/set_bookmark', { news_id, status: 0 });
  }

  async getBookmarks(params: {
    language_id?: number;
    offset?: number;
    limit?: number;
  }): Promise<ApiResponse> {
    const queryParams = new URLSearchParams();
    
    queryParams.append('language_id', (params?.language_id || 1).toString());
    queryParams.append('offset', (params?.offset || 0).toString());
    queryParams.append('limit', (params?.limit || 20).toString());

    return this.get(`/get_bookmark?${queryParams.toString()}`);
  }
 
 
  // ============================================
  // Utility Methods
  // ============================================

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.token;
  }

  /**
   * Get current token
   */
  getToken(): string | null {
    return this.token;
  }

  /**
   * Manually set token
   */
  setToken(token: string): void {
    this.setStoredToken(token);
  }
}

// Export singleton instance
export const apiClient = new CVMApiClient(API_BASE_URL);

// Export class for testing or multiple instances
export default CVMApiClient;

