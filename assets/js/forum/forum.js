async function fetchUser() {
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

async function fetchQuestionById(questionId) {
  const response = await fetch(
    `https://6525852467cfb1e59ce7665e.mockapi.io/forum/users/${questionId}/questions`
  );
  const data = await response.json();
  return data;
}

async function addAnswer(valueAnswer, userId, questionId) {
  try {
    const res = await fetch(
      `https://6525852467cfb1e59ce7665e.mockapi.io/forum/users/${questionId}/questions/${userId}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ valueAnswer }),
      }
    );

    if (!res.ok) {
      console.log('Error');
    }
  } catch (error) {
    console.log(error);
  }
}

async function showQuestionDetails(question) {
  // window.location.hash = `question-details?id=${question.id}`;

  const dataUser = await fetchUser();
  const userMap = new Map(dataUser.map((user) => [user.id, user]));
  const user = userMap.get(question.userId);
  const answer = question.answer;
  // const resultAnswer = answer.join('<br>');

  const allQuestion = document.getElementById('all-question');

  const questionDetails = document.getElementById('details-question');
  const div = document.createElement('div');

  allQuestion.style.display = 'none';
  div.innerHTML = `
  <div class="heading-main-content">
    <h4>${question.title}</h4>
  </div>
  <div class="user-details-question">
    <p>${question.description}</p>
    <div class="question-category">${question.category}</div>
    <div class="img-avatar">
      <img src="${user ? user.avatar : ''}" alt="avatar" />
      <div class="avatar-info">
        <div>${user ? user.username : 'Tidak Dikenal'}</div>
        <div class="question-createdAt">${question.createdAt}</div>
      </div>
    </div>
    
  </div>
  <div class="answers">
    <div class="answers-title">
      <span>Answers</span>
    </div>
    <div class="answer-past">
      <h6>Previous Answer</h6>
      <p class="answer-text">${answer}</p>
    </div>

    <div class='answer-new'>
      <h6>New Answer</h6>
      <p>${question ? question.valueAnswer : 'Tidak ada jawaban terbaru'}</p>
    </div>
  </div>
  <div class="your-answer">
    <div class="mt-5">
     <div class="your-answer-title">
        <label for="exampleFormControlTextarea1" class="form-label">Your Answer</label>
    </div>
    <div id="your-answer">
    <form id="addAnswerForm">
      <textarea
        class="form-control mt-3 mb-3"
        id="exampleFormControlTextarea1"
        name="value-answer"
        rows="3"></textarea>
      <button class="btn btn-success btn-sm" type="submit">Post your answer</button>
    </form>
    </div>
    </div>
  </div>
  `;
  questionDetails.appendChild(div);

  const form = document.getElementById('addAnswerForm');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const valueAnswer = form.querySelector('[name="value-answer"]').value;
    const questionId = question.id;
    const userId = user.id;
    await addAnswer(valueAnswer, questionId, userId);
    form.reset();

    setTimeout(function () {
      alert('Jawaban telah ditambahkan');
      window.location.href = '/forum.html';
    }, 1000);
  });

  const loginUser = localStorage.getItem('auth');
  if (loginUser) {
    document.getElementById('your-answer').style.display = 'block';
  } else {
    document.getElementById('your-answer').innerHTML += ` 
    <br>
    <div>
    <span>Login untuk menambahkan jawaban baru</span>
    <a href="login.html">
    <button class="btn btn-success" type="submit" id="login-desktop">
      Login
    </button>
  </a>
  </div>`;
    document.getElementById('addAnswerForm').style.display = 'none';
  }
}

async function fetchDataWithIncrementalId() {
  for (let i = 1; i <= 3; i++) {
    const questionId = i;
    try {
      const questionData = await fetchQuestionById(questionId);
      const dataUser = await fetchUser();
      let questionList = document.getElementById('main-question');
      const userMap = new Map(dataUser.map((user) => [user.id, user]));

      questionData.forEach((question) => {
        const user = userMap.get(question.userId);
        const listItem = document.createElement('div');
        listItem.innerHTML = `
          <div class="row question-list">
            <div class="col">
              <div class="row">
                <div class="col-10 question-title">
                    <h6 id="question-title${question.id}">${question.title}</h6>
                </div>
              </div>
            </div>
            <div class="description-question">
              <p>${question.description}</p>
            </div>
            <div class="footer-question">
              <div class="category-question">
                <span>${question.category}</span>
              </div>
              <div class="user-question">
                <img src="${user ? user.avatar : ''}" alt="" />
                <span class="user-name">${
                  user ? user.username : 'Tidak Dikenal'
                }</span>
                <span class="time">${question.createdAt}</span>
              </div>
            </div>
          </div>
        `;

        questionList.appendChild(listItem);

        const questionTitleElement = document.getElementById(
          `question-title${question.id}`
        );
        questionTitleElement.addEventListener('click', () =>
          showQuestionDetails(question)
        );
      });
    } catch (error) {
      console.error(`Gagal mengambil data untuk ID ${questionId}:`, error);
    }
  }
}

fetchDataWithIncrementalId();
