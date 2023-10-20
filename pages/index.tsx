import Rants from "@/components/Rant/Rants";
import Head from "next/head";

function Home() {
  return (
    <>
      <Head>
        <title>PSAU Rant</title>
        <meta name="description" content="PSAU Rant" />
      </Head>
      <Rants />
    </>
  );
}

export default Home;
