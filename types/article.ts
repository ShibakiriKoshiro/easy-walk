export type Article = {
  id: string;
  title: string;
  description: string;
  thumbnail?: URL;
  content: JSON;
  createdAt: number;
  writerId: string;
  isPublic: boolean;
  category: string;
};
