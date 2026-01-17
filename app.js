console.log("JS working")
const postBtn = document.getElementById("postBtn");
const postText = document.getElementById("postText");
const postImage = document.getElementById("postImage");
const feed = document.querySelector(".feed");

postBtn.addEventListener("click", () => {
  const text = postText.value.trim();
  const file = postImage.files[0];

  console.log("TEXT:", text);
  console.log("FILE:", file);


  if (text === "" || !file) {
    alert("Write something or select an image");
    return;
  }

  const post = document.createElement("div");
  post.className = "post";

  let imageHTML = "";

  if (file) {
    const imgURL = URL.createObjectURL(file);
    imageHTML = `<img src="${imgURL}">`;
  }

  post.innerHTML = `
    <div class="profile-post-senior">
      <div class="profile-post">
        <img src="/Images/ProfilePic.jpg">
        <div>
          <h3>Aman</h3>
          <p>Noida, UttarPradesh</p>
        </div>
      </div>
       <div>
          <i class="fa-solid fa-ellipsis"></i>
        </div>
    </div>

    <div class="content">
      ${imageHTML}
      <span class="content-bottom">
        <div>
          <i class="fa-regular fa-heart like-btn"></i>
          <i class="fa-regular fa-comment"></i>
          <i class="fa-solid fa-share"></i>
        </div>
           <div>
            <i class="fa-regular fa-bookmark"></i>
            </div>
      </span>
    </div>

    <div class="post-bottom">
      <p>${text}</p>
    </div>
  `;

  feed.prepend(post);

  postText.value = "";
  postImage.value = "";

  savePosts();
});


document.addEventListener("click", (evt) => {
  const likeBtn = evt.target.closest(".like-btn");
  if (!likeBtn) return;

  likeBtn.classList.toggle("liked");
  likeBtn.classList.toggle("fa-regular");
  likeBtn.classList.toggle("fa-solid");
  likeBtn.classList.add("fa-heart");
});




const msgSearch = document.querySelector(".message-top-bottom input");
const messages = document.querySelectorAll(".message-box-main");

msgSearch.addEventListener("input", () => {
  const value = msgSearch.value.toLowerCase();

  messages.forEach(msg => {
    msg.style.display = msg.innerText.toLowerCase().includes(value)
      ? "flex"
      : "none";
  });
});

const msgContainer = document.querySelector(".message-container");
msgContainer.scrollTop = msgContainer.scrollHeight;

document.querySelectorAll(".request-btn-1").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.closest(".request-box").remove();
  });
});

document.querySelectorAll(".request-btn-2").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.closest(".request-box").remove();
  });
});


function savePosts() {
  localStorage.setItem("posts", feed.innerHTML);
}

function loadPosts() {
  const data = localStorage.getItem("posts");
  if (data) feed.innerHTML = data;
}

loadPosts();

const notificationBtn = document.querySelector(".noti-btn");
const notificationPanel = document.getElementById("notificationPanel");
const closeNotification = document.getElementById("closeNotification");

notificationBtn.addEventListener("click", () => {
  notificationPanel.classList.toggle("active");
});

closeNotification.addEventListener("click", () => {
  notificationPanel.classList.remove("active");
});

document.addEventListener("click", (e) => {
  if (
    !notificationPanel.contains(e.target) &&
    !notificationBtn.contains(e.target)
  ) {
    notificationPanel.classList.remove("active");
  }
});


const commentPopup = document.getElementById("commentPopup");
const closeComment = document.getElementById("closeComment");
const addComment = document.getElementById("addComment");
const commentText = document.getElementById("commentText");
const commentList = document.getElementById("commentList");

const currentUser = {
  name: "Aman",
  username: "@just.aman",
  image: "./Images/ProfilePic.jpg"
};

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-comment")) {
    commentPopup.classList.add("active");
    // commentList.innerHTML = ""; 
  }
});

closeComment.addEventListener("click", () => {
  commentPopup.classList.remove("active");
});

addComment.addEventListener("click", () => {
  const text = commentText.value.trim();
  if (!text) return;

  const div = document.createElement("div");
  div.className = "comment-item";

  div.innerHTML = `
    <img src="${currentUser.image}" alt="profile">
    <div class="comment-details">
      <h4>${currentUser.name} <span style="color:gray; font-weight:400;">${currentUser.username}</span></h4>
      <p>${text}</p>
    </div>
  `;

  commentList.appendChild(div);
  commentText.value = "";
});

