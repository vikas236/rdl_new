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
    }
  });
}

export default homeW;
