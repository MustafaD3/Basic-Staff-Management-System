const form = document.getElementById("form")
form.addEventListener("submit",(e)=>{
    e.preventDefault()
    const values =["name","surname","email","age","phone_number","education","department"]
    const object = new Object()
    const formData = e.target
    for(let i = 0;i<values.length;i++){
        object[values[i]] = formData[i].value
    }
    userPost(object)
})
function userPost(object){
fetch("/userPost",{
    method:"POST",
    redirect:"follow",
    headers:{
        "content-type":"application/json"
    },
    body:JSON.stringify(object),
    mode:"cors"
})
.then(async response =>{
    response = await response.text()
    alert(response)
    window.location.reload()
})
.catch(err => console.log(err))
}