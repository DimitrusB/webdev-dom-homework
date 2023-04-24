const buttonDelElement = document.getElementById('del-button');
const buttonElement = document.getElementById('add-button');
const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");
const listElement = document.getElementById("list");
const dd = new Date();
let day = dd.getDate();
let mon = dd.getMonth()+1;
if (mon<10){
  mon = '0'+mon;
}
if (day <10){
  day = '0' + day;
}
const year = dd.getFullYear() - 2000;
let time = new Date().toLocaleTimeString().slice(0,-3);
buttonElement.addEventListener ("keydown" && "click",  () => {

if (nameInputElement.value === "" || commentInputElement.value === ""){
buttonElement.disable = "true";
return;
}
const oldListHtml = listElement.innerHTML;
  listElement.innerHTML =
    oldListHtml +
    `<li class="comment">
      <div class="comment-header">
        <div>
          ${nameInputElement.value}
        </div>
        <div>${day}.${mon}.${year} ${time}</div>
      </div>
      <div  class="comment-body">
        <div class="comment-text">
          ${commentInputElement.value}
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">0</span>
          <button class="like-button"></button>
        </div>
      </div>
    </li>`;
});
buttonDelElement.addEventListener ("click",  () => {
    listElement.removeChild(listElement.lastElementChild);
    });
