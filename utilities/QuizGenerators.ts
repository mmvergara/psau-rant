import { Card, CardQuiz, ChoicesType } from "@/types/models/card_types";

export const generateCardQuiz = (
  cards: Card[],
  choicesType: ChoicesType
): CardQuiz[] => {
  const QuizCards: CardQuiz[] = [];
  for (let i = 0; i < cards.length; i++) {
    QuizCards.push({
      ...cards[i],
      card_choices: generateChoices(cards[i], cards, choicesType),
    });
  }
  return QuizCards;
};

const generateChoices = (
  Card: Card,
  Cards: Card[],
  choicesType: ChoicesType
): CardQuiz["card_choices"] => {
  // Create a new object with the correct answer on aa
  const finalChoices = {
    a: Card[`card_${choicesType}`],
    b: "",
    c: "",
    d: "",
  };

  const letterChoices: ["a", "b", "c", "d"] = ["a", "b", "c", "d"];
  const letterChoicesNoA: ["b", "c", "d"] = ["b", "c", "d"];
  const filteredCards = Cards.filter((card) => card.card_id !== Card.card_id);
  const cardChoices = filteredCards.map((card) => card[`card_${choicesType}`]);
  const shuffledCardChoices = cardChoices.sort(() => Math.random() - 0.5);

  letterChoicesNoA.forEach((letter, i) => {
    finalChoices[letter] = shuffledCardChoices[i];
  });

  // shuffle values in finalChoices
  const shuffledChoices = letterChoices.sort(() => Math.random() - 0.5);
  const newCardChoices = {
    a: finalChoices[shuffledChoices[0]],
    b: finalChoices[shuffledChoices[1]],
    c: finalChoices[shuffledChoices[2]],
    d: finalChoices[shuffledChoices[3]],
  };
  return newCardChoices;
};
