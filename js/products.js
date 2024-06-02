import serverW from "./server.js";
import essen from "./essentials.js";

async function productW() {
  const body = document.querySelector("body");
  const products_names = [];

  async function getPorudctNames(table_name) {
    await serverW.getColumn(table_name, ["name", "category"]).then((data) => {
      //   console.log(data[0]);
      data.forEach((e) =>
        products_names.push([e.name, e.category, table_name])
      );
    });
  }

  await getPorudctNames("prawn_products");
  await getPorudctNames("poultry_products");

  function addProductsNames() {
    const container = document.querySelector(".products_grid");

    products_names.forEach(async (e) => {
      const product = document.createElement("h3");
      product.classList.add("product");
      product.innerHTML = essen.capitalize(e[0]);
      container.appendChild(product);
      productActivity(e, product);
    });
  }

  addProductsNames();

  function productActivity(arr, name) {
    const preview = document.querySelector(".product_preview");

    document.addEventListener("mousemove", async (e) => {
      adjustPreview(preview, e);
      if (e.target.classList.contains("product")) {
        if (e.target.innerHTML == essen.capitalize(arr[0])) {
          if (body.offsetWidth > 1360) preview.classList.add("active");
          adjustPreview(preview, e);
          await showPreview(preview, arr, e);
        }
      } else {
        preview.classList.remove("active");
      }
    });

    name.addEventListener("click", () => {
      if (arr[0] == essen.deCapitalize(name.innerHTML))
        serverW.getProductData(arr[2], arr[0], arr[1]).then((data) => {
          productDataW.showProduct(arr, data);
        });
    });
  }

  function adjustPreview(preview, e) {
    if (e.clientX < screen.width - preview.offsetWidth - 100)
      preview.style.left = e.clientX + 10 + "px";
    else preview.style.left = e.clientX - preview.offsetWidth + "px";
    if (e.clientY < screen.height - preview.offsetHeight - 100)
      preview.style.top = e.clientY + 10 + "px";
    else preview.style.top = e.clientY - preview.offsetHeight + "px";
  }

  async function showPreview(container, arr, e) {
    const name = e.target.innerHTML;
    const condition =
      container.childElementCount > 0 &&
      container.childNodes[3].innerHTML == name;

    if (!condition) {
      container.innerHTML = "";
      await serverW.getProductData(arr[2], arr[0], arr[1]).then((data) => {
        previewContent(container, data, arr);
      });
    }
  }

  function previewContent(container, data, arr) {
    container.innerHTML = "";
    const img = document.createElement("img");
    const name = document.createElement("h3");
    const category = document.createElement("span");
    const hr = document.createElement("hr");

    if (data.image == null || data.image.length < 50) {
      img.style.display = "none";
    } else img.src = `${data.image}`;
    category.innerHTML = `${essen.capitalize(arr[2])}/${essen.capitalize(
      arr[1]
    )}/${essen.capitalize(arr[0])}`;
    name.innerHTML = essen.capitalize(data.name);

    container.appendChild(img);
    container.appendChild(hr);
    container.appendChild(category);
    container.appendChild(name);
  }

  const productDataW = (() => {
    let product_data;
    function showProduct(arr, data) {
      product_data = document.querySelector(".product_data");
      product_data.innerHTML = "";

      let composition = null;
      let minerals = null;

      if (data.composition != null) composition = [data.composition.join(", ")];
      if (data.minerals != null) minerals = [data.minerals.join(", ")];

      createTitle(data);
      createImage(data.image);
      createCategory(arr);
      createPoints("para0", data.para);
      createPoints("indications", data.indications);
      createPoints("composition", composition);
      createPoints("minerals", minerals);
      createPoints("application", data.application);
      createPoints("dosage", data.dosage);
      createPoints("precautions", data.precautions);
      createPoints("usage", data.usage);
      createPoints("key_benifits", data.key_benifits);
      createPoints("storage", data.storage);
      createPoints("packaging", data.packaging);
    }

    function createTitle(data) {
      const title = document.createElement("h2");
      const s = essen.capitalize(data.name);

      const middle = s.length / 2;
      const result = `${s.substr(0, middle)}<span>${s.substr(middle)}`;
      title.innerHTML = result;

      product_data.appendChild(title);
    }

    function createImage(url) {
      if (url != null && url.length > 50) {
        const img = document.createElement("div");
        img.classList.add("image");
        img.innerHTML = `<img src=${url} />`;
        product_data.appendChild(img);
      }
    }

    function createCategory(arr) {
      const span = document.createElement("span");
      span.classList.add("category");

      span.innerHTML = `${essen.capitalize(arr[2])}/${essen.capitalize(
        arr[0]
      )}/${essen.capitalize(arr[1])}`;

      product_data.appendChild(span);
    }

    function createPoints(title, list) {
      const points = document.createElement("div");

      if (title[title.length - 1] != 0 && list != null) {
        const h3 = document.createElement("h3");
        h3.innerHTML = essen.capitalize(title);
        points.appendChild(h3);
      }

      if (list != null) {
        list.forEach((e) => {
          let p;
          if (title == "para0") p = document.createElement("p");
          else p = document.createElement("span");
          p.innerHTML = e;
          points.appendChild(p);
        });
      }

      if (points.innerHTML != "") product_data.appendChild(points);
    }

    return { showProduct };
  })();

  function halfRed(s) {}
}

export default productW;
