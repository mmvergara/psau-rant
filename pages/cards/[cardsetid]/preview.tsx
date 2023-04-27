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
        <title>{cardSet?.card_set_name || "Card Preview"}</title>
        <meta
          property="og:title"
          content={cardSet?.card_set_name || "Card Preview"}
        />
        <meta
          property="og:description"
          content="Description of the card set being previewed"
        />
        <meta
          property="og:url"
          content={`https://psaurant.vercel.app/cards/${cardSet?.card_set_id}`}
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
