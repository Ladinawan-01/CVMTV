// API Types for CVM TV

export interface NewsArticle {
  id: number;
  language_id: number;
  category_id: number;
  subcategory_id: number;
  tag_id: string;
  location_id: number;
  title: string;
  slug: string;
  image: string;
  date: string;
  published_date: string;
  content_type: string;
  content_value: string;
  description: string;
  user_id: number;
  admin_id: number;
  show_till: string;
  status: number;
  is_clone: number;
  counter: number;
  meta_title: string;
  meta_description: string;
  meta_keyword: string;
  schema_markup: string;
  created_at: string;
  updated_at: string;
  category_name: string;
  subcategory_name: string;
  distance: any;
  like: number;
  total_like: number;
  total_bookmark: number;
  bookmark: number;
  total_views: number;
  viewcount?: number;
  tag_name: string;
  tag: any[];
  images: any[];
}

export interface AdSpace {
  id: number;
  language_id: number;
  ad_space: string;
  ad_featured_section_id: number;
  ad_image: string;
  web_ad_image: string;
  ad_url: string;
  date: string;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface FeaturedSection {
  id: number;
  language_id: number;
  title: string;
  slug: string;
  short_description: string;
  news_type: string;
  videos_type: string;
  filter_type: string;
  category_ids: string;
  subcategory_ids: string;
  news_ids: string;
  style_app: string;
  style_web: string;
  color: string | null;
  row_order: number;
  status: number;
  is_based_on_user_choice: number;
  meta_title: string;
  meta_description: string;
  meta_keyword: string;
  schema_markup: string;
  og_image: string;
  created_at: string;
  updated_at: string;
  news_total: number;
  news: NewsArticle[];
  ad_spaces: AdSpace[];
}

export interface FeaturedSectionsResponse {
  error: boolean;
  total: number;
  data: FeaturedSection[];
}

