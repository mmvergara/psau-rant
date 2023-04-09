export type Card = {
  card_id: string;
  card_term: string;
  card_definition: string;
};

export type CardSet = {
  card_set_id: string;
  card_set_name: string;
  card_set_author_id: string;
  card_set_cards: Card[];
};

export type CardExamConfig = {
  termFirst: boolean;
  activeCardId: string;
  actionDirection: "previous" | "next";
};

export type choiceLetters = "a" | "b" | "c" | "d";
export type ChoicesType = "term" | "definition";
export type CardQuiz = {
  card_choices: {
    a: string;
    b: string;
    c: string;
    d: string;
  };
  card_selected_choice: choiceLetters | null;
  card_correct_choice: choiceLetters;
  card_quiz_result: "correct" | "incorrect" | "unanswered";
} & Card;

export type AnsweredResults = {
  card_id: string;
  isCorrect: boolean;
  correct_answer: string;
  answer: string;
};
