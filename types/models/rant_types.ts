import { Timestamp } from "firebase/firestore";

export type RantNoId = {
  rant_title: string;
  rant_content: string;
  rant_author_username: string;
  rant_author_id: string;
  rant_likes: { [key: string]: boolean };
  rant_date: Timestamp;
};

export type RantWithId = {
  rant_id: string;
  rant_title: string;
  rant_content: string;
  rant_author_username: string;
  rant_author_id: string;
  rant_likes: { [key: string]: boolean };
  rant_date: Timestamp;
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
