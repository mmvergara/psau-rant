import CardPreviewContent from "@/components/Cards/CardPreviewBox";
import CenterCircularProgress from "@/components/Layout/CenterCircularProgress";
import Head from "next/head";
import { getCardSetById } from "@/firebase/services/cards_services";
import { Container } from "@mui/material";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const cardsetid = context.query.cardsetid as string;
  const { data, error } = await getCardSetById(cardsetid);
  if (error) {
    toast.error(error);
    return {
      redirect: {
        destination: "/cards",
        permanent: false,
      },
    };
  }
  return {
    props: {
      cardSet: data,
    },
  };
}

const CardPreviewPage = ({
  cardSet,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const handleDeleteCard = () => router.push("/cards");
  return (
    <>
      <Head>
        <title>Flash Cards | {cardSet?.card_set_name || "Card Preview"}</title>
        <meta
          property="og:title"
          content={`Flash Cards ${cardSet?.card_set_name}` || "Card Preview"}
        />
        <meta
          property="og:description"
          content={`Flash Cards ${cardSet?.card_set_name}` || "Card Preview"}
        />
        <meta
          name="description"
          content={`Flash Cards ${cardSet?.card_set_name}` || "Card Preview"}
        />
        <meta
          name="title"
          content={`Flash Cards ${cardSet?.card_set_name}` || "Card Preview"}
        />
      </Head>
      {cardSet ? (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
          <CardPreviewContent
            cardSet={cardSet}
            onCardDelete={handleDeleteCard}
          />
        </Container>
      ) : (
        <CenterCircularProgress />
      )}
    </>
  );
};

export default CardPreviewPage;
