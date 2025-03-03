document.addEventListener("DOMContentLoaded", loadPosts);

let currentCategory = "general";

function showCategory(category) {
    currentCategory = category;
    document.getElementById("categoryTitle").innerText = category.replace(/^\w/, (c) => c.toUpperCase());
    loadPosts();
}

function addPost() {
    const title = document.getElementById("postTitle").value.trim();
    const content = document.getElementById("postContent").value.trim();

    if (!title || !content) {
        alert("Title and content cannot be empty!");
        return;
    }

    const postId = Date.now();
    const userId = localStorage.getItem("userId") || (localStorage.setItem("userId", postId), postId);

    const post = { postId, userId, title, content, category: currentCategory };
    let posts = JSON.parse(localStorage.getItem("forumPosts")) || [];
    posts.push(post);
    localStorage.setItem("forumPosts", JSON.stringify(posts));

    document.getElementById("postTitle").value = "";
    document.getElementById("postContent").value = "";

    loadPosts();
}

function loadPosts() {
    const posts = JSON.parse(localStorage.getItem("forumPosts")) || [];
    const forumPosts = document.getElementById("forumPosts");
    forumPosts.innerHTML = "";

    posts.filter(post => post.category === currentCategory).forEach(post => {
        const postDiv = document.createElement("div");
        postDiv.className = "post";
        postDiv.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
        `;

        if (post.userId == localStorage.getItem("userId")) {
            const deleteBtn = document.createElement("button");
            deleteBtn.innerText = "Delete";
            deleteBtn.className = "delete-btn";
            deleteBtn.onclick = () => deletePost(post.postId);
            postDiv.appendChild(deleteBtn);
        }

        forumPosts.appendChild(postDiv);
    });
}

function deletePost(postId) {
    let posts = JSON.parse(localStorage.getItem("forumPosts")) || [];
    posts = posts.filter(post => post.postId !== postId);
    localStorage.setItem("forumPosts", JSON.stringify(posts));
    loadPosts();
}
