let userinput = document.querySelector("#inputfield")
let savebutton = document.querySelector("#savebtn")

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

savebutton.addEventListener("click" , (e)=>{
  e.preventDefault()

  const apikey = userinput.value.trim();
console.log(apikey)
if(apikey === ""){
  alert("Please Enter your api key")
  return
}
localStorage.setItem("apikey" , apikey)
window.location.href = "/index.html"

})