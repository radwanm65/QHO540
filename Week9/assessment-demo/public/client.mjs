// Login function
async function login() {
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (!username || !password) {
        alert("Please enter both username and password.");
        return;
    }

    try {
        const response = await fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Login failed.");
        }

        alert("Login successful!");
    } catch (error) {
        alert(error.message);
    }
}

// Register function
async function register() {
    const username = document.getElementById("registerUsername").value.trim();
    const password = document.getElementById("registerPassword").value.trim();
    const cpassword = document.getElementById("confirmPassword").value.trim();

    if (!username || !password || !cpassword) {
        alert("All fields are required!");
        return;
    }

    try {
        const response = await fetch("/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (!response.ok) {
            console.log("response",response.ok);
            throw new Error(data.error || "Registration failed.");
        }

        alert("Registration successful!");
    } catch (error) {
        alert(error.message);
    }
}

// MAP + SEARCH Setup
let map;

window.onload = () => {
    map = L.map("map").setView([51.505, -0.09], 13); // Default view

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: "© OpenStreetMap contributors"
    }).addTo(map);

    document.getElementById("loginBtn").addEventListener("click", login);
    document.getElementById("registerBtn").addEventListener("click", register);
    document.getElementById("searchBtn").addEventListener("click", searchRestaurants);
};

async function searchRestaurants() {
    const location = document.getElementById("location").value.trim();
    const type = document.getElementById("type").value.trim();
    console.log(location);
    console.log(type);
    if (!location || !type) {
        alert("Please enter both location and type.");
        return;
    }

    try {
        const response = await fetch(`/search?location=${location}&type=${type}`);
        const restaurants = await response.json();

        if (!Array.isArray(restaurants)) {
            throw new Error("Invalid server response");
        }

        // Clear map and results
        map.eachLayer(layer => {
            if (layer instanceof L.Marker) {
                map.removeLayer(layer);
            }
        });

        const resultsDiv = document.getElementById("results");
        resultsDiv.innerHTML = "";

        if (restaurants.length === 0) {
            resultsDiv.innerHTML = "<p>No restaurants found.</p>";
            return;
        }

        restaurants.forEach((rest) => {
            const marker = L.marker([rest.latitude, rest.longitude]).addTo(map); // Static location (you can adjust if needed)
            marker.bindPopup(`<b>${rest.name}</b><br>${rest.type}, ${rest.location}<br>Seats: ${rest.available_seats}`);

            resultsDiv.innerHTML += `
                <div>
                    <strong>${rest.name}</strong><br>
                    Type: ${rest.type} <br>
                    Location: ${rest.location} <br>
                    Seats Available: ${rest.available_seats}
                    <hr>
                </div>
            `;
        });
    } catch (error) {
        alert("Search failed: " + error.message);
    }
}
