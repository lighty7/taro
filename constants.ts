import { ArcanaType, ITarotCard, Suit, ISpreadConfig, SpreadType } from './types';

// Helper to generate image URL using sacred-texts assets (Rider-Waite-Smith)
const getImg = (id: number, arcana: ArcanaType, suit: Suit, numberStr: string): string => {
  const baseUrl = "https://www.sacred-texts.com/tarot/pkt/img";
  
  // Major Arcana: ar00.jpg ... ar21.jpg
  if (arcana === ArcanaType.Major) {
    const num = id.toString().padStart(2, '0');
    return `${baseUrl}/ar${num}.jpg`;
  }

  // Minor Arcana
  let suitPrefix = "";
  switch(suit) {
    case Suit.Wands: suitPrefix = "wa"; break;
    case Suit.Cups: suitPrefix = "cu"; break;
    case Suit.Swords: suitPrefix = "sw"; break;
    case Suit.Pentacles: suitPrefix = "pe"; break;
  }

  let rankSuffix = "";
  if (numberStr === "Ace") rankSuffix = "ac";
  else if (numberStr === "Page") rankSuffix = "pa";
  else if (numberStr === "Knight") rankSuffix = "kn";
  else if (numberStr === "Queen") rankSuffix = "qu";
  else if (numberStr === "King") rankSuffix = "ki";
  else rankSuffix = parseInt(numberStr).toString().padStart(2, '0');

  return `${baseUrl}/${suitPrefix}${rankSuffix}.jpg`;
};

// Helper for Major Arcana quick generation in the list below
const getMajor = (id: number) => getImg(id, ArcanaType.Major, Suit.None, "");

export const TAROT_DECK: ITarotCard[] = [
  // Major Arcana
  { id: 0, name: "The Fool", number: "0", arcana: ArcanaType.Major, suit: Suit.None, meaningUpright: "New beginnings, optimism, trust in life", meaningReversed: "Recklessness, being taken advantage of, inconsideration", description: "The Fool represents new beginnings, having faith in the future, being inexperienced, not knowing what to expect, having beginner's luck, improvisation and believing in the universe.", keywords: ["Beginnings", "Freedom", "Innocence"], image: getMajor(0) },
  { id: 1, name: "The Magician", number: "I", arcana: ArcanaType.Major, suit: Suit.None, meaningUpright: "Action, the power to manifest", meaningReversed: "Manipulation, poor planning, latent talents", description: "The Magician is one of the Major Arcana cards in tarot decks. He represents manifestation, resourcefulness, power, inspired action.", keywords: ["Power", "Skill", "Action"], image: getMajor(1) },
  { id: 2, name: "The High Priestess", number: "II", arcana: ArcanaType.Major, suit: Suit.None, meaningUpright: "Intuition, higher powers, mystery, subconscious mind", meaningReversed: "Hidden agendas, need to listen to inner voice", description: "She sits in front of the thin veil of awareness, which is all that separates us from the inner within.", keywords: ["Intuition", "Mystery", "Subconscious"], image: getMajor(2) },
  { id: 3, name: "The Empress", number: "III", arcana: ArcanaType.Major, suit: Suit.None, meaningUpright: "Fertility, femininity, beauty, nature, abundance", meaningReversed: "Creative block, dependence on others", description: "The Empress is a mother, a creator, and a nurturer. She invites you to connect with your feminine energy.", keywords: ["Fertility", "Nature", "Abundance"], image: getMajor(3) },
  { id: 4, name: "The Emperor", number: "IV", arcana: ArcanaType.Major, suit: Suit.None, meaningUpright: "Authority, structure, control, fatherhood", meaningReversed: "Domination, excessive control, lack of discipline", description: "The Emperor represents the strategic thinker who sets out plans that he must see through.", keywords: ["Authority", "Structure", "Control"], image: getMajor(4) },
  { id: 5, name: "The Hierophant", number: "V", arcana: ArcanaType.Major, suit: Suit.None, meaningUpright: "Religion, group identification, conformity, tradition, beliefs", meaningReversed: "Restriction, challenging the status quo", description: "The Hierophant is a very conventional card, often representing religious or spiritual authority.", keywords: ["Tradition", "Conformity", "Morality"], image: getMajor(5) },
  { id: 6, name: "The Lovers", number: "VI", arcana: ArcanaType.Major, suit: Suit.None, meaningUpright: "Love, union, relationships, values alignment, choices", meaningReversed: "Disharmony, imbalance, misalignment of values", description: "The Lovers represent relationships and choices. Its appearance in a spread indicates some decision about an existing relationship.", keywords: ["Love", "Union", "Choices"], image: getMajor(6) },
  { id: 7, name: "The Chariot", number: "VII", arcana: ArcanaType.Major, suit: Suit.None, meaningUpright: "Control, will power, victory, assertion, determination", meaningReversed: "Lack of control and direction, aggression", description: "The Chariot represents overcoming obstacles through determination, focus, and willpower.", keywords: ["Victory", "Willpower", "Control"], image: getMajor(7) },
  { id: 8, name: "Strength", number: "VIII", arcana: ArcanaType.Major, suit: Suit.None, meaningUpright: "Strength, courage, persuasion, influence, compassion", meaningReversed: "Inner weakness, self-doubt, low energy, raw emotion", description: "Strength predicts the triumphant conclusion to a major life problem, situation or temptation through strength of character.", keywords: ["Courage", "Persuasion", "Influence"], image: getMajor(8) },
  { id: 9, name: "The Hermit", number: "IX", arcana: ArcanaType.Major, suit: Suit.None, meaningUpright: "Soul-searching, introspection, being alone, inner guidance", meaningReversed: "Isolation, loneliness, withdrawal", description: "The Hermit suggests that you are in a phase of introspection where you are drawing your attention inwards.", keywords: ["Introspection", "Solitude", "Guidance"], image: getMajor(9) },
  { id: 10, name: "Wheel of Fortune", number: "X", arcana: ArcanaType.Major, suit: Suit.None, meaningUpright: "Good luck, karma, life cycles, destiny, a turning point", meaningReversed: "Bad luck, negative external forces, out of control", description: "The Wheel of Fortune reminds you that the wheel is always turning and life is in a state of constant change.", keywords: ["Luck", "Karma", "Destiny"], image: getMajor(10) },
  { id: 11, name: "Justice", number: "XI", arcana: ArcanaType.Major, suit: Suit.None, meaningUpright: "Justice, fairness, truth, cause and effect, law", meaningReversed: "Unfairness, lack of accountability, dishonesty", description: "Justice represents cause and effect, indicating that all actions have consequences.", keywords: ["Fairness", "Truth", "Law"], image: getMajor(11) },
  { id: 12, name: "The Hanged Man", number: "XII", arcana: ArcanaType.Major, suit: Suit.None, meaningUpright: "Pause, surrender, letting go, new perspectives", meaningReversed: "Delays, resistance, stalling, indecision", description: "The Hanged Man indicates that you are in a suspended state, waiting for a new path to be revealed.", keywords: ["Pause", "Surrender", "Perspective"], image: getMajor(12) },
  { id: 13, name: "Death", number: "XIII", arcana: ArcanaType.Major, suit: Suit.None, meaningUpright: "Endings, change, transformation, transition", meaningReversed: "Resistance to change, personal transformation, inner purging", description: "Death represents not a physical death, but an ending to something that no longer serves you.", keywords: ["Endings", "Change", "Transformation"], image: getMajor(13) },
  { id: 14, name: "Temperance", number: "XIV", arcana: ArcanaType.Major, suit: Suit.None, meaningUpright: "Balance, moderation, patience, purpose", meaningReversed: "Imbalance, excess, self-healing, re-alignment", description: "Temperance calls on you to remain calm, even when life feels stressful or frantic.", keywords: ["Balance", "Moderation", "Patience"], image: getMajor(14) },
  { id: 15, name: "The Devil", number: "XV", arcana: ArcanaType.Major, suit: Suit.None, meaningUpright: "Shadow self, attachment, addiction, restriction, sexuality", meaningReversed: "Releasing limiting beliefs, exploring dark thoughts, detachment", description: "The Devil represents your shadow (or darker) side and the negative forces that constrain you.", keywords: ["Addiction", "Attachment", "Shadow"], image: getMajor(15) },
  { id: 16, name: "The Tower", number: "XVI", arcana: ArcanaType.Major, suit: Suit.None, meaningUpright: "Sudden change, upheaval, chaos, revelation, awakening", meaningReversed: "Personal transformation, fear of change, averting disaster", description: "The Tower represents a sudden, massive change. You cannot escape it; you must face it.", keywords: ["Chaos", "Awakening", "Sudden Change"], image: getMajor(16) },
  { id: 17, name: "The Star", number: "XVII", arcana: ArcanaType.Major, suit: Suit.None, meaningUpright: "Hope, faith, purpose, renewal, spirituality", meaningReversed: "Lack of faith, despair, self-trust, disconnection", description: "The Star brings hope, renewed power, and strength to carry on with life.", keywords: ["Hope", "Faith", "Renewal"], image: getMajor(17) },
  { id: 18, name: "The Moon", number: "XVIII", arcana: ArcanaType.Major, suit: Suit.None, meaningUpright: "Illusion, fear, anxiety, subconscious, intuition", meaningReversed: "Release of fear, repressed emotion, inner confusion", description: "The Moon represents illusions and fears. It suggests that things are not as they appear.", keywords: ["Illusion", "Fear", "Subconscious"], image: getMajor(18) },
  { id: 19, name: "The Sun", number: "XIX", arcana: ArcanaType.Major, suit: Suit.None, meaningUpright: "Positivity, fun, warmth, success, vitality", meaningReversed: "Inner child, feeling down, overly optimistic", description: "The Sun represents success, radiance, and abundance. It gives you strength and tells you that no matter where you go, your positive energy will follow.", keywords: ["Success", "Joy", "Vitality"], image: getMajor(19) },
  { id: 20, name: "Judgement", number: "XX", arcana: ArcanaType.Major, suit: Suit.None, meaningUpright: "Judgement, rebirth, inner calling, absolution", meaningReversed: "Self-doubt, inner critic, ignoring the call", description: "Judgement calls for a period of reflection and self-evaluation.", keywords: ["Judgement", "Rebirth", "Calling"], image: getMajor(20) },
  { id: 21, name: "The World", number: "XXI", arcana: ArcanaType.Major, suit: Suit.None, meaningUpright: "Completion, integration, accomplishment, travel", meaningReversed: "Seeking personal closure, short-cuts, delays", description: "The World signifies completion, achievement, and fulfilment. All of your efforts are finally paying off.", keywords: ["Completion", "Travel", "Fulfillment"], image: getMajor(21) },
  
  ...generateMinorArcana()
];

function generateMinorArcana(): ITarotCard[] {
  const suits = [Suit.Wands, Suit.Cups, Suit.Swords, Suit.Pentacles];
  const numbers = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Page", "Knight", "Queen", "King"];
  
  const cards: ITarotCard[] = [];
  let idCounter = 22;

  suits.forEach(suit => {
    numbers.forEach(num => {
      const name = `${num} of ${suit}`;
      let keywords: string[] = [suit, num];
      let meaning = "";
      
      if (suit === Suit.Wands) {
        keywords.push("Fire", "Action", "Creativity");
        meaning = "Energy, passion, and the drive to make things happen.";
      } else if (suit === Suit.Cups) {
        keywords.push("Water", "Emotion", "Relationships");
        meaning = "Emotional connection, intuition, and feelings.";
      } else if (suit === Suit.Swords) {
        keywords.push("Air", "Intellect", "Conflict");
        meaning = "Logic, ideas, and the double-edged nature of power.";
      } else if (suit === Suit.Pentacles) {
        keywords.push("Earth", "Material", "Career");
        meaning = "Material aspects of life, work, and practical matters.";
      }

      cards.push({
        id: idCounter++,
        name,
        number: num,
        arcana: ArcanaType.Minor,
        suit,
        meaningUpright: `${meaning} Positive manifestation of ${num}.`,
        meaningReversed: `${meaning} Delays or blocks regarding ${num}.`,
        description: `The ${name} represents the essence of ${suit} in the realm of ${num}.`,
        keywords,
        image: getImg(idCounter, ArcanaType.Minor, suit, num)
      });
    });
  });
  return cards;
}

export const SPREADS: Record<number, ISpreadConfig> = {
  [SpreadType.OneCard]: {
    type: SpreadType.OneCard,
    name: "Single Card Draw",
    description: "A quick snapshot of the current situation or a direct answer to a question.",
    positions: ["The Answer"]
  },
  [SpreadType.ThreeCard]: {
    type: SpreadType.ThreeCard,
    name: "Past, Present, Future",
    description: "A classic spread to understand the trajectory of your life path.",
    positions: ["The Past", "The Present", "The Future"]
  },
  [SpreadType.FiveCard]: {
    type: SpreadType.FiveCard,
    name: "The Horseshoe",
    description: "A deeper look into how current actions influence future outcomes.",
    positions: ["The Past", "The Present", "Hidden Influences", "Obstacles", "The Future"]
  }
};