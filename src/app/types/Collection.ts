export interface Collection {
  id: string;
  icon: string; // emoji or icon string
  title: string;
  type: string; // "Collection" or "Bookmark"
  owner: string; // user ID
  visibility: string; // Featured, Public, Private
  created: string; // date string
  count: number; // number of items
  modified: string; // date string
  linkedTo?: string; // optional linked collection
  actions?: string; // placeholder for actions
}
