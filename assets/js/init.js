const auth = new Auth();

document.getElementById('logout-button').addEventListener('click', (e) => {
  auth.logOut();
});
