class Auth {
  constructor() {
    document.querySelector('body').style.display = 'none';
    const auth = localStorage.getItem('auth');

    this.validateAuth(auth);
  }

  validateAuth(auth) {
    if (auth != 1) {
      window.location.replace('/');
    } else {
      document.querySelector('body').style.display = 'block';
      console.log(auth);
    }
  }

  logOut() {
    localStorage.removeItem('auth');
    window.location.replace('/');
  }
}

function logOut() {
  localStorage.removeItem('auth');
  document.getElementById('logout-button').style.display = 'none';
  window.location.replace('/');
}
