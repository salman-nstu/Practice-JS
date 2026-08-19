async function fetchJSON(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(
            `Request failed: ${response.status}`
        );
    }

    return response.json();
}

async function loadData() {
    try {
        const [users, posts, comments] = await Promise.all([
            fetchJSON(
                "https://jsonplaceholder.typicode.com/users"
            ),
            fetchJSON(
                "https://jsonplaceholder.typicode.com/posts"
            ),
            fetchJSON(
                "https://jsonplaceholder.typicode.com/comments"
            )
        ]);

        console.log(users);
        console.log(posts);
        console.log(comments);

    } catch (error) {
        console.error("Failed:", error.message);
    }
}

loadData();