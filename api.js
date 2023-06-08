const loaderText= document.getElementById("loaderSet");
const loaderTextDown= document.getElementById("loaderSetDown");
const inputs = document.querySelectorAll('#name-input, #comment-input'); //для отчистки формы ввода после отправки данных
import { format } from "date-fns"
import { token, cantComment, renderComments, commentInputElement, addCommentForm } from "./rendercomments.js";
export let comments = [];

export const funcGetComment = (a,b) =>{
    loaderText.textContent = a;
    const commentFetch = fetch("https://wedev-api.sky.pro/api/v2/:Dm/comments", {
      method: "GET",
    })
    .then((response) =>{
        return response.json()
      })
      .catch((error) =>{
          alert ("Проблемы с подключением, попробуйте позже");
          console.warn(error + ": отсутствует подключение к интернет");
    })
      .then((responseDataComment) =>{
        const remComments = responseDataComment.comments.map((comment) =>{
          const createDate = format(new Date(comment.date), 'yyyy-MM-dd hh:mm:ss');
          return{
            name: comment.author.name,
            date: createDate,
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

    export function loginUser ({login, password}) {
      return fetch("https://wedev-api.sky.pro/api/user/login", {
          method: "POST",
          body: JSON.stringify({
           login,
           password,
          }),
    
        })
          .then((response) => {
            if (response.status === 400){
              alert('Неверные данные');
            throw new Error('Неверный логин или пароль');
            }
            return response.json();
          });
    }
    export function regUser ({login, password, name}) {
      return fetch("https://wedev-api.sky.pro/api/user", {
          method: "POST",
          body: JSON.stringify({
           login,
           password,
           name,
          }),
    
        })
        .then((response) => {
          if (response.status === 400){
            alert('Пользователь уже существует');
          throw new Error('Пользователь уже существует');
          }
          return response.json();
          
        });
  }
  export function delComm(token, id) {
    return fetch("https://wedev-api.sky.pro/api/v2/:Dm/comments" + id, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      })
        .then((response) => {
          return response.json();
        });
}
    export const addComment = () =>{

        addCommentForm.classList.add('hidden');
        loaderTextDown.textContent = 'Пожалуйста подождите комментарий загружается . . . ';
        fetch ("https://wedev-api.sky.pro/api/v2/:Dm/comments", {
        method: "POST",
        body: JSON.stringify({
          text: commentInputElement.value
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;"),
          forceError: false,
        }),
        headers: {
          Authorization: token,
        },
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
        if (response.status === 401){
          throw new Error("Error Authorization");
        } 
         if (response.status === 500){
          throw new Error("error server");
        }
      })
        .catch((error) =>{
          if (error.message === "slow words"){
        alert("Длина имени или комментария должна быть не менее 3-х знаков");
        console.warn(error + ": имя и комментарий должен быть больше 3-х символов");
      return ;
      }
      if (error.message === "Error Authorization"){
        console.log("Ошибка авторизации");
       return;
     }
      if (error.message === "error server"){
         console.log("Сервер упал попробуйте позже");
        addComment();
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