import { initLikesButton } from "./script.js";
import { commentTextInt } from "./script.js";
import { comments } from "./api.js";
const listElement = document.getElementById("list"); 

export const renderComments = () =>{
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