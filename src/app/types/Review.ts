export interface Review {
  id: string;
  user: string;
  product: string;
  rating: number;
  comment: string;
  created: string;
  itemTitle?: string;
  itemId?: string;
  itemImage?: string;
  userFullName?: string;
  userEmail?: string;
  userImage?: string;
  reason?: string;
  fullComment?: string;
  contentType?: string;
  status?: string;
}