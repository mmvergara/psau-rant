import Rants from "@/components/Rant/Rants";
import Head from "next/head";

type Props = {
  title: string;
  description: string;
};

function Home({ title, description }: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <Rants />
    </>
  );
}

export async function getServerSideProps() {
  console.log("getStaticProps");
  return {
    props: {
      title: "PSAU Rant",
      description: "PSAU Rant",
    },
  };
}

export default Home;
