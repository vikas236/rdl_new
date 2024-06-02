const essen = (() => {
  // Create a new click event
  function createClickEvent() {
    return new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    });
  }

  function capitalize(s) {
    const tmp = [];
    s = s.split("_");

    s.forEach((e) => {
      tmp.push(e[0].toUpperCase() + e.slice(1));
    });

    return tmp.join(" ");
  }

  function deCapitalize(s) {
    return s.toLowerCase().replaceAll(" ", "_");
  }

  async function popupMessage(s) {
    const body = document.querySelector("body");
    const message = document.createElement("h1");
    message.classList.add("message");
    message.innerHTML = s;
    body.appendChild(message);
    await setTimeout(() => {
      message.classList.add("active");
    }, 250);
    await setTimeout(() => {
      message.classList.remove("active");
    }, 3500);
    await setTimeout(() => {
      message.remove();
    }, 4500);
  }

  return {
    createClickEvent,
    capitalize,
    deCapitalize,
    popupMessage,
  };
})();

export default essen;
