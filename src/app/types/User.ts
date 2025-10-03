export type UserStatus = "Active" | "Pending" | "Suspended";

export type User = {
  id: string;
  avatar: string;
  name: string;
  email: string;
  role: string;
  joined: string;
  status: UserStatus;
  ip: string;
  tags: string[];
};