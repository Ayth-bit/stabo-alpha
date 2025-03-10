import BBSCardlist from "./components/BBSCardlist"; 
import { BBSData } from "./types/types";

async function getData() {
  try {
    // 絶対URLを使用
    const url = process.env.NEXT_PUBLIC_API_URL || 'https://www.stabo.world';
    const res = await fetch(`${url}/api/post`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status}`);
    }

    const data = await res.json();
    console.log('Fetched data:', data); // デバッグ用
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

export default async function Home() {
  const posts = await getData();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      {Array.isArray(posts) && posts.length > 0 ? (
        <div className="grid gap-4">
          {posts.map((post: any) => (
            <div key={post.id} className="border p-4 rounded">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-gray-600">{post.content}</p>
              <p className="text-sm text-gray-500">By: {post.username}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}
