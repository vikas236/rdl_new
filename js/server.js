const server_url = "https://rdl-server-new.vercel.app";
const dev_url = "http://localhost:3000";

const serverW = (() => {
  function getTable(table_name) {
    const requestData = {
      tableName: table_name,
    };

    return fetch(`${server_url}/get_table`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error:", error);
        throw error; // Re-throw the error to be caught by the caller
      });
  }

  function truncateTable(table_name) {
    const requestData = {
      tableName: table_name,
    };

    return fetch(`${server_url}/clear_table`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error:", error);
        throw error; // Re-throw the error to be caught by the caller
      });
  }

  function getColumn(table_name, col_names, condition) {
    const requestData = {
      tableName: table_name,
      columnNames: col_names,
    };
    if (condition) requestData.name = condition;

    return fetch(`${server_url}/get_column`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error:", error);
        throw error; // Re-throw the error to be caught by the caller
      });
  }

  function getProperty(table_name, col_name, product_name, category) {
    const requestData = {
      tableName: table_name,
      columnName: col_name,
      productName: product_name,
      category: category,
    };

    return fetch(`${server_url}/get_property`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error:", error);
        throw error; // Re-throw the error to be caught by the caller
      });
  }

  function getCategory(table_name, col_name, product_name) {
    const requestData = {
      tableName: table_name,
      columnName: col_name,
      productName: product_name,
    };

    return fetch(`${server_url}/get_category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error:", error);
        throw error; // Re-throw the error to be caught by the caller
      });
  }

  function getProductData(table_name, product_name, category) {
    const requestData = {
      tableName: table_name,
      productName: product_name,
      category: category,
    };

    return fetch(`${server_url}/get_product_data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error:", error);
        throw error; // Re-throw the error to be caught by the caller
      });
  }

  function getColumnNames(table_name) {
    const requestData = {
      tableName: table_name,
    };

    return fetch(`${server_url}/get_column_names`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error:", error);
        throw error; // Re-throw the error to be caught by the caller
      });
  }

  function uploadImage(table_name, url) {
    const requestData = {
      tableName: table_name,
      imageUrl: url,
    };

    return fetch(`${server_url}/upload_image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error:", error);
        throw error; // Re-throw the error to be caught by the caller
      });
  }

  function getCategories(table_name) {
    const requestData = {
      tableName: table_name,
    };

    return fetch(`${server_url}/get_categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error:", error);
        throw error; // Re-throw the error to be caught by the caller
      });
  }

  function updateProperty(table_name, product_name, property_name, new_value) {
    const requestData = {
      tableName: table_name,
      columnName: property_name,
      productName: product_name,
      newValue: new_value,
    };

    return fetch(`${server_url}/update_property`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error:", error);
        throw error; // Re-throw the error to be caught by the caller
      });
  }

  function deleteTable(table_name) {
    const requestData = {
      tableName: table_name,
    };

    return fetch(`${server_url}/delete_table`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error:", error);
        throw error; // Re-throw the error to be caught by the caller
      });
  }

  function getProducts(table_name, category) {
    const requestData = {
      tableName: table_name,
      category: category,
    };

    return fetch(`${server_url}/get_products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error:", error);
        throw error; // Re-throw the error to be caught by the caller
      });
  }

  return {
    getTable,
    truncateTable,
    getColumn,
    getProperty,
    getCategory,
    getProductData,
    getColumnNames,
    uploadImage,
    getCategories,
    updateProperty,
    getProducts,
  };
})();

export default serverW;
