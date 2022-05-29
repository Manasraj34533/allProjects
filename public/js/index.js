let userName;
let socket = io();

do{
    userName = prompt();
}while(!userName);

let submitBtn = document.getElementById("submitBtn");
let textarea = document.querySelector("#textarea");
let commentBox = document.querySelector(".comment_box");

submitBtn.addEventListener("click", (e)=>{
    e.preventDefault();

    let comment = textarea.value;
    if(!comment){
        return
    }

    postComment(comment);

});

function postComment(comment){
    let data ={
        username:userName,
        comment:comment
    }
    appendToData(data)
    textarea.value = "";

    broadcastComment(data)
    syncWithDb(data)

}

function appendToData(data){
    let divtag = document.createElement("div");
    divtag.classList.add("comment");

    let markup = `
        <h2>${data.username}</h2>
        <p>${data.comment}</p>
    `

    divtag.innerHTML = markup;

    commentBox.prepend(divtag)
}


function broadcastComment(data){
    socket.emit('comment',data)

}

socket.on('comment',(data)=>{
    appendToData(data)
});

function syncWithDb(data){
    fetch("/api/comments",{
        method:"POST",
        body:JSON.stringify(data),
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then((res)=> res.json())
    .then((result)=> console.log(result))
}

function fetchComments(){
    fetch("/api/comments")
    .then((res)=> res.json())
    .then((result)=> {
        result.forEach((comment)=>{
            comment.createdAt;
            appendToData(comment)
        });
    });
}

window.onload = fetchComments;