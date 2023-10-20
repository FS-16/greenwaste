const dataUser = {
  users: [
    { username: 'admin', password: 'admin' },
    { username: 'user', password: 'user' },
  ],
};

function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const user = dataUser.users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    localStorage.setItem('auth', 1);
    console.log('login berhasil');
  } else {
    alert('Password Salah, coba lagi');
  }
}

function logOut() {
  localStorage.removeItem('auth');
  document.getElementById('logout-button').style.display = 'none';
  window.location.replace('/');
}

const loginUser = localStorage.getItem('auth');
const currentPage = window.location.pathname;

if (loginUser) {
  document.getElementById('askQuestion').style.display = 'block';
  document.getElementById('myQuestion').style.display = 'block';
  document.getElementById('myParticipation').style.display = 'block';
  document.getElementById('login-mobile').style.display = 'none';
  document.getElementById('register-mobile').style.display = 'none';
  document.getElementById('login-desktop').style.display = 'none';
  document.getElementById('register-desktop').style.display = 'none';
  document.getElementById('button-ask-question').style.display = 'none';
} else {
  document.getElementById('askQuestion').style.display = 'none';
  document.getElementById('myQuestion').style.display = 'none';
  document.getElementById('myParticipation').style.display = 'none';
  document.getElementById('logout-desktop').style.display = 'none';
  document.getElementById('logout-mobile').style.display = 'none';
  document.getElementById('button-add-question').style.display = 'none';

  // MENU BAR MOBILE
  document.getElementById('menu-ask').style.display = 'none';
  document.getElementById('menu-my-question').style.display = 'none';
  document.getElementById('menu-my-participation').style.display = 'none';
}
