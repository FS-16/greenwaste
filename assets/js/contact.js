const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const message = document.getElementById('message').value;

  fetch('https://65221fb9a4199548356db1e0.mockapi.io/contactus', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      phone,
      message
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    alert('Successfully Submitted');
    // Mengarahkan ke halaman lain (sesuaikan URL sesuai kebutuhan)
    window.location.href = "index.html";

    form.reset();
  })
  .catch(error => console.error(error));
});