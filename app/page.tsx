import BBSCardlist from "./components/BBSCardlist"; 
import { BBSData } from "./types/types";

async function getData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post`, {
      cache: 'no-store'
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return []; // エラー時は空配列を返す
  }
}

export default async function Home() {
  const posts = await getData();

  return (
    <main >
      {/* データの表示処理 */}
      {Array.isArray(posts) ? (
        <BBSCardlist bbsAllData={posts} />
      ) : (
        <p>データの読み込み中...</p>
      )}
    </main>
  );
}
