const buttonDelElement = document.getElementById('del-button');
const buttonElement = document.getElementById('add-button');
const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");
const listElement = document.getElementById("list"); 
const inputs = document.querySelectorAll('#name-input, #comment-input'); //для отчистки формы ввода после отправки данных
const loaderText= document.getElementById("loaderSet");
const loaderTextDown= document.getElementById("loaderSetDown");
const addCommentForm = document.getElementById("addForm");

const funcGetComment = () =>{
loaderText.textContent = 'Пожалуйста подождите комментарии загружаются . . . ';
const commentFetch = fetch("https://webdev-hw-api.vercel.app/api/v1/:Dmitriy/comments", {
  method: "GET",
})
.then((response) =>{
    return response.json()})
  .then((responseDataComment) =>{
    const remComments = responseDataComment.comments.map((comment) =>{
      return{
        name: comment.author.name,
        date: comment.date.replace(/^(\d+)-(\d+)-(\d+)T(\d+):(\d+):(\d+).(\d+)Z/, `$3.$2.$1 $4:$5:$6`),
        comment: comment.text,
        likes: comment.likes,
        isLiked: false,
      };
    });
    comments = remComments;
    renderComments();
    loaderText.textContent = '';
  });
};

funcGetComment();


let comments = [];


const commentTextInt = () =>{
const commentText = document.querySelectorAll('.comment');
commentText.forEach((element,index) => 
  element.addEventListener('click', () =>{
    const commentTry = ` > ${comments[index].comment} \n ${comments[index].name} \n`;
commentInputElement.value= commentTry;
renderComments();
  })
);

};


const initLikesButton = () => {
  const likeButtonsElements = document.querySelectorAll('.like-button');
  // пройдемся по всем кнопкам и добавим слушателя клика
  for (let i = 0; i < likeButtonsElements.length; i++) {
    likeButtonsElements[i].addEventListener('click', (event) => {
      event.stopPropagation();
      // если комментарий не лайкнут, то отмечаем лайк (свойство isLiked) и увеличиваем счетчик
      if (comments[i].isLiked === false) {
        comments[i].isLiked = true;
        comments[i].likes += 1;
      } else if (comments[i].isLiked === true) {
        comments[i].isLiked = false;
        comments[i].likes -= 1;
      }
      renderComments();
    });
  }
};

const renderComments = () =>{
  const commentsHtml = comments.map((comm, index) =>{
return     `<li class="comment">
<div class="comment-header">
  <div>
    ${comm.name}
  </div>
  <div>${comm.date}</div>
</div>
<div  class="comment-body">
  <div class="comment-text" >
    ${comm.comment}    
  </div>
</div>
<div class="comment-footer">
  <div class="likes">
    <span class="likes-counter">${comm.likes}</span>
    <button class="${comm.isLiked ? 'like-button -active-like' : 'like-button'}"></button>
  </div>
</div>
</li>`;
  }).join('');
  listElement.innerHTML = commentsHtml;
  initLikesButton();
  commentTextInt();
};

renderComments();

buttonElement.addEventListener ("keydown" && "click",  () => {

  if (nameInputElement.value === "" || commentInputElement.value === ""){
  buttonElement.disable = "true";
  return;
  }
  
const addComment = () =>{
  addCommentForm.classList.add('hidden');
  loaderTextDown.textContent = 'Пожалуйста подождите комментарий загружается . . . ';
  fetch ("https://webdev-hw-api.vercel.app/api/v1/:Dmitriy/comments", {
  method: "POST",
  body: JSON.stringify({
    name: nameInputElement.value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;"),
    text: commentInputElement.value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;"),
  }),
}).then((response) => {
  response.json().then((responseData) => {
    ////////////////////////////
    const commentFetch = fetch("https://webdev-hw-api.vercel.app/api/v1/:Dmitriy/comments", {
  method: "GET",
});
commentFetch.then((response) =>{
    const jsonPromise = response.json();
  jsonPromise.then((responseDataComment) =>{
    const remComments = responseDataComment.comments.map((comment) =>{
      return{
        name: comment.author.name,
        date: comment.date.replace(/^(\d+)-(\d+)-(\d+)T(\d+):(\d+):(\d+).(\d+)Z/, `$3.$2.$1 $4:$5:$6`),
        comment: comment.text,
        likes: comment.likes,
        isLiked: false,
      };
    });
    comments = remComments;
    renderComments();
  });
});
//////////////////////
    loaderTextDown.textContent = '';
    addCommentForm.classList.remove('hidden');
    addCommentForm.classList.add('add-form');
  })

  });
};
addComment();
renderComments();


inputs.forEach(input => {
  input.value = '';
});
  });
//===========================//
  const delLastComment = () =>{
    comments.pop();
    renderComments();
  };

  buttonDelElement.addEventListener ("click", delLastComment); 

