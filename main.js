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