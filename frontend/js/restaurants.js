const restaurantsContainer = document.getElementById("restaurant-container");
const restaurantBtn = document.getElementById("restaurant-btn");

async function fetchAndDisplayRestaurants() {
  try {
    const response = await fetch(
      "http://localhost:3000/restaurants/get-restaurants",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "session-token": localStorage.getItem("uID"),
        },
      }
    );

    if (response.status === 401) {
      window.location.href = "login.html";
    }

    const restaurants = await response.json();

    restaurants.forEach((restaurant) => {
      const restaurantElement = document.createElement("div");
      restaurantElement.innerHTML = `
        <h3>${restaurant.name}</h3>
        <p>${restaurant.location}</p>
      `;
      restaurantElement.className = "list-item";
      restaurantElement.addEventListener("click", () => {
        window.location.href = `restaurant_details.html?restaurantID=${restaurant.restaurantID}`;
      });

      restaurantsContainer.appendChild(restaurantElement);
    });
  } catch (error) {
    console.error(error);
  }
}

fetchAndDisplayRestaurants();

restaurantBtn.addEventListener("click", () => {
  window.location.href = "add_restaurant.html";
});
