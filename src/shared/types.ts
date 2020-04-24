export type Reward = {
  caption: string;
  description: string;
  image: string;
  value: number;
  owner: string;
  status: 0 | 1;
  totalAmount: number;
  resultsAmount: number;
  number: number;
  expirationDate: number;
}

export type Partner = {
  account: string;
  name: string;
  description: string;
  logo: string;
  number: number;
}

export type Task = {
  caption: string;
  image: string;
  description: string;
  value: number;
  owner: string;
  expirationDate?: string;
};
