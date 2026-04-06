console.log("A");

setTimeout(() => console.log("B"), 0);

console.log("C");

setTimeout(() => console.log("D"), 100);

console.log("E");

// Simulate loading user data
function loadUser(userId, callback) {
    // Simulate 1.5 second database lookup
    setTimeout(() => {
        const user = {
            id: userId,
            name: "User " + userId,
            email: `user${userId}@example.com`
        };
        callback(user);
    }, 1500);
}

// Usage
loadUser(42, function(user) {
    console.log("User loaded:", user);
});

function getUserData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({ id: userId, name: "John" });
            } else {
                reject("Invalid user ID");
            }
        }, 1000);
    });
}

function getUserPosts(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve([
                    { id: 1, title: "Post 1" },
                    { id: 2, title: "Post 2" }
                ]);
            } else {
                reject("No posts found for this user");
            }
        }, 1000);
    });
}

function getPostComments(postId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (postId > 0) {
                resolve([
                    { id: 1, text: "Great post!" },
                    { id: 2, text: "Thanks for sharing" }
                ]);
            } else {
                reject("Invalid post ID");
            }
        }, 1000);
    });
}

getUserData(1)
    .then(user => {
        console.log("User:", user);
        return getUserPosts(user.id);
    })
    .then(posts => {
        console.log("Posts:", posts);
        return getPostComments(posts[0].id);
    })
    .then(comments => {
        console.log("Comments:", comments);
    })
    .catch(error => {
        console.error("Error:", error);
    });

    async function showUserData() {
    try {
        const user = await getUserData(1);
        console.log("User:", user);

        const posts = await getUserPosts(user.id);
        console.log("Posts:", posts);

        const comments = await getPostComments(posts[0].id);
        console.log("Comments:", comments);
    } catch (error) {
        console.error("Error:", error);
    }
}

showUserData();

function getUserData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({ id: userId, name: "User " + userId });
            } else {
                reject("Invalid user ID");
            }
        }, 1000);
    });
}

// Fetch 3 users simultaneously
Promise.all([getUserData(1), getUserData(2), getUserData(3)])
    .then(users => {
        console.log("All users:", users);
        // Display them all at once
        users.forEach(user => {
            console.log(`ID: ${user.id}, Name: ${user.name}`);
        });
    })
    .catch(error => {
        console.error("One failed:", error);
    });

   // Promise-based versions of the functions (from Task 11.2)
function getUserData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({ id: userId, name: "John" });
            } else {
                reject("Invalid user ID");
            }
        }, 1000);
    });
}

function getUserPosts(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve([
                    { id: 1, title: "Post 1" },
                    { id: 2, title: "Post 2" }
                ]);
            } else {
                reject("No posts found");
            }
        }, 1000);
    });
}

function getPostComments(postId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (postId > 0) {
                resolve([
                    { id: 1, text: "Great post!" },
                    { id: 2, text: "Thanks for sharing" }
                ]);
            } else {
                reject("Invalid post ID");
            }
        }, 1000);
    });
}

// Async/Await rewrite
async function showUserData() {
    try {
        const user = await getUserData(1);
        console.log("User:", user);

        const posts = await getUserPosts(user.id);
        console.log("Posts:", posts);

        const comments = await getPostComments(posts[0].id);
        console.log("Comments:", comments);

        // Imagine more awaits here, still clean and readable
    } catch (error) {
        console.error("Error:", error);
    }
}

// Run it
showUserData(); 

async function getSingleUser(id) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const user = await response.json();
        console.log("Single user:", user);
    } catch (error) {
        console.error("Failed to fetch user:", error);
    }
}

getSingleUser(1);

async function getAllUsers() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const users = await response.json();
        console.log("All users:", users);
    } catch (error) {
        console.error("Failed to fetch users:", error);
    }
}

getAllUsers();

async function getUserPosts(userId) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const posts = await response.json();
        console.log(`Posts for user ${userId}:`, posts);
    } catch (error) {
        console.error("Failed to fetch posts:", error);
    }
}

getUserPosts(1);

<div class="user-card">
    <h2>Leanne Graham</h2>
    <p>📧 Sincere@april.biz</p>
    <p>🏢 Romaguera-Crona</p>
    <p>📍 Gwenborough</p>
</div>

const form = document.getElementById("post-form");
const resultDiv = document.getElementById("result");

async function createPost(title, body, userId) {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, body, userId })
    });

    if (!response.ok) {
        throw new Error("Failed to create post");
    }

    return response.json();
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const body = document.getElementById("body").value.trim();
    const userId = document.getElementById("userId").value.trim();

    try {
        const newPost = await createPost(title, body, userId);
        displayResult(newPost);
        form.reset();
    } catch (error) {
        resultDiv.textContent = `Error: ${error.message}`;
        resultDiv.style.color = "red";
    }
});

function displayResult(post) {
    resultDiv.innerHTML = `
        <h2>Post Created!</h2>
        <p><strong>ID:</strong> ${post.id}</p>
        <p><strong>Title:</strong> ${post.title}</p>
        <p><strong>Body:</strong> ${post.body}</p>
        <p><strong>User ID:</strong> ${post.userId}</p>
    `;
    resultDiv.style.color = "green";
}

let allUsers = [];

const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const container = document.getElementById("users-container");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");
const cityFilter = document.getElementById("city-filter");

async function fetchUsers() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) throw new Error("Failed to fetch users");
    return response.json();
}

async function init() {
    try {
        showLoading();
        allUsers = await fetchUsers();
        populateCityFilter(allUsers);
        renderUsers();
    } catch (error) {
        showError(error.message);
    } finally {
        hideLoading();
    }

    // Search
    searchInput.addEventListener("input", renderUsers);

    // Sort
    sortSelect.addEventListener("change", renderUsers);

    // City filter
    cityFilter.addEventListener("change", renderUsers);
}

function renderUsers() {
    const query = searchInput.value.toLowerCase();
    const sortOrder = sortSelect.value;
    const selectedCity = cityFilter.value;

    let filtered = allUsers.filter(user =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );

    if (selectedCity !== "all") {
        filtered = filtered.filter(user => user.address.city === selectedCity);
    }

    if (sortOrder === "az") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === "za") {
        filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    displayUsers(filtered);
}

function populateCityFilter(users) {
    const cities = [...new Set(users.map(user => user.address.city))];
    cities.forEach(city => {
        const option = document.createElement("option");
        option.value = city;
        option.textContent = city;
        cityFilter.appendChild(option);
    });
}

function showLoading() {
    loading.classList.remove("hidden");
    container.innerHTML = "";
}

function hideLoading() {
    loading.classList.add("hidden");
}

function showError(message) {
    errorDiv.textContent = `Error: ${message}`;
    errorDiv.classList.remove("hidden");
}

function displayUsers(users) {
    container.innerHTML = users.map(user => `
        <div class="user-card">
            <h2>${user.name}</h2>
            <p>📧 ${user.email}</p>
            <p>🏢 ${user.company.name}</p>
            <p>📍 ${user.address.city}</p>
        </div>
    `).join("");
}

// Initialize
init();
