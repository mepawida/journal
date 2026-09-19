document.addEventListener("click", (e) => {
  const { target } = e;
  if (!target.matches("aside a")) {
    return;
  }
  e.preventDefault();
  urlRoute(e);
});

const urlRoutes = {
  "/": {
    template: "/templates/index.html",
    title: "",
    description: "",
  },
  "/archive": {
    template: "/templates/archive.html",
    title: "",
    description: "",
  },
  "/entry": {
    template: "/templates/entry.html",
    title: "",
    description: "",
  },
};

const urlRoute = (event) => {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  urlLocationHandler();
};

const urlLocationHandler = async () => {
  let location = window.location.pathname;
  if (location.length === 0) {
    location = "/";
  }

  const route = urlRoutes[location] || urlRoutes["/"];
  const html = await fetch(route.template).then((Response) => Response.text());
  console.log("HTML received", html);
  document.getElementById("content").innerHTML = html;
};

window.onpopstate = urlLocationHandler;
window.route = urlRoute;

urlLocationHandler();

console.log("🔥 JAVASCRIPT IS RUNNING 🔥");

const submit = document.getElementById("submit-btn");
const textareaInput = document.getElementById("textarea-entry");
const cards = document.querySelector(".cards");


document.addEventListener("click", (event) => {
  if (event.target.id === "submit-btn") {
    submitForm();
  }
});
loadThoughts()

function submitForm() {
  const textareaInput = document.getElementById("textarea-entry");
  const cards = document.querySelector(".cards");

  const textarea = textareaInput.value.trim();

  if (!textarea) return;

  const thoughts = JSON.parse(localStorage.getItem("thoughts")) || [];

  // Add the new thought
  thoughts.push(textarea);

  // Save the updated array
  localStorage.setItem("thoughts", JSON.stringify(thoughts));

  const card = document.createElement("div");
  card.classList.add("card");

  const textP = document.createElement("p");
  textP.textContent = textarea;

  card.appendChild(textP);
  cards.appendChild(card);

  textareaInput.value = "";
}

function loadThoughts() {
  const cards = document.querySelector(".cards");

  if (!cards) return;

  const thoughts = JSON.parse(localStorage.getItem("thoughts")) || [];

  thoughts.forEach((thought) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const textP = document.createElement("p");
    textP.textContent = thought;

    card.appendChild(textP);
    cards.appendChild(card);
  });
}

loadThoughts()


console.log("cards RIGHT NOW:", document.querySelector(".cards"));
console.log("BODY:", document.body.innerHTML);