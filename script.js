export const nameInputElement = document.getElementById("name-input");

import { comments } from "./api.js";
import { renderComments} from "./rendercomments.js"; 
import { funcGetComment } from "./api.js";
// import { addComment } from "./api.js";

funcGetComment();

funcGetComment('Пожалуйста подождите комментарии загружаются . . . ', '');


// export const commentTextInt = () =>{
// // const commentText = document.querySelectorAll('.comment');
// commentText.forEach((element,index) => 
//   element.addEventListener('click', () =>{
//     const commentTry = ` > ${comments[index].comment} \n ${comments[index].name} \n`;
// commentInputElement.value= commentTry;
// renderComments();
//   })
// );
// };

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




//===========================//
 export const delLastComment = () =>{
    comments.pop();
    renderComments();
  };


