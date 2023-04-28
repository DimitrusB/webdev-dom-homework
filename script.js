const buttonDelElement = document.getElementById('del-button');
const buttonElement = document.getElementById('add-button');
const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");
const listElement = document.getElementById("list"); 
const inputs = document.querySelectorAll('#name-input, #comment-input'); //для отчистки формы ввода после отправки данных

const comments = [
  {
   date: "12.02.22 12:18",
   name: "Глеб Фокин",
   comment: "Это будет первый комментарий на этой странице",
   like: "3"
  },
  {
    date: "13.02.22 19:22",
    name: "Варвара Н.",
    comment: "Мне нравится как оформлена эта страница! ❤",
    like: "75"
  }
];



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

const renderComments = () =>{
  const commentsHtml = comments.map((comm, index) =>{
return     `<li class="comment">
<div class="comment-header">
  <div>
    ${comm.name}
  </div>
  <div>${day}.${mon}.${year} ${time}</div>
</div>
<div  class="comment-body">
  <div class="comment-text">
    ${comm.comment}
  </div>
</div>
<div class="comment-footer">
  <div class="likes">
    <span class="likes-counter">${comm.like}</span>
    <button class="like-button"></button>
  </div>
</div>
</li>`;
  }).join('');
  listElement.innerHTML = commentsHtml;
};

renderComments();

buttonElement.addEventListener ("keydown" && "click",  () => {

  if (nameInputElement.value === "" || commentInputElement.value === ""){
  buttonElement.disable = "true";
  return;
  }
  comments.push({
    name: nameInputElement.value,
    date: dd.value,
    comment: commentInputElement.value,
    
  });
renderComments();
  };

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
    // commentInputElement.value = "";
    // nameInputElement.value = ""; 1ый вариант и второй ниже
    inputs.forEach(input => {
      input.value = '';
    });
});
buttonDelElement.addEventListener ("click",  () => {
    listElement.removeChild(listElement.lastElementChild);
    });
