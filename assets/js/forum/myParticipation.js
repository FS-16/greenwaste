const myParticipation = document.getElementById('myParticipation');

async function getUser() {
  const userRes = 'https://6525852467cfb1e59ce7665e.mockapi.io/forum/users';
  try {
    const res = await fetch(userRes);
    if (!res.ok) {
      console.log('HTTP Error');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getQuestion(questionId) {
  const response = await fetch(
    `https://6525852467cfb1e59ce7665e.mockapi.io/forum/users/${questionId}/questions`
  );
  const data = await response.json();
  return data;
}

async function showParticipation() {
  let questionId = 1;
  try {
    dataUser = await getUser();
    dataQuestion = await getQuestion(questionId);

    let user = `
        <div class="my-participation">
        <h4>My Participation</h4>
        <div class="img-avatar">
          <img src="${dataUser[0].avatar}" alt="avatar" />
          <span>${dataUser[0].username}</span>
        </div>
        <div class="card-total">
          <div class="col-total me-2">
            <h6>Total Question</h6>
            <p>${dataQuestion.length} Question</p>
          </div>
        </div>

        <h6 class="mt-4">All Category</h6>
        <div class="all-category">
          <div class="category-1">
            <div class="text-category">
              <div class="text-title">Limbah Anorganik</div>
              <div class="text-question">15 Question</div>
            </div>
          </div>

          <div class="category-2">
            <div class="text-category">
              <div class="text-title">Limbah Organik</div>
              <div class="text-question">1 Question</div>
            </div>
          </div>

          <div class="category-3">
            <div class="text-category">
              <div class="text-title">Limbah B3</div>
              <div class="text-question">2 Question</div>
            </div>
          </div>
        </div>
      </div>
          `;

    myParticipation.innerHTML += user;
  } catch (error) {
    console.log(error);
  }
}

showParticipation();
