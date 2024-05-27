import serverW from "./server.js";
import essen from "./essentials.js";

const clickEvent = essen.createClickEvent();

async function adminW() {
  adminLinks.linksActivity();
}

const adminLinks = (() => {
  let links;
  let editors;

  function linksActivity() {
    links = document.querySelectorAll(".admin_links i");
    editors = document.querySelectorAll(".admin .editor");

    setTimeout(() => {
      links[0].dispatchEvent(clickEvent);
    }, 1);

    links.forEach((e, i) => {
      e.addEventListener("click", () => {
        linksColor(e);
        showEditor(i);
        runJs(i);
      });
    });
  }

  function linksColor(e) {
    links.forEach((l) => l.classList.remove("active"));
    e.classList.add("active");
  }

  function showEditor(i) {
    editors.forEach((e) => e.classList.remove("active"));
    editors[i].classList.add("active");
  }

  function runJs(i) {
    if (i == 0) productEditor.searchW.searchInput();
    else if (i == 1) slideEditor.showSlides();
    else if (i == 2) galleryEditor.showGallery();
  }

  return {
    linksActivity,
  };
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
        results.classList.add("active");
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

    function addData(data) {
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
      propertyEditorW.showProperty(select, [product_name, index, category]);
      propertyEditorW.addCloseButtons();
    }

    return { showEditor };
  })();

  const propertyEditorW = (() => {
    let product_name;
    let index;
    let category;

    async function showProperty(select, obj) {
      [product_name, index, category] = obj;
      addPropertyValue(select);

      select.addEventListener("input", async () => {
        addPropertyValue(select);
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

    async function addPropertyValue(select) {
      const name = essen.deCapitalize(select.value);
      let property_value = await createProperty(name);
      let result = await getPropertyValue(name);

      let data = result[0][name];
      if (data == null || data == undefined) data = "";

      if (name == "image") {
        property_value.childNodes[0].src = data;
        productImage(property_value);
      } else if (name == "category")
        property_value.value = essen.capitalize(data);
      else if (name == "name") property_value.value = essen.capitalize(data);
      else property_value.value = data;
    }

    function productImage(container) {
      const img = container.childNodes[0];
      const input = container.childNodes[1];

      input.addEventListener("input", async () => {
        const file = input.files[0];
        const url = await imageToBase64(file);

        img.src = `data:image/png;base64,${url}`;
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
      save_btn.addEventListener("click", () => {
        const property_name = document.querySelector(
          ".product_editor_data select"
        ).value;
        let property_value = document.querySelector(
          ".product_editor .property_value"
        );
        let value;

        if (property_name == "Name" || property_name == "Category")
          value = essen.deCapitalize(property_value.value);
        else if (property_name == "Image") {
          value = property_value.childNodes[0].src;
          if (value.length < 50) value = "";
        } else value = property_value.value;

        serverW.updateProperty(
          essen.deCapitalize(index),
          essen.deCapitalize(product_name),
          essen.deCapitalize(property_name),
          value
        );
      });
    }

    return { showProperty, addCloseButtons };
  })();

  return { searchW };
})();

const slideEditor = (() => {
  async function showSlides() {
    // await serverW.truncateTable("slides").then((data) => console.log(data));
    await serverW.getTable("slides").then((data) => {
      const container = document.querySelector(
        ".slides_editor .slides_container"
      );
      container.innerHTML = "";
      data.forEach((e) => addImage(e.image));
    });
    const input = document.querySelector(".upload_slide input");

    input.addEventListener("input", async () => {
      const base64String = await imageToBase64(input.files[0]);
      addImage(base64String);
      serverW.uploadImage("slides", base64String);
    });
  }

  function addImage(url) {
    const container = document.querySelector(
      ".slides_editor .slides_container"
    );

    const image = document.createElement("div");
    image.className = "image inactive";
    image.innerHTML = `<img src="data:image/jpeg;base64,${url}"><i class="fa-solid fa-minus"></i>`;
    container.appendChild(image);
    removeImage(image);

    image.addEventListener("click", () => {
      const images = document.querySelectorAll(".slides_editor .image");
      images.forEach((e) => e.classList.add("inactive"));
      image.classList.remove("inactive");
    });
    adjustSlides();
  }

  function adjustSlides() {
    const slides = document.querySelectorAll(".slides_container .image");
    let slide_active = false;

    slides.forEach((e) => {
      if (!e.classList.contains("inactive")) slide_active = true;
    });

    if (!slide_active) slides[0].classList.remove("inactive");
  }

  function removeImage(image) {
    const img = image.childNodes[0];
    const removebtn = image.childNodes[1];

    removebtn.addEventListener("click", () => showConfirmation(image));
  }

  function showConfirmation(image) {
    const modal = document.querySelector(".confirmation_modal");

    let src = image.childNodes[0].src;
    src = src.replace("data:image/jpeg;base64,", "");
  }

  return { showSlides };
})();

const galleryEditor = (() => {
  let container;
  let input;

  async function showGallery() {
    container = document.querySelector(".gallery_editor .gallery_container");
    input = document.querySelector(".upload_gimage").childNodes[3];

    await serverW.getTable("gallery").then((result) => {
      result.forEach((e) => addGImage(e.image));
    });

    input.addEventListener("input", async () => {
      const url = await imageToBase64(input.files[0]);
      await serverW.uploadImage("gallery", url).then(() => addGImage(url));
    });
  }

  function addGImage(url) {
    const image = document.createElement("div");
    image.classList.add("image");
    image.innerHTML = `<img src="data:image/jpeg;base64,${url}"><i class="fa-solid fa-square-minus"></i>`;
    container.appendChild(image);
    removeGImage(image);
  }

  function removeGImage(image) {
    const removebtn = image.childNodes[1];

    removebtn.addEventListener("click", () => {
      console.log("rmove image");
    });
  }

  return { showGallery };
})();

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
