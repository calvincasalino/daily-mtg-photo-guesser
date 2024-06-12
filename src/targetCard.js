import cards from './targetCardList.json';

function importAll(r) {
  let images = {};
  r.keys().forEach((item) => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
}

const images = importAll(require.context('./assets', true, /\.(png|jpe?g|svg)$/));

const getCurrentCard = () => {
  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
  const currentCard = cards.find(card => card.date === today);
  return currentCard;
};

const currentCard = getCurrentCard();

const getImagePath = (path) => {
  return images[path.replace('./', '')];
};

export const targetCard = {
  name: currentCard.name,
  image1: getImagePath(currentCard.images[0]),
  image2: getImagePath(currentCard.images[1]),
  image3: getImagePath(currentCard.images[2]),
  image4: getImagePath(currentCard.images[3]),
  image5: getImagePath(currentCard.images[4]),
  image6: getImagePath(currentCard.images[5]),
};
