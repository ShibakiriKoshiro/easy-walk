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
  // 編集部(サイト運営者の記事のみ)
  spot: string;
};
