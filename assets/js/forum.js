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
  let startingId = 0;
  for (let i = 1; i <= 3; i++) {
    const questionId = startingId + i;
    try {
      const questionData = await fetchQuestionById(questionId);
      const dataUser = await fetchUser();
      let questionList = document.getElementById('main-question');
      const userMap = new Map(dataUser.map((user) => [user.id, user]));

      questionData.forEach((question, index) => {
        const user = userMap.get(question.userId);
        const listItem = document.createElement('div');
        console.log(question);

        listItem.innerHTML = `
          <div class="row question-list">
              <div class="col">
                <div class="row">
                  <div class="col-10 question-title">
                    <a href="details-question.html">
                      <h6>${question.title}</h6>
                    </a>
                  </div>
                  <div class="col-2">12 Answer</div>
                </div>
              </div>
              <div class="footer-question">
                    <div class="category-question">
                        <span>${question.category}</span>
                    </div>
                    <div class="user-question">
                        <img src="${user.avatar}" alt="" />
                        <span class="user-name">${
                          user ? user.name : 'Tidak Dikenal'
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
}

fetchDataWithIncrementalId();
