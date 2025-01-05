const leadsContainer = document.getElementById("leads-container");
const addLeadBtn = document.getElementById("lead-btn");
const leadCheckbox = document.getElementById("lead-checkbox");

async function fetchAndDisplayLeads(todayCall = false) {
  try {
    const response = await fetch("http://localhost:3000/leads/get-leads/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "session-token": localStorage.getItem("uID"),
      },
    });

    if (response.status === 401) {
      window.location.href = "index.html";
    }

    let leads = await response.json();

    if (todayCall) {
      leads = leads.filter((lead) => {
        if (lead.status != "done" && lead.status != "cancelled") {
          let today = new Date();
          let todayDate = today.getTime();
          let leadDate = new Date(lead.created_at);
          let dateDiff = parseInt(
            (todayDate - leadDate.getTime()) / (24 * 60 * 60 * 1000)
          );

          if (dateDiff != 0 && dateDiff % lead.call_frequency == 0) {
            return true;
          }
        }
        return false;
      });
    }

    leadsContainer.innerHTML = "";

    leads.forEach((lead) => {
      let title = lead.title;
      let status = lead.status;
      let date = new Date(lead.created_at).toLocaleString();

      const listItem = document.createElement("div");
      listItem.className = "list-item";

      const header = document.createElement("div");
      header.className = "list-header";
      header.innerHTML = `<span>${title}</span> <p>${date}</p>`;

      const footer = document.createElement("div");
      footer.className = "list-footer";

      if (status == "cancelled") {
        footer.innerText = "Cancelled";
        footer.setAttribute("style", "color: red;");
      } else if (status == "done") {
        footer.innerText = "Done";
        footer.setAttribute("style", "color: #0056b3;");
      } else {
        footer.innerText = "Active";
        footer.setAttribute("style", "color: green;");
      }

      listItem.appendChild(header);
      listItem.appendChild(footer);

      listItem.addEventListener("click", () => {
        window.location.href = `lead_details.html?leadID=${lead.leadID}`;
      });

      leadsContainer.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchAndDisplayLeads();

addLeadBtn.addEventListener("click", function() {
  window.location.href = "add_lead.html";
});

leadCheckbox.addEventListener("change", function() {
  if (leadCheckbox.checked) {
    fetchAndDisplayLeads(true);
  } else {
    fetchAndDisplayLeads();
  }
});
