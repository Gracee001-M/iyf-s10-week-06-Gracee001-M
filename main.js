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