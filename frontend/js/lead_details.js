const titleContainer = document.getElementById("title");
const statusDiv = document.getElementById("status");
const total_value_div = document.getElementById("total_value");
const detailsDiv = document.getElementById("details");
const ordersTableBody = document.getElementById("ordersTable");
const contactTableBody = document.getElementById("contactsTable");
const callTableBody = document.getElementById("callsTableBody");
const deleteBtn = document.getElementById("deleteBtn");
const doneBtn = document.getElementById("doneBtn");
const cancelBtn = document.getElementById("cancelBtn");

let todayCall = true;
let callContact = "";
let callTime;

async function getLeadDetails(leadID) {
  try {
    let response = await fetch(
      `http://localhost:3000/leads/get-lead/${leadID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "session-token": localStorage.getItem("uID"),
        },
      }
    );

    if (response.status == 404) {
      window.location.href = "leads.html";
    }

    let lead = await response.json();

    const titleDiv = document.createElement("h1");
    titleDiv.innerHTML = `<span>${lead.title}</span>`;
    titleContainer.append(titleDiv);

    if (lead.status == "cancelled") {
      statusDiv.innerText = "Cancelled";
      statusDiv.setAttribute("style", "color: red;");

      cancelBtn.setAttribute("style", "display:none;");
      doneBtn.setAttribute("style", "display:none;");
    } else if (lead.status == "done") {
      statusDiv.innerText = "Done";
      statusDiv.setAttribute("style", "color: #0056b3;;");

      cancelBtn.setAttribute("style", "display:none;");
      doneBtn.setAttribute("style", "display:none;");
    } else {
      statusDiv.innerText = "Active";
      statusDiv.setAttribute("style", "color: green");
    }

    total_value_div.innerText = lead.total_value;

    return [
      lead.restaurantID,
      lead.status,
      lead.call_frequency,
      lead.created_at,
      lead.assigned_to,
      lead.accountID,
    ];
  } catch (error) {
    console.error(error);
  }
}

async function getRestaurantDetails(restaurantID, assigned_to, accountID) {
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
    content += `<p><strong>Restaurant Name:</strong> 
            <a href="restaurant_details.html?restaurantID=${restaurantID}">${restaurant.name}</a></p>`;
    content += `<p><strong>Address:</strong> ${restaurant.location}</p>`;
    content += `<p><strong>Assigned To:</strong> ${assigned_to}</p>`;
    content += `<p><strong>Created By:</strong> ${accountID}</p>`;
    detailsDiv.innerHTML = content;
  } catch (error) {
    console.error(error);
  }
}

async function getOrderDetails(leadID) {
  try {
    let response = await fetch(
      `http://localhost:3000/orders/get-orders/${leadID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "session-token": localStorage.getItem("uID"),
        },
      }
    );
    let orders = await response.json();

    orders.forEach((order) => {
      const row = document.createElement("tr");

      const productNameCell = document.createElement("td");
      productNameCell.textContent = order.product_name;

      const statusCell = document.createElement("td");
      statusCell.textContent = order.status;

      const quantityCell = document.createElement("td");
      quantityCell.textContent = order.quantity;

      const totalPriceCell = document.createElement("td");
      totalPriceCell.textContent = order.total_price;

      row.appendChild(productNameCell);
      row.appendChild(statusCell);
      row.appendChild(quantityCell);
      row.appendChild(totalPriceCell);

      ordersTableBody.appendChild(row);
    });
  } catch (error) {
    console.error(error);
  }
}

async function getContactDetails(restaurantID) {
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

      const callbtnCell = document.createElement("td");
      callbtnCell.innerHTML = `<button id='btn-${contact.contactID}' onclick = 'addCall(${contact.contactID})'>Call</button>`;

      row.appendChild(contactNameCell);
      row.appendChild(emailCell);
      row.appendChild(phoneCell);
      row.appendChild(roleCell);
      row.appendChild(callbtnCell);

      contactTableBody.appendChild(row);
    });
  } catch (error) {
    console.error(error);
  }
}

async function getCallLogs(leadID) {
  callTableBody.innerHTML = "";

  try {
    let response = await fetch(
      `http://localhost:3000/calls/get-calls/${leadID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "session-token": localStorage.getItem("uID"),
        },
      }
    );
    let calls = await response.json();

    calls.forEach((call) => {
      const row = document.createElement("tr");

      let called_at = new Date(call.called_at);
      const dateCell = document.createElement("td");
      dateCell.textContent = called_at.toLocaleString();

      const accountCell = document.createElement("td");
      accountCell.textContent = call.account_name;

      const nameCell = document.createElement("td");
      nameCell.textContent = call.name;

      const durationCell = document.createElement("td");
      let minutes = parseInt(call.duration / 1000 / 60);
      let seconds = parseInt((call.duration / 1000) % 60);
      durationCell.textContent = `${minutes} minutes ${seconds} seconds`;

      row.appendChild(dateCell);
      row.appendChild(accountCell);
      row.appendChild(nameCell);
      row.appendChild(durationCell);

      callTableBody.appendChild(row);

      if (called_at.getDate() == new Date().getDate()) {
        todayCall = false;
      }
    });
  } catch (error) {
    console.error(error);
  }
}

async function checkTodayCall(leadStatus, callFrequency, leadDate) {
  if (leadStatus != "done" && leadStatus != "cancelled") {
    let today = new Date();
    let todayDate = today.getTime();
    let lead_date = new Date(leadDate);
    let dateDiff = parseInt(
      (todayDate - lead_date.getTime()) / (24 * 60 * 60 * 1000)
    );

    if (dateDiff != 0 && dateDiff % callFrequency == 0) {
      const callDiv = document.createElement("div");
      if (todayCall) {
        callDiv.innerText = "Need to Call Today";
        callDiv.setAttribute("style", "color: red; font-style: italic;");
      } else {
        callDiv.innerText = "Already Called for today";
        callDiv.setAttribute("style", "color: Green; font-style: italic;");
      }
      detailsDiv.appendChild(callDiv);
    }
  }
}

const params = new URLSearchParams(window.location.search);
const leadID = params.get("leadID");

async function setStatus(status) {
  try {
    let response = await fetch(`http://localhost:3000/leads/set-status/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "session-token": localStorage.getItem("uID"),
      },
      body: JSON.stringify({
        leadID: leadID,
        status: status,
      }),
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

async function addCall(contactID) {
  const callBtn = document.getElementById(`btn-${contactID}`);

  if (callContact == "") {
    callTime = new Date();
    callBtn.innerText = "End";
    callBtn.setAttribute("style", "background-color : Red;");
    callContact = contactID;
  } else if (callContact == contactID) {
    let endTime = new Date();
    let duration = endTime.getTime() - callTime.getTime();

    try {
      let response = await fetch(`http://localhost:3000/calls/add-call/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "session-token": localStorage.getItem("uID"),
        },
        body: JSON.stringify({
          contactID,
          duration,
          leadID,
        }),
      });
      callBtn.innerText = "Call";
      callBtn.setAttribute("style", "background-color : #007bff;");
      callContact = "";
      getCallLogs(leadID);
    } catch (error) {
      console.error(error);
    }
  } else {
    alert("Already on a call");
  }
}

async function getDetails() {
  let [
    restaurantID,
    leadStatus,
    callFrequency,
    leadDate,
    assignedTo,
    accountID,
  ] = await getLeadDetails(leadID);
  getRestaurantDetails(restaurantID, assignedTo, accountID);
  getOrderDetails(leadID);
  getContactDetails(restaurantID);
  await getCallLogs(leadID);
  checkTodayCall(leadStatus, callFrequency, leadDate);
}

getDetails();

deleteBtn.addEventListener("click", async () => {
  try {
    let response = await fetch(
      `http://localhost:3000/leads/remove-lead/${leadID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "session-token": localStorage.getItem("uID"),
        },
      }
    );
    window.location.href = "leads.html";
  } catch (error) {
    console.error(error);
  }
});

doneBtn.addEventListener("click", async (req, res) => {
  setStatus("done");
  window.location.reload();
});

cancelBtn.addEventListener("click", async (req, res) => {
  setStatus("cancelled");
  window.location.reload();
});
