const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  fetch('https://652637e267cfb1e59ce802d9.mockapi.io/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password
    })
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      alert('Registration successful!');
      window.location.href = "login.html";
      form.reset();
    })
    .catch((error) => console.error(error));
});
