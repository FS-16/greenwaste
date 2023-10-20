const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  fetch('https://6525852467cfb1e59ce7665e.mockapi.io/forum/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  })
    .then((response) => response.json())
    .then(() => {
      alert('Registration successful!');
      window.location.href = 'login.html';
      form.reset();
    })
    .catch((error) => console.error(error));
});
