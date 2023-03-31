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
