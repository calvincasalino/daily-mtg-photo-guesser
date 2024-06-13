import cards from './targetCardList.json';

const getCurrentCard = () => {
  const today = new Date().toLocaleDateString("en-CA", { timeZone: "America/New_York" });
  const currentCard = cards.find(card => card.date === today);
  return currentCard;
};

const currentCard = getCurrentCard();

export const targetCard = {
  name: currentCard.name,
  image: currentCard.image
};
