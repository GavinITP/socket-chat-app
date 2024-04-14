export interface UserType {
  name: string;
  email: string;
}

export interface ChatType {
  isGroupChat: boolean;
  users: UserType[];
  _id: string;
  chatName: string;
  groupAdmin?: UserType;
}
