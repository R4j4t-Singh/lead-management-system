const topPerformerTable = document.getElementById("top-performer-table");
const topProductstable = document.getElementById("top-products-table");
const bottomPerformerTable = document.getElementById("bottom-performer-table");

async function getTopPerformer() {
  try {
    let response = await fetch(
      "http://localhost:3000/performance/top-performer-by-orders",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "session-token": localStorage.getItem("uID"),
        },
      }
    );
    if (response.status === 401) {
      window.location.href = "index.html";
    }
    let data = await response.json();
    data.forEach((restaurant) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${restaurant.name}</td> <td>${
        restaurant.total_price
      }</td> <td>${restaurant.total_orders}</td> <td>${parseInt(
        restaurant.total_price / restaurant.total_orders
      )}</td>`;
      topPerformerTable.appendChild(row);
    });
  } catch (error) {
    console.error(error);
  }
}

async function getTopProducts() {
  try {
    let response = await fetch(
      "http://localhost:3000/performance/top-products-by-orders",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "session-token": localStorage.getItem("uID"),
        },
      }
    );
    let data = await response.json();
    data.forEach((product) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${product.name}</td> <td>${product.total_orders}</td> <td>${product.total_quantity} ${product.measure_unit}</td>`;
      topProductstable.appendChild(row);
    });
  } catch (error) {
    console.error(error);
  }
}

async function getBottomPerformer() {
  try {
    let response = await fetch(
      "http://localhost:3000/performance/bottom-performer-by-orders",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "session-token": localStorage.getItem("uID"),
        },
      }
    );
    let data = await response.json();

    data.forEach((restaurant) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${restaurant.name}</td> <td>${restaurant.total_orders}</td>`;
      bottomPerformerTable.appendChild(row);
    });
  } catch (error) {
    console.error(error);
  }
}

getTopPerformer();
getTopProducts();
getBottomPerformer();
