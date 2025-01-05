const detailsDiv = document.getElementById("details");
const contactTableBody = document.getElementById("contactsTableBody");
const deleteBtn = document.getElementById("deleteBtn");
const addContactBtn = document.getElementById("addContactBtn");
const contactName = document.getElementById("contactName");
const contactEmail = document.getElementById("contactEmail");
const contactPhone = document.getElementById("contactPhone");
const contactRole = document.getElementById("contactRole");

async function getRestaurantDetails(restaurantID) {
  try {
    let response = await fetch(
      `http://localhost:3000/restaurants/get-restaurant/${restaurantID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "session-token": localStorage.getItem("uID"),
        },
      }
    );
    let restaurant = await response.json();

    let content = "";
    content += `<p><strong>Restaurant Name:</strong> ${restaurant.name}</a></p>`;
    content += `<p><strong>Address:</strong> ${restaurant.location}</p>`;
    detailsDiv.innerHTML = content;
  } catch (error) {
    console.error(error);
  }
}

async function getContactDetails(restaurantID) {
  contactTableBody.innerHTML = "";
  try {
    let response = await fetch(
      `http://localhost:3000/contacts/get-contacts/${restaurantID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "session-token": localStorage.getItem("uID"),
        },
      }
    );
    let contacts = await response.json();

    contacts.forEach((contact) => {
      const row = document.createElement("tr");

      const contactNameCell = document.createElement("td");
      contactNameCell.textContent = contact.name;

      const emailCell = document.createElement("td");
      emailCell.textContent = contact.email;

      const phoneCell = document.createElement("td");
      phoneCell.textContent = contact.mobileNo;

      const roleCell = document.createElement("td");
      roleCell.textContent = contact.role;

      row.appendChild(contactNameCell);
      row.appendChild(emailCell);
      row.appendChild(phoneCell);
      row.appendChild(roleCell);

      contactTableBody.appendChild(row);
    });
  } catch (error) {
    console.error(error);
  }
}

const params = new URLSearchParams(window.location.search);
const restaurantID = params.get("restaurantID");
getRestaurantDetails(restaurantID);
getContactDetails(restaurantID);

deleteBtn.addEventListener("click", async (event) => {
  try {
    await fetch(
      `http://localhost:3000/restaurants/remove-restaurant/${restaurantID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "session-token": localStorage.getItem("uID"),
        },
      }
    );
    window.location.href = "restaurants.html";
  } catch (error) {
    console.error(error);
  }
});

addContactBtn.addEventListener("click", async (event) => {
  try {
    const response = await fetch("http://localhost:3000/contacts/add-contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "session-token": localStorage.getItem("uID"),
      },
      body: JSON.stringify({
        name: contactName.value,
        email: contactEmail.value,
        mobileNo: contactPhone.value,
        restaurantID,
        role: contactRole.value,
      }),
    });
    getContactDetails(restaurantID);
  } catch (error) {
    console.error(error);
  }
});
