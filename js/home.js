import essen from "./essentials.js";
import serverW from "./server.js";

function homeW() {
  serverW.getTable("bestsellers").then(async (data) => {
    const sellers_names = data[0].names;
    const container = document.querySelectorAll(".best_selling .seller");

    sellers_names.forEach(async (e, i) => {
      const str = essen.deCapitalize(e);
      let productData = "";

      await serverW.findProduct("prawn_products", str).then((pdata) => {
        if (pdata.result != "" && productData == "") productData = pdata.result;
      });
      await serverW.findProduct("poultry_products", str).then((pdata) => {
        if (pdata.result != "" && productData == "") productData = pdata.result;
      });

      addSeller(productData, i);
    });

    function addSeller(data, i) {
      const img = document.createElement("img");
      if (data.image != null && data.image.length > 50) img.src = data.image;
      else {
        img.src = `../images/logo/logo.svg`;
        img.classList.add("inactive");
      }

      container[i].innerHTML = "";
      container[i].appendChild(img);
      img.addEventListener("click", () => {
        showProduct(data);
      });
    }

    function showProduct(data) {
      const body = document.querySelector("body");
      const container = document.querySelector(".home .product_data");
      const image_container = document.querySelector(
        ".home .product_data .image"
      );
      const content_container = document.querySelector(
        ".home .product_data .content"
      );
      image_container.innerHTML = "";
      content_container.innerHTML = "";
      container.classList.add("active");
      body.style.height = "100vh";
      body.style.overflow = "hidden";

      const h2 = document.createElement("h2");
      h2.innerHTML = essen.capitalize(data.name);
      content_container.appendChild(h2);

      const img = document.createElement("img");
      if (data.image != null && data.image.length > 50) img.src = data.image;
      else img.src = "./images/logo/logo.svg";
      image_container.appendChild(img);

      for (const [key, value] of Object.entries(data)) {
        if (
          value != null &&
          value != "" &&
          key != "name" &&
          key != "category" &&
          key != "image"
        ) {
          if (key == "para") createList("", value);
          else createList(key, value);
        }
      }

      function createList(name, arr) {
        const h3 = document.createElement("h3");
        if (name != "") {
          h3.innerHTML = essen.capitalize(name);
          content_container.appendChild(h3);
        }

        if (typeof arr != "string")
          arr.forEach((s) => {
            const p = document.createElement("p");
            p.innerHTML = s;
            content_container.appendChild(p);
          });
        else {
          const p = document.createElement("p");
          p.innerHTML = arr;
          content_container.appendChild(p);
        }
      }

      container.addEventListener("click", (e) => {
        if (
          e.target.classList.contains("product_data") ||
          e.target.classList.contains("fa-xmark")
        ) {
          container.classList.remove("active");
          body.style.height = "fit-content";
          body.style.overflow = "visible";
        }
      });
    }
  });
}

export default homeW;
