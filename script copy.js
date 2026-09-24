document.addEventListener("click", (e) => {
  const { target } = e;

  if (!target.matches("aside a")) {
    return;
  }

  e.preventDefault();
  urlRoute(e);
});

const urlRoutes = {
  "/journal/": {
    template: "/journal/templates/index.html",
    title: "",
    description: "",
  },

  "/journal/archive": {
    template: "/journal/templates/archive.html",
    title: "",
    description: "",
  },

  "/journal/entry": {
    template: "/journal/templates/entry.html",
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
    location = "/journal/";
  }

  const route = urlRoutes[location] || urlRoutes["/journal/"];

  const html = await fetch(route.template)
    .then((response) => response.text());

  console.log("HTML received:", html);

  document.getElementById("content").innerHTML = html;

  // ⭐ IMPORTANT
  // The HTML is now actually on the page.
  loadThoughts();
};


window.onpopstate = urlLocationHandler;
window.route = urlRoute;


urlLocationHandler();


document.addEventListener("click", (event) => {
  if (event.target.id === "submit-btn") {
    submitForm();
  }
});


function submitForm() {
  const textareaInput =
    document.getElementById("textarea-entry");

  const textarea = textareaInput.value.trim();

  if (!textarea) return;


  // Get existing thoughts
  const thoughts =
    JSON.parse(localStorage.getItem("thoughts")) || [];


  // Add new thought
  thoughts.push(textarea);


  // Save
  localStorage.setItem(
    "thoughts",
    JSON.stringify(thoughts)
  );


  // Show the card
  createCard(textarea);


  textareaInput.value = "";
}


function loadThoughts() {
  const cards = document.querySelector(".cards");

  console.log("Loading thoughts...");
  console.log("Cards container:", cards);


  if (!cards) {
    return;
  }


  const thoughts =
    JSON.parse(localStorage.getItem("thoughts")) || [];

  console.log("Saved thoughts:", thoughts);


  thoughts.forEach((thought) => {
    createCard(thought);
  });
}



function createCard(thought) {
  const cards = document.querySelector(".cards");

  if (!cards) {
    return;
  }


  const card = document.createElement("div");
  card.classList.add("card");


  const textP = document.createElement("p");
  textP.textContent = thought;


  card.appendChild(textP);
  cards.appendChild(card);
}
