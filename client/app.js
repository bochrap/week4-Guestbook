const form = document.getElementById("guestbook-form");

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const formData = new FormData(form);
  const formValues = Object.fromEntries(formData);
  console.log(formValues);
});
