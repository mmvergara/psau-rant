import CardsDashboard from "@/components/Cards/CardsDashboard";
import Head from "next/head";
const CardsPage = () => {
  return (
    <>
      <Head>
        <title>Cards</title>
        <meta name="description" content="My Cards" />
      </Head>
      <CardsDashboard />
    </>
  );
};
export default CardsPage;
