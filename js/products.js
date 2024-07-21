import serverW from "./server.js";
import essen from "./essentials.js";

const products_order = [
  "immunostim",
  "act_prime",
  "revive",
  "vibriocide",
  "vibrinil",
  "bacto_cube",
  "edi-prob",
  "rdl_min",
  "geomin",
  "vitazyme_c",
  "nutrimax",
  "armour",
  "oxy_mask",
  "sanoclean",
  "bactericide",
  "floc_6",
  "bloomin",
  "geo_prob",
  "pro_ps",
  "geoclean_pro",
  "nitro_clear",
  "minerstim",
  "quick_yeast",
  "moult_stim",
  "livguard",
  "bottom_guard",
  "micro_cube",
  "gillend",
  "virucide",
  "santo_blu",
  "geoclean",
  "de_hardner",
  "feed_bind",
  "proscott",
  "rdl_snail_end",
];

function productW() {
  const searchW = (() => {
    const container = document.querySelector(".products .search .result_list");

    function searchInput() {
      const input = document.querySelector(".products .search input");

      input.focus();
      searchActivity(input);

      input.addEventListener("input", async () => {
        container.classList.add("active");
        container.innerHTML = `<div class="loader"></div>`;
        const term = input.value.trim().toLowerCase();
        let prawn_filtered,
          poultry_filtered = [];

        await getProductsData("prawn_products").then(
          async (data) =>
            (prawn_filtered = await sortData("prawn_products", term, data))
        );
        await getProductsData("poultry_products").then(
          (data) =>
            (poultry_filtered = sortData("poultry_products", term, data))
        );

        addResults([prawn_filtered, poultry_filtered]);
      });
    }

    async function getProductsData(string) {
      return await serverW.getTable(string).then((data) => data);
    }

    function sortData(table_name, term, data) {
      const regex = new RegExp(term, "i");
      const result = [];

      if (regex.test(table_name.replaceAll("_", " "))) {
        data.forEach((e) => result.push(e));
      } else {
        data.forEach((e) => {
          for (const [key, value] of Object.entries(e)) {
            if (value != null) {
              if (typeof value == "string") {
                if (regex.test(value.replaceAll("_", " "))) {
                  result.push(e);
                  break;
                }
              } else {
                value.forEach((s) => {
                  if (
                    regex.test(s.replaceAll("_", " ")) &&
                    result.length != 0 &&
                    result[result.length - 1].name != e.name
                  ) {
                    result.push(e);
                  }
                });
              }
            }
          }
        });
      }

      if (term == "") return [];
      else return result;
    }

    function addResults(data) {
      container.innerHTML = "";
      container.classList.remove("active");

      data.forEach((table, i) => {
        table.forEach((e) => {
          let subtext;
          if (i == 0)
            subtext = "Prawn Products" + `/${essen.capitalize(e.category)}`;
          else
            subtext = "Poultry Products" + `/${essen.capitalize(e.category)}`;

          const item = document.createElement("div");
          item.classList.add("item");

          item.innerHTML = `<span>${essen.capitalize(
            e.name
          )}</span><span class="subtext">${subtext}</span>`;

          item.addEventListener("click", () => {
            productsW.showProduct(e);
          });
          container.appendChild(item);
        });
      });
    }

    function searchActivity(input) {
      const broom = document.querySelector("i.fa-broom");
      const results = document.querySelector(".products .search .result_list");

      broom.addEventListener("click", () => {
        input.value = "";
        results.innerHTML = "";
        input.focus();
      });
    }

    return { searchInput };
  })();

  searchW.searchInput();

  const productsW = (() => {
    const container = document.querySelector(".products .products_list");
    function addProducts(table_name, category) {
      serverW.getProducts(table_name, category).then((data) => {
        const arr = [];
        let order = [];
        let remaining = [];

        data.forEach((e) => {
          if (products_order.includes(e.name))
            order.push(products_order.indexOf(e.name));
          else {
            remaining.push(e);
          }
        });

        order.sort().reverse();
        order.forEach((i) => {
          data.forEach((k) => {
            if (products_order[i] == k.name) arr.push(k);
          });
        });
        remaining.forEach((e) => arr.push(e));

        container.innerHTML = "";
        arr.forEach((e) => {
          const product = document.createElement("div");
          product.classList.add("product");
          product.innerHTML = `<span>${essen.capitalize(
            e.name
          )}</span><span class="category">${essen.capitalize(
            table_name
          )}/${essen.capitalize(e.category)}</span>`;
          product.addEventListener("click", () => {
            showProduct(e);
          });
          container.appendChild(product);
        });
      });
    }

    function addCategories(table_name) {
      const container0 = document.querySelector(".products .categories");
      container0.innerHTML = "";

      serverW.getCategories(table_name).then((data) => {
        const categories = sortCategories(data);
        categories.forEach((e) => {
          const span = document.createElement("span");
          span.innerHTML = essen.capitalize(e);
          container0.appendChild(span);
          span.addEventListener("click", () => {
            container.innerHTML = `<div class="loader"></div>`;
            container0.childNodes.forEach((e) => e.classList.remove("active"));
            span.classList.add("active");
            addProducts(table_name, e);
          });
        });
        container0.childNodes[0].click();
      });
    }

    function sortCategories(data) {
      const arr = [];

      data.forEach((e) => {
        if (!arr.includes(e.category) || arr.length == 0) arr.push(e.category);
      });

      return arr;
    }

    function showMenu() {
      const btns = document.querySelectorAll(".products .table_names h2");

      btns.forEach((h2) => {
        h2.addEventListener("click", () => {
          btns.forEach((e) => e.classList.remove("active"));
          h2.classList.add("active");
          addCategories(essen.deCapitalize(h2.innerHTML));
          container.innerHTML = `<div class="loader"></div>`;
        });
      });
      btns[0].click();
    }
    showMenu();

    function showProduct(data) {
      const body = document.querySelector("body");
      const container = document.querySelector(".products .product_data");
      const image_container = document.querySelector(
        ".products .product_data .image"
      );
      const content_container = document.querySelector(
        ".products .product_data .content"
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

        arr.forEach((s) => {
          const p = document.createElement("p");
          p.innerHTML = s;
          content_container.appendChild(p);
        });
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

    return { showProduct };
  })();
}

export default productW;
