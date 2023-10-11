// let question = document.getElementById("main-question");
// async function dataFetch() {
//   const res = await fetch(
//     "https://6525852467cfb1e59ce7665e.mockapi.io/forum/users/1/questions"
//   );
//   const resUser = await fetch(
//     "https://6525852467cfb1e59ce7665e.mockapi.io/forum/users"
//   );
//   if (res.ok === false) return console.log("Error");
//   const data = await res.json();
//   const dataUser = await resUser.json();
//   console.log(data);
//   console.log(dataUser);

//   data.forEach((item, index) => {
//     let listQuestion = `
//             <div class="row question-list">
//             <div class="col">
//               <div class="row">
//                 <div class="col-10 question-title">
//                   <h6>${item.title}</h6>
//                 </div>
//                 <div class="col-2">12 Answer</div>
//               </div>
//               <div class="row footer-question">
//                 <div class="col-7 category-question">
//                   <span>${item.category}</span>
//                 </div>
//                 <div class="col-5 user-question">
//                   <img src="assets/img/Avatar.png" alt="" />
//                   <span class="user-name">Rudi Gunawan</span>
//                   <span>${item.createdAt}</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//     `;
//     question.innerHTML += listQuestion;
//   });
// }

// dataFetch();

const userRes = "https://6525852467cfb1e59ce7665e.mockapi.io/forum/users";
const questionRes =
  "https://6525852467cfb1e59ce7665e.mockapi.io/forum/users/1/questions";

async function fetchUser() {
  try {
    const res = await fetch(userRes);
    if (!res.ok) {
      console.log("HTTP Error");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function fetchQuestion() {
  try {
    const res = await fetch(questionRes);
    if (!res.ok) {
      console.log("HTTP Error");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function fetchBothApi() {
  try {
    const dataUser = await fetchUser();
    const dataQuestion = await fetchQuestion();

    console.log(dataUser, dataQuestion);
    const mergeData = dataUser.map((user) => {
      const userQuestions = dataQuestion.filter(
        (question) => question.userId === user.id
      );
      return { ...user, questions: userQuestions };
    });
    console.log(mergeData);

    const outputDiv = document.getElementById("main-question");
    mergeData.forEach((user) => {
      const userDiv = document.createElement("div");
      userDiv.innerHTML = `<h2>${user.name}</h2>`;
      user.questions.forEach((question) => {
        userDiv.innerHTML += `<p>${question.title}</p>`;
      });
      outputDiv.appendChild(userDiv);
    });

    // dataQuestion.forEach((item, index) => {
    //   let questionResult = `
    //   <div class="row question-list">
    //   <div class="col">
    //     <div class="row">
    //       <div class="col-10 question-title">
    //         <h6>${item.title}</h6>
    //       </div>
    //       <div class="col-2">12 Answer</div>
    //     </div>
    //     <div class="row footer-question">
    //       <div class="col-7 category-question">
    //         <span>Limbah anorganik</span>
    //         <span>Limbah organik</span>
    //         <span>Limbah B3</span>
    //       </div>
    //       <div class="col-5 user-question" id="user-question">

    //         <span>1 days ago</span>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    //     `;
    //   questionList.innerHTML += questionResult;
    // });

    // dataUser.forEach((item, index) => {
    //   let userResult = `

    //             <img src="${item.avatar}" alt="" />
    //             <span class="user-name">${item.name}</span>

    //         `;
    //   userList.innerHTML += userResult;
    // });
  } catch (error) {
    console.log(error);
  }
}

fetchBothApi();

// let questionList = document.getElementById("main-question");
// let userList = document.getElementById("user-question"); // Fixed the typo in the element ID

// const userRes = "https://6525852467cfb1e59ce7665e.mockapi.io/forum/users";
// const questionRes =
//   "https://6525852467cfb1e59ce7665e.mockapi.io/forum/users/1/questions";

// async function fetchUser() {
//   try {
//     const res = await fetch(userRes);
//     if (!res.ok) {
//       throw new Error("HTTP Error"); // Use throw to propagate the error
//     }
//     const data = await res.json();
//     return data;
//   } catch (error) {
//     console.log(error);
//     return []; // Return an empty array in case of an error
//   }
// }

// async function fetchQuestion() {
//   try {
//     const res = await fetch(questionRes);
//     if (!res.ok) {
//       throw new Error("HTTP Error"); // Use throw to propagate the error
//     }
//     const data = await res.json();
//     return data;
//   } catch (error) {
//     console.log(error);
//     return []; // Return an empty array in case of an error
//   }
// }

// async function fetchBothApi() {
//   try {
//     const dataUser = await fetchUser();
//     const dataQuestion = await fetchQuestion();

//     console.log(dataUser, dataQuestion);

//     dataQuestion.forEach((item, index) => {
//       let questionResult = `
//       <div class="row question-list">
//       <div class="col">
//         <div class="row">
//           <div class="col-10 question-title">
//             <h6>${item.title}</h6>
//           </div>
//           <div class="col-2">12 Answer</div>
//         </div>
//         <div class="row footer-question">
//           <div class="col-7 category-question">
//             <span>Limbah anorganik</span>
//             <span>Limbah organik</span>
//             <span>Limbah B3</span>
//           </div>
//           <div class="col-5 user-question" id="user-question">
//             <span>1 days ago</span>
//           </div>
//         </div>
//       </div>
//     </div>
//         `;
//       questionList.innerHTML += questionResult;
//     });

//     dataUser.forEach((item, index) => {
//       let userResult = `
//         <img src="${item.avatar}" alt="" />
//         <span class="user-name">${item.name}</span>
//         <span>1 days ago</span>
//       `;
//       userList.innerHTML += userResult;
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }

// fetchBothApi();
