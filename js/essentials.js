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

  return {
    createClickEvent,
    capitalize,
    deCapitalize,
  };
})();

export default essen;
