document.addEventListener("DOMContentLoaded", () => {
    updatePosts();
})

function updatePosts(){

    fetch("http://10.0.0.107:3000/api/all").then((res) =>{

        return res.json();
    }).then((json) => {
        let postElements = "";
        let posts = JSON.parse(json);
                
        posts.forEach((post) => {
            let postElement = `<div id=${post.id} class="card"><div class="card-header"><h3 class="card-title">${post.title}</h3></div><div class="card-body"><div class="card-text">${post.description}</div></div></div>`
            postElements += postElement;
        })
       
        document.querySelector("#posts").innerHTML = postElements;
    })
}


const button = document.querySelector("button");
button.addEventListener("click", newdPost);


function newdPost(){
    let title = document.querySelector("#title").value;
    let description = document.querySelector("#desc").value;
    let post = {title, description};

    const options = {
        method: "POST",
        headers: new Headers({"content-type": "application/json"}),
        body: JSON.stringify(post)
    }

    fetch("http://10.0.0.107:3000/api/new", options).then((res) => {
        
        updatePosts();
        document.querySelector("#title").value = "";
        document.querySelector("#desc").value = "";
    })

    console.log(options)
}