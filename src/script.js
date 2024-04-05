async function getQuotesRandom(d) {
  // Get JWT token from localStorage or wherever it's stored
  const token = localStorage.getItem('JWT_SECRET');

  // Construct the request headers with the JWT token
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  // Make the fetch request with the constructed headers
  let response = await fetch("https://api.quotable.io/quotes/random?limit=4&maxLength=60", {
    method: 'GET',
    headers: headers
  });

  // Handle response...
}

async function getQuotesSearch() {
  // Same as getQuotesRandom but for the search endpoint
}

async function setActive(q, ql, imgS) {
  // Same as getQuotesRandom but for setting the active quote
}
