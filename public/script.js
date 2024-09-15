const form = document.getElementById('newsletter-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const message = document.getElementById('message');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nameValue = nameInput.value;
  const emailValue = emailInput.value;

  // Send data to the server
  fetch('/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: nameValue, email: emailValue }),
  })
    .then((response) => response.json())
    .then((data) => {
      message.textContent = data.message;
      message.style.color = data.message.includes('successful') ? 'green' : 'red';
    })
    .catch(() => {
      message.textContent = 'An error occurred. Please try again later.';
      message.style.color = 'red';
    });
});
