import BBSCardlist from "./components/BBSCardlist"; 
import { BBSData } from "./types/types";

async function getPosts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post`, {
      next: {
        revalidate: 60
      }
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch posts');
    }
    
    const data = await res.json();
    return data.posts || []; // 必ず配列を返すようにする
  } catch (error) {
    console.error('Error fetching posts:', error);
    return []; // エラー時は空配列を返す
  }
}

export default async function Home() {
  const posts = await getPosts();
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        {Array.isArray(posts) ? (
          posts.map((post: any) => (
            <div key={post.id}>
              {/* ポストの内容をレンダリング */}
            </div>
          ))
        ) : (
          <p>投稿がありません</p>
        )}
      </div>
    </main>
  );
}
