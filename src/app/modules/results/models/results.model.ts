export interface User {
  id?: string;
  name: string;
  score: number;
}

export interface Times {
  short: Array<User>;
  medium: Array<User>;
  long: Array<User>;
}

export interface BestResults {
  easy: Times;
  hard: Times;
  medium: Times;
}

export interface UserResults {
  score: number;
  time: number;
  level: string;
}

export interface ResultToSend {
  level: string;
  user: User;
  time: number;
}
