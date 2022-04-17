const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const msgOne = document.getElementById("msgOne");
const msgTwo = document.getElementById("msgTwo");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  msgOne.textContent = "Loading...";
  msgTwo.textContent = "";
  fetch(`/weather?address=${location}`).then((response) =>
    response.json().then((data) => {
      if (data.error) {
        msgOne.textContent = data.error;
      } else {
        msgOne.textContent = data.location;
        msgTwo.textContent = data.forcast;
      }
    })
  );
});
