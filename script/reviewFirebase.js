import { db } from "./firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

const reviewForm = document.getElementById("reviewForm");

reviewForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nickname = document.getElementById("nickname").value;
  const password = document.getElementById("password").value;
  const commentText = document.getElementById("commentText").value;
  const idValue = getParameterByName("id");

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
      movieId: idValue,
    };

    await saveComment(comment);
    document.getElementById("reviewForm").reset();

    renderComments();
    return alert("리뷰가 등록되었습니다.");
  }
});

// 현재 페이지의 영화 id 가져오기
function getParameterByName(param) {
  const urlObj = new URL(window.location.href);
  return urlObj.searchParams.get(param);
}

// 댓글 저장
const saveComment = async (comment) => {
  await addDoc(collection(db, "reviews"), comment);
};

// 댓글 렌더링
const renderComments = async () => {
  try {
    const commentsContainer = document.getElementById("reviewBox");
    commentsContainer.innerHTML = "";
    const currentMovieId = getParameterByName("id"); // 현재 페이지의 영화 ID를 가져옵니다.
    const querySnapshot = await getDocs(collection(db, "reviews"));
    const comments = querySnapshot.docs.map((doc) => doc.data());
    const filteredComments = comments.filter((comment) => comment.movieId === currentMovieId);

    filteredComments.forEach((comment, index) => {
      const commentElement = document.createElement("li");
      commentElement.innerHTML = `
        <div class="reivewer">${comment.nickname}</div>
        <div class="reivew">${comment.comment}</div>
        <button class="removeBtn" data-index="${index}">X</button>
      `;
      commentsContainer.appendChild(commentElement);
    });
    attachRemoveListeners(); // 이벤트 리스너 재부착
  } catch (error) {
    alert("에러 발생: ", error);
  }
};

// 리뷰 삭제
function attachRemoveListeners() {
  const removeButtons = document.querySelectorAll(".removeBtn");
  removeButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      try {
        const index = event.target.dataset.index;
        const querySnapshot = await getDocs(collection(db, "reviews"));
        const comments = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        const currentMovieId = getParameterByName("id");
        const filteredComments = comments.filter((comment) => comment.movieId === currentMovieId);
        const targetComment = filteredComments[index];
        const enteredPassword = prompt("댓글 삭제를 위해 비밀번호를 입력하세요:");
        if (enteredPassword !== null) {
          await deleteComment(targetComment, enteredPassword);
          renderComments();
        }
      } catch (error) {
        alert("에러 발생: ", error);
      }
    });
  });
}

const deleteComment = async (comment, enteredPassword) => {
  if (comment.password === enteredPassword) {
    await deleteDoc(doc(db, "reviews", comment.id));
    alert("댓글이 삭제되었습니다.");
  } else {
    alert("비밀번호가 올바르지 않습니다.");
  }
};

renderComments(); // 페이지 로드 시 렌더링
