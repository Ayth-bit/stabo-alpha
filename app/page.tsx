import BBSCardlist from "./components/BBSCardlist"; 

export default async function Home() {
  const response = await fetch("http://localhost:3000/api/post", {
    cache : "no-store",
  });
  const BBSAllData = await response.json();
  console.log(BBSAllData);
  return (
    <main >
      <BBSCardlist />
    </main>
  );
}
