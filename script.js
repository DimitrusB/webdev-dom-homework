const buttonDelElement = document.getElementById('del-button');
const buttonElement = document.getElementById('add-button');
const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");
const listElement = document.getElementById("list"); 
const inputs = document.querySelectorAll('#name-input, #comment-input'); //для отчистки формы ввода после отправки данных
const loaderText= document.getElementById("loaderSet");
const loaderTextDown= document.getElementById("loaderSetDown");
const addCommentForm = document.getElementById("addForm");

const funcGetComment = (a,b) =>{
loaderText.textContent = a;
const commentFetch = fetch("https://webdev-hw-api.vercel.app/api/v1/:Dmitriy/comments", {
  method: "GET",
})
.then((response) =>{
  if (response.status === 500){
    throw new Error("error internet");
  }else
    return response.json()
  })
  .catch((error) =>{
if (error.message === "error internet"){
    alert("Отсутствует подключение к интернет");
  return;
}
})
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
    loaderText.textContent = b;
  });
};

funcGetComment('Пожалуйста подождите комментарии загружаются . . . ', '');


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

function delay(interval = 300) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, interval);
  });
};

const initLikesButton = () => {
  const likeButtonsElements = document.querySelectorAll('.like-button');
  // пройдемся по всем кнопкам и добавим слушателя клика
  for (let i = 0; i < likeButtonsElements.length; i++) {
    likeButtonsElements[i].addEventListener('click', (event) => {
      event.stopPropagation();
      // если комментарий не лайкнут, то отмечаем лайк (свойство isLiked) и увеличиваем счетчик
      delay(200)
      .then(() => {
      if (comments[i].isLiked === false) {
        comments[i].isLiked = true;
        comments[i].likes += 1;
      } else if (comments[i].isLiked === true) {
        comments[i].isLiked = false;
        comments[i].likes -= 1;
      }
      renderComments();
    });
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
  alert("Длина имени или комментария должна быть не менее 3-х знаков");
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
    forceError: true,
  }),
})
.then((response) => {
  if (response.status === 201 || response.status === 200 ){
    inputs.forEach(input => {
      input.value = '';
    });
    return response.json();
  }
  if (response.status === 400){
    throw new Error("slow words");
  } 
   if (response.status === 500){
    throw new Error("error internet");
  }
   
})
  .catch((error) =>{
    if (error.message === "slow words"){
  alert("Длина имени или комментария должна быть не менее 3-х знаков");
return ;
}
if (error.message === "error internet"){
    alert("Отсутствует подключение к интернет");
  return;
}
})
  .then((responseData) => {
    ////////////////////////////
    funcGetComment();

//////////////////////
    loaderTextDown.textContent = '';
    addCommentForm.classList.remove('hidden');
    addCommentForm.classList.add('add-form');
  })
};
addComment();
renderComments();

});

//===========================//
  const delLastComment = () =>{
    comments.pop();
    renderComments();
  };

  buttonDelElement.addEventListener ("click", delLastComment); 
