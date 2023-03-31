import Card from "@/components/cards/Card";
import { useState } from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

const CardSetExamPage: React.FC = () => {
  const cardData = [
    {
      card_id: "1",
      card_term: "React",
      card_definition: "A JavaScript library for building user interfaces.",
    },
    {
      card_id: "2",
      card_term: "Node.js",
      card_definition:
        "A JavaScript runtime built on Chrome's V8 JavaScript engine.",
    },
    {
      card_id: "3",
      card_term: "HTML",
      card_definition:
        "Hypertext Markup Language is the standard markup language for creating web pages and web applications.",
    },
    {
      card_id: "4",
      card_term: "CSS",
      card_definition:
        "Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in HTML or XML.",
    },
    {
      card_id: "5",
      card_term: "JavaScript",
      card_definition:
        "A high-level, interpreted programming language that conforms to the ECMAScript specification.",
    },
    {
      card_id: "6",
      card_term: "JSON",
      card_definition:
        "JavaScript Object Notation is an open standard format that uses human-readable text to transmit data objects consisting of attribute–value pairs.",
    },
  ];

  const [config, setConfig] = useState({
    termFirst: true,
    activeCardId: "1",
  });

  const showNextCard = () => {
    const nextCardId = cardData.findIndex(
      (card) => card.card_id === config.activeCardId
    );
    if (nextCardId + 1 >= cardData.length) return;
    setConfig({ ...config, activeCardId: cardData[nextCardId + 1].card_id });
  };
  const showPreviousCard = () => {
    const nextCardId = cardData.findIndex(
      (card) => card.card_id === config.activeCardId
    );
    if (nextCardId - 1 < 0) return;
    setConfig({ ...config, activeCardId: cardData[nextCardId - 1].card_id });
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        pt: 3,
      }}
    >
      {cardData.map((card) => {
        return <Card cardData={card} config={config} />;
      })}
      <Button onClick={showNextCard}>next card</Button>
      <Button onClick={showPreviousCard}>previous card</Button>
    </Container>
  );
};

export default CardSetExamPage;
