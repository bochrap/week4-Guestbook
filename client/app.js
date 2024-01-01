const form = document.getElementById("guestbook-form");
const postDiv = document.getElementById("posts-container");

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const formData = new FormData(form);
  const formValues = Object.fromEntries(formData);
  //   console.log(formValues);

  const response = await fetch(
    "https://guestbook-server-for-teched-week-4.onrender.com/entries",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    }
  );
  const json = await response.json();
  console.log(json);

  form.reset();
  getEntries();
});

async function getEntries() {
  const response = await fetch(
    "https://guestbook-server-for-teched-week-4.onrender.com/entries"
  );
  const posts = await response.json();
  console.log(posts);

  posts.forEach(function (post) {
    const div = document.createElement("div");
    div.classList.add(`#${post.id}`); //? do I need this class ?

    // Adjust i to 4 to display likes;
    for (let i = 0; i <= 3; i++) {
      const span = document.createElement("span");
      div.appendChild(span);
      if (i == 0) {
        span.textContent = `#${post.id}`;
      } else if (i == 1) {
        span.textContent = `${post.reaction}`;
      } else if (i == 2) {
        span.textContent = `${post.username}:`;
      } else if (i == 3) {
        span.textContent = `${post.message}`;
      } else if (i == 4) {
        if (post.likes == null) {
          span.textContent = `0`;
        } else {
          span.textContent = `${post.likes}`;
        }
      }
    }

    // const likeBtn = document.createElement("button");
    // likeBtn.textContent = "👍";
    // likeBtn.classList.add(`like${post.id}`);
    // div.appendChild(likeBtn);

    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.classList.add(`delete${post.id}`);
    div.appendChild(delBtn);

    postDiv.appendChild(div);
  });

  addEventListenerToDelButtons();
  // addEventListenerToLikeButtons();
}
//*** LIKES ARE KIND OF FUNCTIONAL BUT ASYNC FUNCTIONS ARE MESSING EVERYTHING UP AND I DON'T KNOW HOW TO MAKE THE PAGE NOT REFRESH AND GENERATE ALL BUTTONS FROM SCRATCH AFTER CLICKING ONE***

// function addEventListenerToLikeButtons() {
//   const btns = document.querySelectorAll("button[class^='like']");
//   btns.forEach((button) => {
//     const postId = button.classList[0].replace("like", "");
//     button.addEventListener("click", async function () {
//       const isClicked = button.classList.contains("clicked");
//       const likesValue = isClicked ? -1 : 1;
//       const response = await fetch(`http://localhost:8080/entries/${postId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           likes: likesValue,
//         }),
//       });
//       if (response.ok) {
//         button.classList.toggle("clicked");
//       }
//     });
//   });
// }

function addEventListenerToDelButtons() {
  const btns = document.querySelectorAll("button[class^='delete']");
  btns.forEach((button) => {
    const postId = button.classList[0].replace("delete", "");
    button.addEventListener("click", async function () {
      const response = await fetch(
        `https://guestbook-server-for-teched-week-4.onrender.com/entries/${postId}`,
        {
          method: "DELETE",
        }
      );
      // if (response.ok) {
      //   getEntries();
      // }
    });
  });
}

getEntries();
