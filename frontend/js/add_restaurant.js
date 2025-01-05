const form = document.getElementById("restaurant-form");
const contactName = document.getElementById("contactName");
const contactEmail = document.getElementById("contactEmail");
const contactPhone = document.getElementById("contactPhone");
const contactRole = document.getElementById("contactRole");
const contactTable = document.getElementById("contactTable");

let contacts = [];

form.addEventListener("submit", async function(event) {
  event.preventDefault();
  const name = event.target.name.value;
  const location = event.target.location.value;

  try {
    const response = await fetch(
      "http://localhost:3000/restaurants/add-restaurant",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "session-token": localStorage.getItem("uID"),
        },
        body: JSON.stringify({
          name,
          location,
          contacts,
        }),
      }
    );

    const data = await response.json();
    const restaurantID = data.restaurantID;

    window.location.href = `restaurant_details.html?restaurantID=${restaurantID}`;
  } catch (error) {
    console.error(error);
  }
});

addContactBtn.addEventListener("click", async function(event) {
  contacts.push({
    name: contactName.value,
    email: contactEmail.value,
    mobileNo: contactPhone.value,
    role: contactRole.value,
  });

  const row = document.createElement("tr");

  const contactname = document.createElement("td");
  contactname.innerText = contactName.value;
  row.appendChild(contactname);

  const contactemail = document.createElement("td");
  contactemail.innerText = contactEmail.value;
  row.appendChild(contactemail);

  const contactphone = document.createElement("td");
  contactphone.innerText = contactPhone.value;
  row.appendChild(contactphone);

  const contactrole = document.createElement("td");
  contactrole.innerText = contactRole.value;
  row.appendChild(contactrole);
  contactTable.appendChild(row);

  contactName.value = "";
  contactEmail.value = "";
  contactPhone.value = "";
  contactRole.value = "";
});
