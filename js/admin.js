import serverW from "./server.js";
import essen from "./essentials.js";

const data_order = [
  "name",
  "para",
  "indications",
  "composition",
  "minerals",
  "application",
  "dosage",
  "precautions",
  "usage",
  "key_benifits",
  "storage",
  "packaging",
  "category",
  "image",
  "tagline",
  "hidden",
];

async function adminW() {
  const nav = document.querySelector("nav");
  const footer = document.querySelector("footer");
  const queries = document.querySelector(".queries");
  nav.style.display = "none";
  footer.style.display = "none";
  queries.style.display = "none";
  menuEditor.menuNames();
  productEditor.searchW.searchInput();
  adminLogin();
  bestSellers();
  sideBar();
}

function sideBar() {
  const admin = document.querySelector(".admin .wrapper");
  const links = document.querySelectorAll(".admin .sidebar i");

  links.forEach((e, i) => {
    e.addEventListener("click", () => {
      links.forEach((e) => e.classList.remove("active"));

      e.classList.add("active");
      adjustSection(i);
    });
  });

  document
    .querySelectorAll(".admin .sidebar i")[0]
    .dispatchEvent(new Event("click"));

  function adjustSection(i) {
    const editors = document.querySelectorAll(".editor");
    editors.forEach((e) => e.classList.remove("active"));
    editors[i].classList.add("active");
  }
}

function adminLogin() {
  const login = document.querySelector(".admin_login");
  const username = document.querySelector(".admin_login .username");
  const password = document.querySelector(".admin_login .password");
  const button = document.querySelector(".admin_login button");

  // login.classList.remove("active");
  button.addEventListener("click", () => {
    if ((username.value == "admin", password.value == "pass62")) {
      essen.popupMessage("login successfull");
      login.classList.remove("active");
    } else essen.popupMessage("login unsuccessfull");
  });
}

const menuEditor = (() => {
  let product_name, category_name, table_name;

  function menuNames() {
    const names = document.querySelectorAll(".menu_editor .menu_name");
    const categories_container = document.querySelector(".menu_categories");

    setTimeout(() => {
      names[0].click();
    }, 0);
    names.forEach((e) => {
      e.addEventListener("click", () => {
        names.forEach((e) => e.classList.remove("active"));
        e.classList.add("active");
        table_name = e.innerHTML;
        categories_container.innerHTML = `
        <div class="category_name loader"></div>
        <div class="category_name loader"></div>
        <div class="category_name loader"></div>
        <div class="category_name loader"></div>`;
        addCategories(e.innerHTML);
      });
    });
  }

  async function addCategories(menu_name) {
    const result = await getCategoryNames(essen.deCapitalize(menu_name));
    const container = document.querySelector(".admin .menu_categories");
    container.innerHTML = "";

    result.forEach((e) => {
      const span = document.createElement("span");
      span.classList.add("category_name");
      span.innerHTML = e;
      span.addEventListener("click", () => addProuctNames(menu_name, span));
      container.appendChild(span);
    });

    container.childNodes[0].click();
  }

  async function getCategoryNames(table_name) {
    let arr = [];

    await serverW.getCategories(table_name).then((result) => {
      result.forEach((e) => {
        const category = essen.capitalize(e.category);
        if (!arr.includes(category)) arr.push(category);
      });
    });

    return arr;
  }

  async function addProuctNames(menu_name, category) {
    const container = document.querySelector(".admin .product_names .wrapper");
    const category_names = document.querySelectorAll(
      ".admin .menu_categories .category_name"
    );
    category_names.forEach((e) => e.classList.remove("active"));

    category.classList.add("active");
    category_name = category.innerHTML;
    container.innerHTML = `<div class="name loader"></div>`;

    await serverW
      .getProducts(
        essen.deCapitalize(menu_name),
        essen.deCapitalize(category.innerHTML)
      )
      .then((result) => {
        container.innerHTML = "";

        result.forEach((e) => {
          const span = document.createElement("h3");
          span.classList.add("name");
          span.innerHTML = `<span>${essen.capitalize(
            e.name
          )}</span><i class="fa-solid fa-trash"></i>`;
          span.childNodes[0].addEventListener("click", () => {
            showProduct(menu_name, category, span.childNodes[0].innerHTML);
          });
          span.childNodes[1].addEventListener("click", () => {
            deleteProduct(span);
          });
          container.appendChild(span);
        });
        addButton(container);
      });
  }

  async function showProduct(menu_name, category_name, product_name) {
    const links = document.querySelectorAll(".sidebar i");

    await serverW.getColumnNames(essen.deCapitalize(menu_name)).then((data) => {
      productEditor.productEditorW.redirectFromMenu(data, product_name);
    });

    productEditor.propertyEditorW.redirectFromMenu([
      menu_name,
      category_name,
      product_name,
    ]);

    links[1].click();
  }

  function addButton(container) {
    const button = document.createElement("button");
    button.innerHTML = `<i class="fa-solid fa-plus"></i>
    <div class="input"><input type="text" placeholder="Enter Product Name" />
    <i class="fa-solid fa-check"></i><i class="fa-solid fa-xmark"></i></div>
    <div class="loader0"></div>`;
    const input = button.childNodes[2].childNodes[0];
    container.appendChild(button);
    const done_btn = button.childNodes[2].childNodes[2];
    const cancel_btn = button.childNodes[2].childNodes[3];

    button.childNodes[0].addEventListener("click", () => {
      button.classList.add("active");
      input.focus();

      done_btn.addEventListener("click", () => {
        productEditor.searchW
          .getProductNames(["prawn_products"])
          .then((data) => {
            addNewProduct(button, data);
          });
      });

      cancel_btn.addEventListener("click", () => revertAddingProduct(button));
    });
  }

  async function addNewProduct(button, data) {
    let isAvailable = true;
    const name = essen.deCapitalize(button.childNodes[2].childNodes[0].value);
    const input = button.childNodes[2].childNodes[0];

    data.forEach((e) => {
      const product_names = e[0];
      if (product_names.includes(name)) isAvailable = false;
    });

    if (isAvailable && name) {
      await serverW.addNewProduct(
        name,
        essen.deCapitalize(table_name),
        essen.deCapitalize(category_name)
      );

      const span = document.createElement("h3");
      span.classList.add("name");
      span.innerHTML = `<span>${essen.capitalize(
        name
      )}</span><i class="fa-solid fa-trash"></i>`;
      span.childNodes[0].addEventListener("click", () => {
        showProduct(
          essen.deCapitalize(table_name),
          essen.deCapitalize(category_name),
          name
        );
      });
      span.childNodes[1].addEventListener("click", () => {
        deleteProduct(span);
      });
      button.parentNode.insertBefore(span, button);

      revertAddingProduct(button);
    } else {
      essen.popupMessage("name taken");
    }
  }

  function revertAddingProduct(button) {
    button.classList.remove("active");
    const input = button.childNodes[2].childNodes[0];
    input.innerHTML = "";
  }

  function deleteProduct(span) {
    const dialog = document.querySelector(".delete_confirm");
    dialog.classList.add("active");
    const buttons = document.querySelectorAll(".delete_confirm button");
    const title = document.querySelector(".delete_confirm h1");

    title.innerHTML = `Remove ${span.childNodes[0].innerHTML}`;

    buttons[0].addEventListener("click", (e) => {
      dialog.classList.remove("active");
    });

    buttons[1].addEventListener("click", () => {
      dialog.childNodes[1].innerHTML = `<div class="loader0"></div>`;
      serverW
        .removeProduct(
          essen.deCapitalize(span.childNodes[0].innerHTML),
          essen.deCapitalize(table_name),
          essen.deCapitalize(category_name)
        )
        .then((data) => {
          essen.popupMessage(`${span.childNodes[0].innerHTML} Removed`);
          dialog.classList.remove("active");
          span.remove();
        });
    });
  }

  return { menuNames };
})();

const productEditor = (() => {
  let data_container;

  const searchW = (() => {
    let search, input, icon, results;

    async function searchInput() {
      declareVariables();
      searchIconW();
      input.focus();

      input.addEventListener("input", initSearch);
      input.addEventListener("keydown", (e) => {
        if (e.key == "Escape") {
          results.classList.remove("active");
          results.innerHTML = "";
          input.blur();
        }
      });
    }

    async function initSearch() {
      results.classList.add("active");
      results.innerHTML = `<div class="loader"></div>`;

      await getProductNames(["prawn_products", "poultry_products"]).then(
        (data) => {
          const product_names = sortResults(data);
          showResults(product_names);
        }
      );
    }

    async function showResults(product_names) {
      results.innerHTML = "";

      if (product_names.length == 0) results.classList.remove("active");
      else {
        product_names.forEach(cretateListItem);
      }
    }

    function cretateListItem(e) {
      const li = document.createElement("li");
      li.className = "result_item";

      li.innerHTML = `<span class="product_name">${essen.capitalize(
        e[0]
      )}</span><span class="index">${e[1]} > ${
        e[2]
      }</span><i class="fa-solid fa-pen-to-square edit_icon"></i>`;

      editIcon(li);

      results.appendChild(li);
    }

    function editIcon(li) {
      li.childNodes[2].addEventListener("click", () =>
        productEditorW.showEditor(li)
      );
    }

    function sortResults([product_names, categories]) {
      let index;
      let sub_index;
      const arr = [];

      product_names.forEach((e, i) => {
        e.forEach((name, j) => {
          let value = essen.deCapitalize(input.value);
          const regex = new RegExp(value);
          let condition = regex.test(name);

          if (condition && value != "" && value != " ") {
            index = i == 0 ? "Prawn Products" : "Poultry Products";
            sub_index = essen.capitalize(categories[i][j]);
            arr.push([name, index, sub_index]);
          }
        });
      });

      return arr;
    }

    function declareVariables() {
      search = document.querySelector(".search_bar");
      input = search.childNodes[1];
      icon = search.childNodes[2];
      results = search.childNodes[4];
    }

    function searchIconW() {
      input.addEventListener("focus", () => {
        icon.style.color = "#ff5959";
      });
      input.addEventListener("blur", () => {
        icon.style.color = "#ff928b";
      });
    }

    async function getProductNames(tables) {
      const product_names = [[], []];
      const categories = [[], []];

      for (let i = 0; i < tables.length; i++) {
        await serverW
          .getColumn(tables[i], ["name", "category"])
          .then((data) => {
            data.forEach((e) => {
              product_names[i].push(e.name);
              categories[i].push(e.category);
            });
          });
      }

      return [product_names, categories];
    }

    function closeSearch(string) {
      input.value = string;
      input.blur();
      results.innerHTML = "";
      results.classList.remove("active");
    }

    return {
      searchInput,
      getProductNames,
      closeSearch,
    };
  })();

  const productEditorW = (() => {
    let product_name;
    let index;
    let category;

    async function showEditor(li) {
      data_container = document.querySelector(".product_editor_data");
      data_container.innerHTML = "";

      if (li.length == 2) {
        product_name = li[0];
        index = li[1];
      } else {
        product_name = li.childNodes[0].innerHTML;
        index = li.childNodes[1].innerHTML.replace(/&gt;.*$/, "").trim();
      }
      category = await serverW.getCategory(
        essen.deCapitalize(index),
        "category",
        essen.deCapitalize(product_name)
      );
      category = category[0].category;

      await serverW.getColumnNames(essen.deCapitalize(index)).then((data) => {
        addData(data);
      });
    }

    function redirectFromMenu(data, name) {
      data_container = document.querySelector(".product_editor_data");
      data_container.innerHTML = "";
      product_name = name;

      addData(data, 1);
    }

    function addData(data, n) {
      data = createOrder(data);
      searchW.closeSearch(essen.capitalize(product_name));

      const title = document.createElement("h3");
      title.className = "product_title";
      title.innerHTML = essen.capitalize(product_name);
      const options = data.map((e) => essen.capitalize(e));
      const select = document.createElement("select");
      select.id = "property_selector";
      const label = document.createElement("label");

      label.for = "property_selector";
      label.innerHTML = "Select a Property to Edit";

      options.forEach((e) => {
        const option = document.createElement("option");
        option.textContent = e;
        select.appendChild(option);
      });

      data_container.appendChild(title);
      data_container.appendChild(label);
      data_container.appendChild(select);
      if (!n)
        propertyEditorW.showProperty(select, [product_name, index, category]);
      propertyEditorW.addCloseButtons();
    }

    // create order in column names of both products tables
    function createOrder(arr) {
      return data_order;
    }

    return { showEditor, redirectFromMenu };
  })();

  const propertyEditorW = (() => {
    let product_name;
    let index;
    let category;

    async function showProperty(select, obj) {
      [product_name, index, category] = obj;
      addPropertyValue(essen.deCapitalize(select.value));

      select.addEventListener("input", async () => {
        addPropertyValue(essen.deCapitalize(select.value));
      });
    }

    async function createProperty(name) {
      let property_value;

      if (data_container.lastChild.classList.contains("property_value"))
        data_container.lastChild.remove();

      if (name == "category") {
        property_value = document.createElement("select");
        const select = document.createElement("select");
        select.classList.add("property_value");
        const options = await getCategoryNames("prawn_products");

        options.forEach((e) => {
          const option = document.createElement("option");
          option.textContent = e;
          select.appendChild(option);
        });

        data_container.appendChild(select);

        return select;
      } else if (name == "image") {
        const image = document.createElement("div");
        image.classList.add("property_value");
        image.innerHTML = `<img><input type="file"><span><i class="fa-solid fa-plus"></i> add</span>`;

        data_container.appendChild(image);
        return image;
      } else {
        property_value = document.createElement("textarea");
        property_value.classList.add("property_value");
        property_value.placeholder = "empty";
        data_container.appendChild(property_value);
      }

      return property_value;
    }

    function redirectFromMenu(arr) {
      data_container = document.querySelector(".product_editor_data");

      index = arr[0];
      category = arr[1].innerHTML;
      product_name = arr[2];
      addPropertyValue(essen.deCapitalize("name"));

      const select = document.querySelector("select");

      select.addEventListener("input", async () => {
        addPropertyValue(essen.deCapitalize(select.value));
      });
    }

    async function getCategoryNames(table_name) {
      let arr = [];

      await serverW.getCategories(table_name).then((result) => {
        result.forEach((e) => {
          const category = essen.capitalize(e.category);
          if (!arr.includes(category)) arr.push(category);
        });
      });

      return arr;
    }

    async function addPropertyValue(name) {
      let property_value = await createProperty(name);
      let result = await getPropertyValue(name);

      let data = result[0][name];
      if (data == null || data == undefined) data = "";

      if (name == "image") {
        property_value.childNodes[0].src = data;
        if (data == "")
          property_value.childNodes[0].src = "../images/logo/logo.svg";
        productImage(property_value);
      } else if (name == "category")
        property_value.value = essen.capitalize(data);
      else if (name == "name") property_value.value = essen.capitalize(data);
      else if (name == "tagline")
        property_value.value = data.replaceAll("_", " ");
      else if (name == "hidden") {
        if (data) property_value.value = "yes";
        else property_value.value = "no";
      } else {
        if (!typeof data != "object" && data != "")
          property_value.value = data.join("\n");
        else property_value.value = data;
      }
    }

    function productImage(container) {
      const img = container.childNodes[0];
      const input = container.childNodes[1];

      input.addEventListener("input", async () => {
        const file = input.files[0];
        const url = await imageToBase64(file);
        if (url) img.src = `data:image/png;base64,${url}`;
        else img.src = "";
      });
    }

    async function getPropertyValue(name) {
      let data;
      await serverW
        .getProperty(
          essen.deCapitalize(index),
          essen.deCapitalize(name),
          essen.deCapitalize(product_name),
          essen.deCapitalize(category)
        )
        .then((result) => (data = result));

      return data;
    }

    function addCloseButtons() {
      const product_editor = document.querySelector(".product_editor");

      const send_data = document.createElement("div");
      send_data.classList.add("send_data");
      send_data.innerHTML = `<span class="close_btn">close</span><span class="save_btn">save</span>`;
      product_editor.appendChild(send_data);
      updateProperty(send_data.childNodes[1]);
      closePropertyEditor(send_data.childNodes[0]);
    }

    function closePropertyEditor(close_btn) {
      close_btn.addEventListener("click", () => {
        let property_editor = document.querySelector(".product_editor_data");
        property_editor.innerHTML = "";
        close_btn.parentElement.remove();
        property_editor.innerHTML = `<div class="bg_image"><img src="../images/background_nobg.png" /><span>product details</span></div>`;
      });
    }

    function updateProperty(save_btn) {
      save_btn.addEventListener("click", async (e) => {
        save_btn.innerHTML = `<div class="loader"></div>`;
        if (save_btn.classList.contains("inactive")) {
          essen.popupMessage("please wait...");
        } else {
          save_btn.classList.add("inactive");
          const property_name = document.querySelector(
            ".product_editor_data select"
          ).value;
          let property_value = document.querySelector(
            ".product_editor .property_value"
          );
          let value;

          if (
            property_name == "Name" ||
            property_name == "Category" ||
            property_name == "Tagline"
          )
            value = essen.deCapitalize(property_value.value);
          else if (property_name == "Image") {
            value = property_value.childNodes[0].src;
            if (value.length < 50) value = "";
          } else if (property_name == "Hidden") {
            if (property_value.value == "yes") value = true;
            else value = false;
          } else value = property_value.value.split("\n");

          await serverW
            .updateProperty(
              essen.deCapitalize(index),
              essen.deCapitalize(product_name),
              essen.deCapitalize(property_name),
              value
            )
            .then(async (data) => {
              save_btn.innerHTML = "save";
              save_btn.classList.remove("inactive");
              essen.popupMessage("update successful");
            });
        }
      });
    }

    return { showProperty, addCloseButtons, redirectFromMenu };
  })();

  return { searchW, productEditorW, propertyEditorW };
})();

function bestSellers() {
  const input = document.querySelectorAll(".admin .seller input");
  input[0].focus();

  input.forEach((e) => {
    e.addEventListener("input", async () => {
      e.parentElement.childNodes[3].innerHTML = `<div class="loader"></div>`;
      const results = await getProductNames([
        "prawn_products",
        "poultry_products",
      ]);
      const suggestions = sortSuggestions(e.value, results);
      createSuggestionsList(e, suggestions);
    });
  });

  function addSellers() {
    serverW.getTable("bestsellers").then((data) => {
      // console.log(data);
      input.forEach((e, i) => {
        e.value = data[0].names[i];
      });
    });
  }
  addSellers();

  async function getProductNames(tables) {
    const product_names = [[], []];
    const categories = [[], []];

    for (let i = 0; i < tables.length; i++) {
      await serverW.getColumn(tables[i], ["name", "category"]).then((data) => {
        data.forEach((e) => {
          product_names[i].push(e.name);
          categories[i].push(e.category);
        });
      });
    }

    return [product_names, categories];
  }

  function sortSuggestions(str, arr) {
    const result = [];
    const regex = new RegExp(str, "i");

    arr[0].forEach((e) => {
      e.forEach((name) => {
        if (regex.test(name)) result.push(essen.capitalize(name));
      });
    });

    return result.slice(0, 4);
  }

  function createSuggestionsList(parent, list) {
    const ul = parent.parentElement.childNodes[3];
    ul.innerHTML = "";

    list.forEach((e) => {
      const li = document.createElement("li");
      li.innerHTML = e;
      selectSeller(li);
      ul.appendChild(li);
    });
  }

  function selectSeller(li) {
    li.addEventListener("click", () => {
      const input = li.parentElement.parentElement.childNodes[1];

      input.value = li.innerHTML;
      li.parentElement.innerHTML = "";
    });
  }

  function updateSellers() {
    const button = document.querySelector(".update_sellers");

    button.addEventListener("click", async () => {
      button.innerHTML = `<div class="loader"></div>`;
      button.classList.add("inactive");
      const arr = [];
      input.forEach((e) => {
        arr.push(e.value);
      });

      if (button.classList.contains("inactive"))
        await serverW.updateSellers("1", arr).then(() => {
          button.innerHTML = `Update`;
          button.classList.remove("inactive");
          essen.popupMessage("update successfull");
        });
    });
  }
  updateSellers();
}

function imageToBase64(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject("No file provided");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result.split(",")[1];
      resolve(base64String);
    };
    reader.onerror = () => {
      reject("Error reading file");
    };

    reader.readAsDataURL(file);
  });
}

export default adminW;
