//fetch() does not automatically reject the Promise for HTTP errors such as 404 or 500.

async function functionName() {
    try {
        const result = await somePromise();

        return result;
    } catch (error) {
        console.log(error);
    }
}

async function getUser() {
    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users/1"
        );

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const user = await response.json();

        return user;
    } catch (error) {
        console.error("Failed to fetch user:", error);
    }
}