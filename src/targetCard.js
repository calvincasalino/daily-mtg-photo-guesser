// Function to fetch a random card from the Scryfall API
const fetchRandomCard = async () => {
  try {
    const response = await fetch("https://api.scryfall.com/cards/random");
    if (!response.ok) {
      throw new Error("Failed to fetch the random card");
    }
    const card = await response.json();
    return {
      name: card.name,
      image: card.image_uris?.large || null, // Use the 'large' image size
    };
  } catch (error) {
    console.error("Error fetching random card:", error);
    return {
      name: "Fallback Card",
      image: "fallback_image_url", // Replace with a valid fallback URL
    };
  }
};

// Function to get today's date as a string
const getTodayDate = () => {
  return new Date().toLocaleDateString("en-CA", { timeZone: "America/New_York" });
};

// Function to get or refresh the daily card
const getDailyCard = async () => {
  const today = getTodayDate();
  const storedCard = JSON.parse(localStorage.getItem("dailyCard"));

  // Check if there's a stored card for today
  if (storedCard && storedCard.date === today) {
    return storedCard.card; // Return the stored card
  }

  // Fetch a new random card
  const randomCard = await fetchRandomCard();

  // Store the new card with today's date
  localStorage.setItem(
    "dailyCard",
    JSON.stringify({ date: today, card: randomCard })
  );

  return randomCard;
};

// Export the daily card as a global object
export const targetCard = await getDailyCard();
