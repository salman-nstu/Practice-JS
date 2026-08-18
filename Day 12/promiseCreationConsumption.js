// Creating a Promise
const fetchUserData = (userId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({ id: userId, name: "Alex" });
            } else {
                reject(new Error("Invalid User ID"));
            }
        }, 1000);
    });
};

// Consuming a Promise with Chaining
fetchUserData(1)
    .then((user) => {
        console.log("Success:", user.name);
        return user.id; // Passed to the next .then()
    })
    .then((id) => {
        console.log(`User ID is ${id}`);
    })
    .catch((error) => {
        console.error("Error:", error.message);
    })
    .finally(() => {
        console.log("Cleanup: Operation finished.");
    });
