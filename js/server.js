const serverW = (() => {
  function getTable(table_name) {
    const requestData = {
      tableName: table_name,
    };

    return fetch("http://localhost:3000/get_table", {
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

    return fetch("http://localhost:3000/clear_table", {
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

    return fetch("http://localhost:3000/get_column", {
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

    return fetch("http://localhost:3000/get_property", {
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

    return fetch("http://localhost:3000/get_category", {
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

  function getProductData(table_name, product_name) {
    const requestData = {
      tableName: table_name,
      productName: product_name,
    };

    return fetch("http://localhost:3000/get_product_data", {
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

    return fetch("http://localhost:3000/get_column_names", {
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

    return fetch("http://localhost:3000/upload_image", {
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

    return fetch("http://localhost:3000/get_categories", {
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

    return fetch("http://localhost:3000/update_property", {
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
  };
})();

export default serverW;
