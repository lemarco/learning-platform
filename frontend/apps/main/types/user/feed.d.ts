export interface UserFeedEntry {
  author: string;
  avatar: string;
  time: string;
  message: string;
  attachments?: string[];
  numComments: number;
  numLikes: number;
}
