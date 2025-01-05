const userName = document.getElementById("name");
const email = document.getElementById("email");
const logout = document.getElementById("logout");
const role = document.getElementById("Role");
const changeAdminDiv = document.getElementById("change-admin-div");
const selectAdmin = document.getElementById("select-admin");
const changeAdminBtn = document.getElementById("change-admin-btn");

async function fetchUser() {
  try {
    const response = await fetch("http://localhost:3000/accounts/get-user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "session-token": localStorage.getItem("uID"),
      },
    }).then((res) => res.json());

    if (response.success === true) {
      const user = response.user;
      userName.innerText = user.name;
      email.innerText = user.email;
      role.innerText = user.role;

      if (user.role === "admin") {
        const performance = document.createElement("a");
        performance.href = "performance.html";
        performance.innerText = "Performance";
        document.querySelector("header").appendChild(performance);
        fetchUsers(user.accountID);
      }
    } else {
      window.location.href = "login.html";
    }
  } catch (error) {
    console.error(error);
  }
}

async function fetchUsers(accountID) {
  try {
    changeAdminDiv.setAttribute("style", "display: block;");
    const response = await fetch("http://localhost:3000/accounts/get-users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "session-token": localStorage.getItem("uID"),
      },
    });
    const users = await response.json();
    users.forEach((user) => {
      if (user.accountID !== accountID) {
        const option = document.createElement("option");
        option.value = user.accountID;
        option.innerText = user.name;
        selectAdmin.appendChild(option);
      }
    });
  } catch (error) {
    console.error(error);
  }
}

fetchUser();

logout.addEventListener("click", () => {
  localStorage.removeItem("uID");
  window.location.href = "login.html";
});

changeAdminBtn.addEventListener("click", async () => {
  let accountID = selectAdmin.value;
  const response = await fetch("http://localhost:3000/accounts/change-admin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "session-token": localStorage.getItem("uID"),
    },
    body: JSON.stringify({
      accountID,
    }),
  });

  window.location.reload();
});
