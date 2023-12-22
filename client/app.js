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
});

async function getEntries() {
  const response = await fetch("http://localhost:8080/entries");
  const posts = await response.json();
  console.log(posts);

  posts.forEach(function (post) {
    const div = document.createElement("div");
    div.classList.add(`#${post.id}`); //? do I need this class ?

    for (let i = 0; i <= posts.length; i++) {
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

    postDiv.appendChild(div);
  });
}

getEntries();
