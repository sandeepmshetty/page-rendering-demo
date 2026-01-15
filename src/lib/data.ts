export interface Post {
  id: number;
  title: string;
  body: string;
}

export interface UserMetric {
  label: string;
  value: string | number;
  trend: 'up' | 'down' | 'neutral';
}

// Simulated data fetching with artificial delays to demonstrate streaming
export async function getSlowData<T>(data: T, delay: number = 2000): Promise<T> {
  await new Promise((resolve) => setTimeout(resolve, delay));
  return data;
}

export async function getPosts(limit: number = 5): Promise<Post[]> {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`, {
    // Default to dynamic fetching unless specified otherwise
    cache: 'no-store'
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  
  return response.json();
}

export async function getUserMetrics(): Promise<UserMetric[]> {
  // Simulate an expensive DB query or multiple API calls
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  return [
    { label: 'Active Users', value: '1,284', trend: 'up' },
    { label: 'Conversion Rate', value: '3.4%', trend: 'up' },
    { label: 'Avg. Session', value: '4m 12s', trend: 'down' },
    { label: 'Server Health', value: '99.9%', trend: 'neutral' },
  ];
}
