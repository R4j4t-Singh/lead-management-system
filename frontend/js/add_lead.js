const form = document.getElementById("lead-form");
const restaurantSelect = document.getElementById("restaurantSelect");
const productSelect = document.getElementById("productSelect");
const totalAmount = document.getElementById("total_amount");
const quantity = document.getElementById("quantity");
const addProductBtn = document.getElementById("addProductBtn");
const productTable = document.getElementById("productTable");
const price_per_unit_div = document.getElementById("price_per_unit");
const total_value_div = document.getElementById("total_value");
const assignedToSelect = document.getElementById("assignedToSelect");

let product_name;
let price_per_unit = 0;
let measure_unit = 0;
let total_value = 0;
let products = [];

form.addEventListener("submit", async function(event) {
  event.preventDefault();
  const title = event.target.title.value;
  const call_frequency = event.target.callFrequency.value;
  const restaurantID = event.target.restaurantSelect.value;
  const assignedTo = event.target.assignedToSelect.value;
  try {
    const response = await fetch("http://localhost:3000/leads/add-lead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "session-token": localStorage.getItem("uID"),
      },
      body: JSON.stringify({
        title,
        call_frequency,
        assignedTo,
        restaurantID,
        total_value,
        products,
      }),
    });

    const data = await response.json();
    const leadID = data.leadID;

    window.location.href = `lead_details.html?leadID=${leadID}`;
  } catch (error) {
    console.error(error);
  }
});

async function getRestaurants() {
  try {
    fetch("http://localhost:3000/restaurants/get-restaurants", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "session-token": localStorage.getItem("uID"),
      },
    })
      .then((response) => response.json())
      .then((restaurants) => {
        restaurants.forEach((restaurant) => {
          const option = document.createElement("option");
          option.value = restaurant.restaurantID;
          option.innerText = restaurant.name;
          restaurantSelect.appendChild(option);
        });
      });
  } catch (error) {
    console.error(error);
  }
}

async function getProducts() {
  try {
    fetch("http://localhost:3000/products/get-products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "session-token": localStorage.getItem("uID"),
      },
    })
      .then((response) => response.json())
      .then((products) => {
        products.forEach((product) => {
          const option = document.createElement("option");
          option.value = product.productID;
          option.innerText = product.name;
          productSelect.appendChild(option);
        });
      });
  } catch (error) {
    console.error(error);
  }
}

async function getAccounts() {
  try {
    fetch("http://localhost:3000/accounts/get-users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "session-token": localStorage.getItem("uID"),
      },
    })
      .then((response) => response.json())
      .then((users) => {
        users.forEach((user) => {
          const option = document.createElement("option");
          option.value = user.accountID;
          option.innerText = user.name;
          assignedToSelect.appendChild(option);
        });
      });
  } catch (error) {
    console.error(error);
  }
}

getRestaurants();
getProducts();
getAccounts();

quantity.addEventListener("change", async function(event) {
  totalAmount.value = price_per_unit * quantity.value;
});

addProductBtn.addEventListener("click", async function(event) {
  products.push({
    productID: productSelect.value,
    quantity: quantity.value,
    total_price: totalAmount.value,
  });

  total_value += parseInt(totalAmount.value);
  total_value_div.innerText = total_value;

  const row = document.createElement("tr");
  const product = document.createElement("td");
  product.innerText = product_name;
  row.appendChild(product);
  const quantityEle = document.createElement("td");
  quantityEle.innerText = quantity.value;
  row.appendChild(quantityEle);
  const measure_unit_ele = document.createElement("td");
  measure_unit_ele.innerText = measure_unit;
  row.appendChild(measure_unit_ele);
  const price = document.createElement("td");
  price.innerText = totalAmount.value;
  row.appendChild(price);
  productTable.appendChild(row);

  productSelect.value = "";
  quantity.value = "";
  price_per_unit_div.value = "";
  totalAmount.value = "";
});

productSelect.addEventListener("change", async function(event) {
  const productID = event.target.value;
  if (productID) {
    try {
      const response = await fetch(
        `http://localhost:3000/products/get-product/${productID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "session-token": localStorage.getItem("uID"),
          },
        }
      );
      const product = await response.json();
      product_name = product.name;
      price_per_unit = product.price_per_unit;
      measure_unit = `${price_per_unit} / ${product.measure_unit}`;
      price_per_unit_div.value = measure_unit;
      totalAmount.value = price_per_unit * quantity.value;
    } catch (error) {
      console.error(error);
    }
  }
});
