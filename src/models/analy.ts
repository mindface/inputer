
export interface Card {
  id: number;
  name: string;
  x: number;
  y: number;
  content: string;
  contentId: string;
}

export interface Cards {
  type: string;
  cards: Card[];
  card: (Card | object);
  setId: string;
}

export interface Card01 {
  category: string;
  valueS1: number;
  value1: number[];
  value2: number[];
  value3: number[];
}

export interface Card02 {
  ability1: string;
  value1: number;
  value2: number[];
}

export interface Card03 {
  category: string;
  value1: number;
  value2: number;
  value3: number;
}

export interface Card04 {
  category: string;
  value1: number;
  value2: number;
  value3: number;
  value4: number;
}

export interface Card05 {
  value1: number;
  value2: number;
  value3: number;
}

export interface Card06 {
  value1: number;
  value2: string;
}
