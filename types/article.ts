export type Article = {
  id: string;
  title: string;
  description: string;
  thumbnail: URL;
  content: JSON;
  createdAt: number;
  writer: any;
  avatarUrl: URL;
};
