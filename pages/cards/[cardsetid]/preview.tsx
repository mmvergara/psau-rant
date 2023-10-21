import CardPreviewContent from "@/components/Cards/CardPreviewBox";
import CenterCircularProgress from "@/components/Layout/CenterCircularProgress";
import Head from "next/head";
import { useEffect, useState } from "react";
import { getCardSetById } from "@/firebase/services/cards_services";
import { Container } from "@mui/material";
import { useRouter } from "next/router";
import { CardSet } from "@/types/models/CardTypes";
import { toast } from "react-toastify";

const CardPreviewPage = () => {
  const router = useRouter();
  const handleDeleteCard = () => router.push("/cards");
  const cardsetid = router.query.cardsetid as string;
  const [cardSet, setCardSet] = useState<CardSet | null>(null);
  const fetchCardSet = async () => {
    const { data, error } = await getCardSetById(cardsetid);
    if (error) {
      toast.error(error);
      router.push("/cards");
    }
    console.log(data);
    if (data) return setCardSet(data);
    router.push("/cards");
  };
  useEffect(() => {
    fetchCardSet();
  }, []);

  return (
    <>
      <Head>
        <title>{cardSet?.card_set_name || "Card Preview"}</title>
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
