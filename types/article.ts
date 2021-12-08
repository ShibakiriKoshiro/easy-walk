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
  writer: string;
  // 編集部(サイト運営者の記事のみ)
  spotId: string | null;
  spotName: string | null;
  spotArticleId: string | null;
  spotCategory: string | null;
};
