import { IReadingCard } from "../types";

/**
 * Generates a cohesive reading interpretation based on cards and positions.
 * This replaces the previous AI-based generation with a deterministic logic
 * to ensure offline functionality and remove external dependencies.
 */
export const generateReadingSynthesis = async (cards: IReadingCard[], spreadName: string): Promise<string> => {
  // Simulate a very brief "thinking" pause for UX effect, though not strictly necessary
  // It helps the UI transition feel less jarring.
  await new Promise(resolve => setTimeout(resolve, 600));
  
  return generateStaticSynthesis(cards, spreadName);
};

const generateStaticSynthesis = (cards: IReadingCard[], spreadName: string): string => {
  // 1. Analyze dominant suit
  const suitCounts: Record<string, number> = {};
  let dominantSuit = "";
  let maxSuitCount = 0;

  cards.forEach(c => {
    if (c.card.suit !== 'None') {
      suitCounts[c.card.suit] = (suitCounts[c.card.suit] || 0) + 1;
      if (suitCounts[c.card.suit] > maxSuitCount) {
        maxSuitCount = suitCounts[c.card.suit];
        dominantSuit = c.card.suit;
      }
    }
  });

  // 2. Analyze Major Arcana count
  const majorCount = cards.filter(c => c.card.arcana === 'Major').length;
  const isMajorHeavy = majorCount >= Math.ceil(cards.length / 2);

  // 3. Construct Narrative
  const intro = `The "${spreadName}" spread has revealed a path of ${isMajorHeavy ? "significant soul-level transformation" : "practical daily evolution"}.`;
  
  let suitMsg = "";
  if (dominantSuit) {
    if (dominantSuit === "Wands") suitMsg = " The strong presence of Wands suggests this is a time of action, creativity, and burning passion.";
    if (dominantSuit === "Cups") suitMsg = " With many Cups appearing, emotions, relationships, and intuition are guiding your current journey.";
    if (dominantSuit === "Swords") suitMsg = " The Swords indicate that clarity of thought, truth, and perhaps some mental conflict are central themes.";
    if (dominantSuit === "Pentacles") suitMsg = " Pentacles ground this reading in reality, focusing on career, home, and material stability.";
  }

  // Synthesis of first and last card
  const firstCard = cards[0];
  const lastCard = cards[cards.length - 1];
  
  const journey = `You begin with the energy of the ${firstCard.card.name}, indicating ${firstCard.isReversed ? "an internal block or delay regarding" : "a clear expression of"} ${firstCard.card.keywords[0].toLowerCase()}. Ultimately, this path leads towards the lesson of the ${lastCard.card.name}: ${lastCard.isReversed ? "a need to revisit" : "an opportunity for"} ${lastCard.card.keywords[1] || "growth"}.`;

  const outro = " Trust your intuition as you integrate these messages.";

  return `${intro}${suitMsg} ${journey}${outro}`;
};