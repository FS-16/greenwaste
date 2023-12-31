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

async function fetchDataWithIncrementalId() {
  const questionId = 1;
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
                      <h6 id="question-title${question.id}">${
        question.title
      }</h6>
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
                          <img src="${user.avatar}" alt="" />
                          <span class="user-name">${
                            user ? user.username : 'Tidak Dikenal'
                          }</span>
                          <span class="time">${question.createdAt}</span>
                      </div>
                  </div>
            </div>
          `;

      questionList.appendChild(listItem);
    });
  } catch (error) {
    console.error(`Gagal mengambil data untuk ID ${questionId}:`, error);
  }
}

fetchDataWithIncrementalId();
