document.getElementById("reviewForm").addEventListener("submit", (event) => {
    event.preventDefault();
  
    const nickname = document.getElementById("nickname").value;
    const password = document.getElementById("password").value;
    const commentText = document.getElementById("commentText").value;
  
    if (!nickname || !password || !commentText) {
      return alert("모든 항목을 입력해주세요.");
    }
  
    if (commentText.length > 50) {
      return alert("리뷰는 50자를 넘길 수 없습니다.");
    }
  
    if (nickname && password && commentText) {
      const comment = {
        nickname: nickname,
        password: password,
        comment: commentText,
      };
      saveComment(comment);
      document.getElementById("reviewForm").reset();
  
      renderComments();
      return alert("리뷰가 등록되었습니다.");
    }
  });
  
  const saveComment = (comment) => {
    const comments = loadComments();
    comments.push(comment);
    localStorage.setItem("comments", JSON.stringify(comments));
  };
  
  const loadComments = () => {
    const comments = localStorage.getItem("comments");
    if (comments) {
      return JSON.parse(comments);
    }
    if (!comments) {
      return [];
    }
  };
  
  const renderComments = () => {
    const commentsContainer = document.getElementById("reviewBox");
    commentsContainer.innerHTML = "";
    const comments = loadComments();
    comments.forEach((comment, index) => {
      const commentElement = document.createElement("li");
      commentElement.innerHTML = `
        <div class="reivewer">${comment.nickname}</div>
        <div class="reivew">${comment.comment}</div>
        <button class="removeBtn" data-index="${index}">X</button>
      `;
      commentsContainer.appendChild(commentElement);
    });
  };
  
  document.getElementById("reviewBox").addEventListener("click", (event) => {
    if (event.target.classList.contains("removeBtn")) {
      const index = event.target.dataset.index;
      removeComment(index);
    }
  });
  
  const removeComment = (index) => {
    const comments = loadComments();
    const password = comments[index].password;
    const userInput = prompt("댓글을 삭제하려면 비밀번호를 입력하세요");
  
    if (userInput === password) {
      comments.splice(index, 1);
      localStorage.setItem("comments", JSON.stringify(comments));
      renderComments();
      return alert("삭제 되었습니다.");
    }
  
    if (!userInput) {
      return alert("비밀번호를 입력해주세요.");
    }
  
    // 로컬 스토리지랑 비밀번호 비교
    if (userInput !== password) {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };
  
  renderComments();
  