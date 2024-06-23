function navW() {
  const body = document.querySelector("body");
  const ham = document.querySelector(".ham");
  const wall = document.querySelector(".side_bar");
  const side_bar = document.querySelector(".sidebar_wrapper");

  ham.addEventListener("click", () => {
    ham.classList.toggle("active");

    if (ham.classList.contains("active")) {
      wall.classList.add("active");
      side_bar.style.left = "25px";
      body.style.height = "100vh";
      body.style.overflow = "hidden";
    } else {
      wall.classList.remove("active");
      side_bar.style.left = "-350px";
      body.style.overflow = "visible";
      body.style.height = "fit-content";
    }

    wall.addEventListener("click", () => {
      wall.classList.remove("active");
      side_bar.style.left = "-350px";
      body.style.overflow = "visible";
      body.style.height = "fit-content";
      ham.classList.remove("active");
    });

    console.log(wall);
  });

  const contact_btn = document.querySelector("span.nav_link");

  contact_btn.addEventListener("click", () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  });
}
navW();

export default navW;
