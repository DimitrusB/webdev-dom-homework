import { initLikesButton } from "./script.js";
import { commentTextInt } from "./script.js";
import { comments, funcGetComment } from "./api.js";
const listElement = document.getElementById("list"); 
const loaderText= document.getElementById("loaderSet");
const addCommentForm = document.getElementById("addForm");
const loaderTextDown= document.getElementById("loaderSetDown");
import { loginUser } from "./api.js";


export const renderComments = () =>{
  const loginUse = document.getElementById('login-input');
  const passwordUser = document.getElementById('password-input');
  const appEl = document.getElementById('loginInput');

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

  const inEl = ` 
  <div class="container">
  <span id = "loaderSet"></span>
  <ul id="list" class="comments">
  ${commentsHtml}
   </ul>
  <p id = "loaderSetDown"></p>    
  <p>Форма входа</p>
  <div>  
    Логин<input id="login-input"
    type="text"
    class="add-form-name"
    placeholder="Введите ваше имя"
  />
    Пароль<input id="password-input"
    type="password"
    class="add-form-name"
    placeholder="Введите ваше имя"
  /></div><br>
  <div>
  <button class="add-form-button" id="login-button">Вход</button>
</div>

<div class="add-form" id ="addForm">
<input id="name-input"
  type="text"
  class="add-form-name"
  placeholder="Введите ваше имя"
/>
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
`

    appEl.innerHTML = inEl;
    // initLikesButton();
    // commentTextInt();
    document.getElementById('login-button').addEventListener('click', () =>{
      loginUser ({loginUse, passwordUser}).value;
      console.log(login);
    });
    funcGetComment();
    
  };
