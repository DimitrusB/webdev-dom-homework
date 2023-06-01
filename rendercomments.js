import {commentInputElement, initLikesButton, nameInputElement } from "./script.js";
import { delLastComment, commentTextInt } from "./script.js";
import {addComment, comments } from "./api.js";
const loginButt = document.getElementById('loginBut');
const withoutLogin = document.getElementById('withoutLogin');
export let token =  null

export const renderComments = () =>{
   const appEl = document.getElementById('app');




   const commentsHtml = comments.map((comm) =>{
    return     `
    <li class="comment">
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
    </li>
    `;
      }).join('');



if (!token){
    commentsHtml;

    appEl.innerHTML = commentsHtml;
    loginButt.addEventListener('click', () =>{
      token =  "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";
  renderComments();
      });


return;

}else{
  const renderHtml = 
  `    <div class="container">
      <span id = "loaderSet"></span>
      <ul id="list" class="comments">
      ${commentsHtml}
      </ul>
      <p id = "loaderSetDown"></p>
      <div class="add-form" id ="addForm">
        <textarea id="comment-input"
          type="textarea"
          class="add-form-text"
          placeholder="Введите ваш коментарий"
          rows="4"
        ></textarea>
        <div class="add-form-row">
          <button class="add-form-button" id="add-button">Написать</button>
        </div>
        <div class="add-form-row">
          <button class="add-form-button" id="del-button">Удалить послединий комментарий</button>
        </div>
      </div>
    </div>
  `;

    appEl.innerHTML = renderHtml;
    const buttonElement = document.getElementById('add-button');
    // const nameInputElement = document.getElementById("name-input");
    const commentInputElement = document.getElementById("comment-input");

    buttonElement.addEventListener ("keydown" && "click",  () => {

      if (nameInputElement.value === "" || commentInputElement.value === ""){
      buttonElement.disable = "true";
      alert("Длина имени или комментария должна быть не менее 3-х знаков");
      return;
      }
      addComment();
      // renderComments();
    
    });

    
    buttonDelElement.addEventListener ("click", delLastComment); 

return;
}



// initLikesButton();
// commentTextInt();
// const listElement = document.getElementById("list"); 
// renderComments();
  };

// export {commentInputElement, commmentNew};