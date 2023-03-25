export type Rant = {
  rant_id: string;
  rant_content: string;
  rant_author: string;
  rant_date: string;
};

export type RantComment = {
  rant_comment_id: string;
  rant_comment_content: string;
  rant_comment_author: string;
};

export type RantLike = {
  rant_like_id: string;
  rant_like_author: string;
};
