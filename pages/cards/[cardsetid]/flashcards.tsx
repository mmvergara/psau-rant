import FlashCardsSet from "@/components/Cards/FlashCards/FlashCardsSet";
import { Typography } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
const CardSetFlashCards = () => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    <>
      <Head>
        <title>PSAU Rant | Flash Cards</title>
        <meta name="description" content="Flash Cards" />
      </Head>
      <FlashCardsSet />
      {isMobile && (
        <Typography
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link
            href="/app"
            style={{
              color: "#0b4619",
              fontWeight: "bold",
            }}
          >
            Download Android App, for better experience
          </Link>
        </Typography>
      )}
    </>
  );
};
export default CardSetFlashCards;
