
const accounts = {
    procurement: {
        username: "procurement",
        password: "pynx123",
        dashboard: "../departments/procurement.html"
    },

    logistics: {
        username: "logistics",
        password: "pynx123",
        dashboard: "../departments/logistics.html"
    }
};

const loginForm = document.getElementById("loginForm");
const errorMessage = document.getElementById("errorMessage");

loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const department = document.getElementById("department").value;
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    errorMessage.textContent = "";

    if (!department) {
        errorMessage.textContent = "Please select your department.";
        return;
    }

    const account = accounts[department];

    if (!account) {
        errorMessage.textContent = "Invalid department selected.";
        return;
    }

    if (
        username === account.username &&
        password === account.password
    ) {
        window.location.href = account.dashboard;
    } else {
        errorMessage.textContent =
            "Incorrect username or password. Please try again.";
    }
});
