export enum ArcanaType {
  Major = 'Major',
  Minor = 'Minor',
}

export enum Suit {
  Wands = 'Wands',
  Cups = 'Cups',
  Swords = 'Swords',
  Pentacles = 'Pentacles',
  None = 'None',
}

export interface ITarotCard {
  id: number;
  name: string;
  number: string; // "0", "I", "II", or "Ace", "2", etc.
  arcana: ArcanaType;
  suit: Suit;
  meaningUpright: string;
  meaningReversed: string;
  description: string;
  keywords: string[];
  image: string; // URL placeholder
}

export enum SpreadType {
  OneCard = 1,
  ThreeCard = 3,
  FiveCard = 5,
}

export interface IReadingCard {
  card: ITarotCard;
  isReversed: boolean;
  positionName: string; // e.g., "Past", "Present", "Future"
}

export interface ISpreadConfig {
  type: SpreadType;
  name: string;
  description: string;
  positions: string[];
}