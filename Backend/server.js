// server.js
const app  = require('./app.js');
const dotenv = require('dotenv');

dotenv.config();


const PORT = process.env.PORT || 5173;


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
