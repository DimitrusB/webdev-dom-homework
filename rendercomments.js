import {initLikesButton, nameInputElement } from "./script.js";
import { delLastComment} from "./script.js";
import {addComment, comments, loginUser, regUser, delComm } from "./api.js";
const loginButt = document.getElementById('loginBut');
const withoutLogin = document.getElementById('withoutLogin');
const buttonReg = document.getElementById('registration');

export const cantComment = document.getElementById('commentCan');
export let token =  null;
export let commentInputElement =null;
export let addCommentForm = null;

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
    ${token ? `<button class="add-form-button" id="delComment">Удалить</button>` : "" }
    </li>
    <br>

    `;
      }).join('');

// const delComment = document.getElementById('delComment');

// delComment.addEventListener('click', () =>{

//   delComm({
// token: token,
// id: id,
//   })

// })

      buttonReg.addEventListener('click', () => {
      const regTask = `
      <div class="container">
      <div>
                <input id="nameReg"
                type="text" class="add-form-text"
                placeholder="Введите ваше имя"/>
                </div>
                <div>
                <input id="loginReg"
                type="text" class="add-form-text"
                placeholder="Введите ваш логин"/>
                </div>
                <div>
                <input id="passwordReg"
                type="password" class="add-form-text"
                placeholder="Введите ваш пароль"/>
                </div>
                <div>
                <button class="add-form-button" id="regBut">Регистрация</button>
                <button class="add-form-button" id="extButton">Выход</button>
              </div>
              </div>
      `
      appEl.innerHTML = regTask;
      cantComment.classList.add('hidden');
const exitReg = document.getElementById('extButton');
const loginReg = document.getElementById('loginReg');
const nameReg = document.getElementById('nameReg');
const passwordReg = document.getElementById('passwordReg');
const regBut = document.getElementById('regBut');

exitReg.addEventListener('click', () =>{
  location.reload();
});

regBut.addEventListener('click', () =>{
  regUser({
    login: loginReg.value,
    password: passwordReg.value,
    name: nameReg.value,
  })
.then(() =>{
location.reload();
});
});
      });

withoutLogin.addEventListener('click', () =>{
  cantComment.classList.add('hidden');
  appEl.innerHTML = commentsHtml;
})

if (!token){
    commentsHtml;

    
    loginButt.addEventListener('click', () =>{
      const loginPlace = document.getElementById('login-input');
      const passwordPlace = document.getElementById('password-input');
    
      if(!loginPlace.value){
        alert('Заполните имя');
        return;
      }

    if(!passwordPlace.value){
      alert('Заполните пароль');
      return;
    }
    
          loginUser({
            login: loginPlace.value,
            password: passwordPlace.value,
          })
          .then((user) =>{
            token =  `Bearer ${user.user.token}`;
            appEl.innerHTML = commentsHtml;
            renderComments();
          });
    
    
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
        <button class="add-form-button" id="exit-button">Выход</button>
      </div>

    </div>
  `;

    appEl.innerHTML = renderHtml;
    const commentText = document.querySelectorAll('.comment');
    const exitButton = document.getElementById('exit-button');
    const buttonElement = document.getElementById('add-button');
    
    commentInputElement = document.getElementById("comment-input");
    const buttonDelElement = document.getElementById('del-button');
    addCommentForm = document.getElementById("addForm");
    cantComment.classList.add('hidden');
    exitButton.addEventListener('click', () =>{
      location.reload();
    });



    buttonElement.addEventListener ("keydown" && "click",  () => {

      if (commentInputElement.value === ""){
        console.log(`${commentInputElement.value}`);
      buttonElement.disable = "true";
      alert("Длина комментария должна быть не менее 3-х знаков");
      return;
      }
      addComment();
      // renderComments();
    
    });

    
    buttonDelElement.addEventListener ("click", delLastComment); 
    initLikesButton();
    const commentTextInt = () =>{
      
      commentText.forEach((element,index) => 
        element.addEventListener('click', () =>{
          const commentTry = ` > ${comments[index].comment} \n ${comments[index].name} \n`;
      commentInputElement.value= commentTry;
      renderComments();
        })
      );
      commentTextInt();
      };


return;
}


  };
