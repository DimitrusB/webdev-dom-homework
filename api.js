export const funcGetComment = (a,b) =>{
    loaderText.textContent = a;
    const commentFetch = fetch("https://webdev-hw-api.vercel.app/api/v1/:Dmitriy/comments", {
      method: "GET",
    })
    .then((response) =>{1
        return response.json()
      })
      .catch((error) =>{
          alert ("Проблемы с подключением, попробуйте позже");
          console.warn(error + ": отсутствует подключение к интернет");
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
// =========================================================//
    export const addComment = () =>{
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
          throw new Error("error server");
        }
      })
        .catch((error) =>{
          if (error.message === "slow words"){
        alert("Длина имени или комментария должна быть не менее 3-х знаков");
        console.warn(error + ": имя и комментарий должен быть больше 3-х символов");
      return ;
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