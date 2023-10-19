async function login(email, password) {
  const form = document.getElementById('form');

  try {
    const response = await fetch(
      `https://6525852467cfb1e59ce7665e.mockapi.io/forum/users?email=${email}&password=${password}`
    );
    if (response.ok) {
      const data = await response.json();
      if (data.length > 0) {
        const user = data[0];
        localStorage.setItem('auth', JSON.stringify(user));
        alert('Login successful!');
        window.location.href = 'index.html';
        form.reset();
      } else {
        alert('Username atau password salah');
        form.reset();
      }
    } else {
      console.error('Gagal login');
    }
  } catch (error) {
    console.error('Gagal login:', error);
  }
}

document.getElementById('form').addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  login(email, password);
});
