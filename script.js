const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function hideLoadingSpinner() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Show New Quote
function newQuote() {
  showLoadingSpinner();
  // Pick a random quote from apiQuotes array
  const randomIndex = Math.floor(Math.random() * apiQuotes.length);
  const quote = apiQuotes[randomIndex];
  // Check if Author field is blank and replace it with 'Unknown'
  authorText.textContent = quote.author ? quote.author : "Unknown";
  // Check Quote styling to determin styling
  if (quote.text.length > 50) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  // Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  hideLoadingSpinner();
}

// Get Quotes From API
async function getQuotesFromAPI() {
  showLoadingSpinner();
  // Sample Requests
  // const apiUrl = "type.fit/api/quotes";
  // const apiUrl = https://zenquotes.io/api/quotes - Generate a JSON array of 50 random quotes on each request
  // const apiUrl = https://zenquotes.io/api/today - Generate the quote of the day on each request
  // const apiUrl = https://zenquotes.io/api/random - Generate a random quote on each request
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    console.log("API Fetch Error: ", error);
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuotesFromAPI();
