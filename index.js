const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const next = document.getElementById("next-page");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});
// creating object
let player = {
  name: "",
  nickname: "",
};

function getPlayerInfo() {
  let name = document.getElementById("nameInput").value;
  let nickname = document.getElementById("nicknameInput").value;

  //storing values
  localStorage.setItem("name", name);
  localStorage.setItem("nickname", nickname);

  player.name = name;
  player.nickname = nickname;

  if (name.length > 0 && nickname.length > 0) {
    next.onclick = () => {
      location.href = "./instructions.html";
    };
  } else {
    alert("Input Fields are Empty");
  }
}
