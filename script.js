let prompt = document.querySelector("#prompt");
let chatContainer = document.querySelector(".chat-container");
// let imagebtn = document.querySelector("#image");
// let imageinput = document.querySelector("#image input")
// const Api_Key = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDlF0FufXgCmJeZsl7HcbBPHj6B2CJQkZ0"
const BASE_URI = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"

let submitt = document.getElementById("submitt")



// 🔹 When any page loads, check API key first
// 🔹 When any page loads, check API key first
document.addEventListener("DOMContentLoaded", () => {
    const currentPage = window.location.pathname;
    const apiKey = localStorage.getItem("apikey");

    // 1. If an API key exists, and the current page is the form page, redirect to index.
    if (currentPage.includes("form.html") && apiKey) {
        window.location.href = "/index.html";
        return; // Stop execution after redirect
    }

    // 2. If NO API key exists, and the current page is NOT the form page, redirect to form.
    // Use 'endsWith' or a more precise check to prevent the infinite loop on form.html itself.
    if (!apiKey && !currentPage.includes("form.html")) {
        window.location.href = "/form.html";
        return; // Stop execution after redirect
    }

});


  let user ={
    data : null,
  }
async function generateResponse(aiChatBox){
  let apikey = localStorage.getItem("apikey")
  let text = aiChatBox.querySelector(".aichat-area")
let RequestOption = {
    method : "Post",
    headers : {'Content-Type': 'application/json'},
    body : JSON.stringify({
        
    "contents": [
      {
        "parts": [
          {
            "text": user.data
          }
        ]
      }
    ]
  
 } )
}

try{
 let response = await fetch(`${BASE_URI}?key=${apikey}`, RequestOption)
 let data = await response.json ()
 console.log(data);
 let apiResponse = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"*$1").trim()
 text.innerHTML = apiResponse;
}
catch(error){
    console.log(error);
}

   finally{
    chatContainer.scrollTo({top:chatContainer.scrollHeight , behavior:"smooth"})
   }
  } 


function createChatBox(html, classes){
let div = document.createElement("div")
div.innerHTML= html
div.classList.add(classes)
return div 
}



function handlechatResponse(message){
    user.data=message
    let html = `<img src="user.jpg" alt="" id="user-img" width="5%">
<div class="userchat-area">
${user.data}
</div>`
prompt.value=""
let userChatBox = createChatBox(html , "user-chat")
chatContainer.appendChild(userChatBox)
chatContainer.scrollTo({top:chatContainer.scrollHeight , behavior:"smooth"})
setTimeout(()=>{
let html = `<img src="ai.jpg" alt="" id="ai-img" width="5%">
<div class="aichat-area">
</div>`
let aiChatBox = createChatBox(html , "ai-chat")
chatContainer.appendChild(aiChatBox)
generateResponse(aiChatBox)
},200)

}

 prompt.addEventListener("keydown" , (e)=>{
if(e.key=="Enter"){
    handlechatResponse(prompt.value)
    
}
 })
 // **2. New functionality (Submit button click)**
submitt.addEventListener("click" , ()=>{
    // This will execute the same function as pressing Enter
    handlechatResponse(prompt.value);
    
    // Optional: You might want to clear the input field after submission
    // prompt.value = '';
});

 

// imageinput.addEventListener("change",()=>{
//   const file = imageinput.files[0]
//   if(!file) return
//   let reader = new FileReader()
//   reader.onload=(e)=>{
//     console.log(e)
//   }
//   reader.readAsDataURL(file)
// })

//  imagebtn.addEventListener("click",()=>{
//   imagebtn.querySelector("input").click()
//  })