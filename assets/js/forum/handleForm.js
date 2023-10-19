const form = document.getElementById('form');

async function sendToApi(data) {
  const res = await fetch(
    'https://6525852467cfb1e59ce7665e.mockapi.io/forum/users/1/questions',
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) return console.log('Error');
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = form.querySelector('[name="judul"]').value;
  const category = form.querySelector('[name="category"]').value;
  const description = form.querySelector('[name="description"]').value;

  sendToApi({ title, category, description });
  form.reset();
  setTimeout(function () {
    alert('Pertanyaan telah ditambahkan');
    window.location.href = '/forum.html';
  }, 1000);
});
