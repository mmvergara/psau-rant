import Rants from "@/components/Rant/Rants";
import Head from "next/head";

function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Rants />
    </>
  );
}

export default Home;
