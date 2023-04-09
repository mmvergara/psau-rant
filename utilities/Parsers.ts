import { Card, CardQuiz } from "@/types/models/card_types";

const findTheCorrectChoice = (
  choices: CardQuiz["card_choices"],
  choiceType: "card_term" | "card_definition",
  card: Card
) => {
  const choiceLetters: ["a", "b", "c", "d"] = ["a", "b", "c", "d"];
  let correctChoice: "a" | "b" | "c" | "d" | undefined = undefined;
  console.log(choiceLetters, choices, choiceType, card);
  if (choiceType === "card_term") {
    correctChoice = choiceLetters.find(
      (letter) => choices[letter] === card.card_term
    );
  } else {
    correctChoice = choiceLetters.find(
      (letter) => choices[letter] === card.card_definition
    );
  }

  if (!correctChoice) throw new Error("Could not find the correct choice");
  return correctChoice;
};

export const generateCardQuiz = (
  cards: Card[],
  choicesType: string
): CardQuiz[] => {
  const choiceLetters: ["a", "b", "c", "d"] = ["a", "b", "c", "d"];
  const choicetype =
    choicesType === "card_term" ? "card_term" : "card_definition";

  // Shuffle the cards array
  const cardQuizzes: CardQuiz[] = [];

  // Loop through the shuffled cards and create a CardQuiz for each one
  cards.forEach((card, index) => {
    const card_choices = {
      a: choicetype === "card_term" ? card.card_term : card.card_definition,
      b: "",
      c: "",
      d: "",
    };

    // Find 3 other cards that aren't the current one
    const otherCards = cards.filter((_, otherIndex) => otherIndex !== index);

    // Shuffle the other cards and take the first three
    const shuffledOtherCards = otherCards
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    // Add the other cards to the choices object
    shuffledOtherCards.forEach((otherCard, otherIndex) => {
      card_choices[choiceLetters[otherIndex + 1]] =
        choicetype === "card_term"
          ? otherCard.card_term
          : otherCard.card_definition;
    });

    // Shuffle the choices
    const shuffledChoices = choiceLetters.sort(() => Math.random() - 0.5);

    // Create a new choices object with the shuffled choices
    const newCardChoices = {
      a: card_choices[shuffledChoices[0]] || "None",
      b: card_choices[shuffledChoices[1]] || "None",
      c: card_choices[shuffledChoices[2]] || "None",
      d: card_choices[shuffledChoices[3]] || "None",
    };
    // Find the correct choice letter
    const correctChoice = findTheCorrectChoice(
      newCardChoices,
      choicetype,
      card
    );

    // Create the CardQuiz object
    const cardQuiz: CardQuiz = {
      ...card,
      card_choices: newCardChoices,
      card_correct_choice: correctChoice,
      card_selected_choice: null,
      card_quiz_result: "unanswered",
    };

    // Add the CardQuiz object to the array
    cardQuizzes.push(cardQuiz);
  });

  return cardQuizzes;
};
