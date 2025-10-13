import { useState } from 'react';
import { apiClient } from '../lib/apiClient';

export function ApiDebugPage() {
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testLogin = async () => {
    setLoading(true);
    try {
      const result = await apiClient.signin({
        email: 'ladinawan4@gmail.com',
        password: 'password123',
        type: 'email'
      });
      
      console.log('Full response:', result);
      setResponse(result);
    } catch (error) {
      console.error('Error:', error);
      setResponse({ error: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setLoading(false);
    }
  };

  const testGetUser = async () => {
    setLoading(true);
    try {
      const result = await apiClient.getUserById(304);
      console.log('Get user response:', result);
      setResponse(result);
    } catch (error) {
      console.error('Error:', error);
      setResponse({ error: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            API Debug Page
          </h1>
          
          <div className="space-y-4 mb-6">
            <button
              onClick={testLogin}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Testing...' : 'Test Login API'}
            </button>
            
            <button
              onClick={testGetUser}
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 ml-4"
            >
              {loading ? 'Testing...' : 'Test Get User API'}
            </button>
          </div>

          {response && (
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                API Response:
              </h3>
              <pre className="text-sm text-gray-800 dark:text-gray-200 overflow-auto">
                {JSON.stringify(response, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
