export interface Memory {
  id: string;
  title: string;
  description?: string;
  date: string;
  emoji?: string;
}

export interface User {
  id: string;
  name?: string;
  email: string;
  image?: string;
  bio?: string;
}
