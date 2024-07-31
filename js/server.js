const server_url = "https://rdl-server-new.vercel.app";
// const server_url = "http://localhost:3000";

const serverW = (() => {
  async function getTable(table_name) {
    const requestData = {
      tableName: table_name,
    };

    try {
      const response = await fetch(`${server_url}/get_table`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error; // Re-throw the error to be caught by the caller
    }
  }

  async function truncateTable(table_name) {
    const requestData = {
      tableName: table_name,
    };

    try {
      const response = await fetch(`${server_url}/clear_table`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error; // Re-throw the error to be caught by the caller
    }
  }

  async function getColumn(table_name, col_names, condition) {
    const requestData = {
      tableName: table_name,
      columnNames: col_names,
    };
    if (condition) requestData.name = condition;

    try {
      const response = await fetch(`${server_url}/get_column`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error; // Re-throw the error to be caught by the caller
    }
  }

  async function getProperty(table_name, col_name, product_name, category) {
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

  async function getCategory(table_name, col_name, product_name) {
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

  async function getProductData(table_name, product_name, category) {
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
        console.log(response.json());
        return response.json();
      })
      .catch((error) => {
        console.error("Error:", error);
        throw error; // Re-throw the error to be caught by the caller
      });
  }

  async function getColumnNames(table_name) {
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

  async function uploadImage(table_name, url) {
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

  async function getCategories(table_name) {
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

  async function updateProperty(
    table_name,
    product_name,
    property_name,
    new_value
  ) {
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

  async function deleteTable(table_name) {
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

  async function getProducts(table_name, category) {
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

  async function updateSellers(id, names) {
    const requestData = {
      id: id,
      names: names,
    };

    return fetch(`${server_url}/update_sellers`, {
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

  async function findProduct(table_name, name) {
    const requestData = {
      tableName: table_name,
      productName: name,
    };

    return fetch(`${server_url}/find_product`, {
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

  async function addNewProduct(product_name, table_name, category) {
    const requestData = {
      name: product_name,
      table: table_name,
      category: category,
    };

    try {
      const response = await fetch(`${server_url}/add_product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error; // Re-throw the error to be caught by the caller
    }
  }

  async function removeProduct(product_name, table_name, category) {
    const requestData = {
      name: product_name,
      table: table_name,
      category: category,
    };

    try {
      const response = await fetch(`${server_url}/remove_product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error; // Re-throw the error to be caught by the caller
    }
  }

  return {
    getTable,
    updateSellers,
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
    findProduct,
    addNewProduct,
    removeProduct,
  };
})();

export default serverW;
