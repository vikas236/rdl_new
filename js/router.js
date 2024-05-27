import essen from "./essentials.js";
import homeW from "./home.js";
// import aqua from "./aqua.js";
// import galleryw from "./gallery.js";
import adminW from "./admin.js";

// Function to handle routing based on hash change
function handleHashChange() {
  const path = window.location.hash.substring(1); // Remove the '#' symbol
  loadPage(path);
}

// Function to load page content based on the hash path
function loadPage(path) {
  const container = document.getElementById("content");
  const request = new XMLHttpRequest();
  if (path == "") path = "home";
  request.open("GET", "pages/" + path + ".html");
  request.onload = async function () {
    if (request.status === 200) {
      container.innerHTML = request.responseText;
      navLinks(path);
      if (path == "home") homeW();
      // if (path == "aqua") aqua();
      // if (path == "gallery") galleryw();
      if (path == "admin") adminW();
      // else {
      //   const nav = document.querySelector("nav");
      //   const footer = document.querySelector("footer");
      //   nav.style.display = "flex";
      //   footer.style.display = "flex";
      // }
    } else {
      container.innerHTML = "Page not found";
    }
  };
  request.send();
}

function navLinks(path) {
  const links = document.querySelectorAll(".nav_link");

  links.forEach((e, i) => {
    if (i != 3 && essen.deCapitalize(e.innerHTML) == path) {
      links.forEach((e) => e.classList.remove("active"));
      e.classList.add("active");
    }
  });
}

// Add event listener for hashchange event
window.addEventListener("hashchange", handleHashChange);

// Initial page load
handleHashChange();
