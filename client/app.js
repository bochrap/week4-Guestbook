const form = document.getElementById("guestbook-form");
const postDiv = document.getElementById("posts-container");

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const formData = new FormData(form);
  const formValues = Object.fromEntries(formData);
  //   console.log(formValues);

  const response = await fetch("http://localhost:8080/entries", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formValues),
  });
  const json = await response.json();
  console.log(json);

  form.reset();
  getEntries();
});

async function getEntries() {
  const response = await fetch("http://localhost:8080/entries");
  const posts = await response.json();
  console.log(posts);

  posts.forEach(function (post) {
    const div = document.createElement("div");
    div.classList.add(`#${post.id}`); //? do I need this class ?

    for (let i = 0; i <= 5; i++) {
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

    const likeBtn = document.createElement("button");
    likeBtn.textContent = "👍";
    likeBtn.classList.add(`like${post.id}`);
    div.appendChild(likeBtn);

    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.classList.add(`delete${post.id}`);
    div.appendChild(delBtn);

    postDiv.appendChild(div);
  });

  addEventListenerToDelButtons();
}

function addEventListenerToDelButtons() {
  const btns = document.querySelectorAll("button[class^='delete']");
  btns.forEach((button) => {
    const postId = button.classList[0].replace("delete", "");
    button.addEventListener("click", async function () {
      const response = await fetch(`http://localhost:8080/entries/${postId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        getEntries();
      }
    });
  });
}

getEntries();

// const btns = document.querySelectorAll("button");
// btns.forEach((button) => {
//   console.log("adding event listener to", button);
//   button.addEventListener("click", function () {
//     console.log("hey");
//   });
// });
