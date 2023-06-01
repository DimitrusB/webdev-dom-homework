
const buttonDelElement = document.getElementById('del-button');
const buttonElement = document.getElementById('add-button');
export const nameInputElement = document.getElementById("name-input");
export const commentInputElement = document.getElementById("comment-input");

import { comments } from "./api.js";
import { renderComments } from "./rendercomments.js"; 
import { funcGetComment } from "./api.js";
import { addComment } from "./api.js";

renderComments();




// funcGetComment('Пожалуйста подождите комментарии загружаются . . . ', '');


export const commentTextInt = () =>{
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

export const initLikesButton = () => {
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

renderComments();

buttonElement.addEventListener ("keydown" && "click",  () => {

  if (nameInputElement.value === "" || commentInputElement.value === ""){
  buttonElement.disable = "true";
  alert("Длина имени или комментария должна быть не менее 3-х знаков");
  return;
  }
  addComment();
  renderComments();

});
//===========================//
  const delLastComment = () =>{
    comments.pop();
    renderComments();
  };

  buttonDelElement.addEventListener ("click", delLastComment); 
