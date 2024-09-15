const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();

// Middleware to parse JSON data
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Array to store form submissions temporarily
let subscriptions = [];

// Route to serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to handle form submission
app.post('/subscribe', (req, res) => {
  const { name, email } = req.body;

  // Simple validation for email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  // Save the name and email to the subscriptions array
  subscriptions.push({ name, email });

  // Save data to JSON file for persistent storage
  fs.writeFile('subscriptions.json', JSON.stringify(subscriptions, null, 2), (err) => {
    if (err) {
      console.error('Error saving to file', err);
      return res.status(500).json({ message: 'Error saving data' });
    }
    console.log('Subscription data saved successfully');
    res.json({ message: 'Subscription successful!' });
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
