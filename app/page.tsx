import BBSCardlist from "./components/BBSCardlist"; 
import { BBSData } from "./types/types";

async function getAllBBSData  () {
  const response = await fetch("https://main.d27a8yuw905j7z.amplifyapp.com/api/post", {
    cache : "no-store",
  });
  const bbsAllData: BBSData[] = await response.json();
  return bbsAllData;
}

export default async function Home() {
  const bbsAllData = await getAllBBSData();
  return (
    <main >
      <BBSCardlist bbsAllData = {bbsAllData}/>
    </main>
  );
}
