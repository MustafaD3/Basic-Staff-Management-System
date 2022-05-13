const url = "http://localhost:5000/userGet"
const userList = document.getElementById("user-list")
async function userGet(){
    await fetch(url).then(async response =>{
        response = await response.json()
        if(response.errno == -4058){
            alert("Database Dosyası Bulunamadı")
        }
        else{
            response = JSON.parse(response)
            response.forEach(user => userGetUI(user))
        }
       
    }).catch(error =>{
        alert(error)
    })
}



function userGetUI(user){ 
    const li = document.createElement("li")
    li.classList.add("user")
    const span = document.createElement("span")
    span.innerHTML = "id:"+user.id
    li.append(span)
    for(let [key,value] of Object.entries(user)){
        if(key.includes("id")){

        }
        else{
            key = key.replace(key[0],key[0].toUpperCase())
            value = value.replace(value[0],value[0].toUpperCase())
            const span = document.createElement("span")
            if(key == "Phone_number"){
                key = key.replace("_"," ")
            }
            span.innerHTML = key+":"+value
            li.append(span)
            }
    }
    const userForm = formCreate(user)
    const trash2 = trashAndPen(user,userForm)
    li.append(trash2)
    userList.append(li,userForm)
}




function trashAndPen(user,userForm){
    const i = document.createElement("i")
    const i2 = document.createElement("i")
    i2.classList.add("fa-solid","fa-pen","ms-3")
    i2.addEventListener("click",()=>{
        userForm.classList.toggle("shadow")
    })
    i.classList.add("fa","fa-trash")
    i.setAttribute("aria-hidden","true")
    i.addEventListener("click",()=>{
        fetch("/userDelete",{
            method:"POST",
            redirect:"follow",
            body:user.id,
            mode:"cors"
        }).then(async response =>{
            response = await response.text()
            alert(response)
            window.location.reload()
        }).catch(err => alert("User Not Deleted!"))
    })
    const span = document.createElement("span")
    span.append(i,i2)
    return span
}



function formCreate(user){
    const div = document.createElement("div")
    const button = document.createElement("input")
    const form = document.createElement("form")
    button.setAttribute("type","button")
    button.setAttribute("value","Submit")
    button.classList.add("form-control","mt-3" ,"btn","btn-dark","fs-4")
    div.classList.add("form")
    div.classList.add("shadow")
    button.addEventListener("click",()=>{
        const form = button.parentElement
        userUpdate(user.id,form)
    })
    form.innerHTML = `
    <input type="text" class="form-control mt-3 border-1 border-dark" name="name" value="${user.name}" placeholder="Name" id="name" required>
    <input type="text" class="form-control mt-3 border-1 border-dark" name="surname" value="${user.surname}" placeholder="Surname" id="surname" required>
    <input type="email" class="form-control mt-3 border-1 border-dark" name="email" value = "${user.email}" placeholder="E-mail" id="email" required>
    <input type="number" min="18" minlength="2" maxlength="2" class="form-control mt-3 border-1 border-dark" name="age" value="${user.age}" placeholder="Age" id="age" required>
    <input type="number" class="form-control mt-3 border-1 border-dark" name="phone_number" value="${user.phone_number}" placeholder="Phone-Number" id="phone-number" required>
    
    <select name="education" class="form-control mt-3 border-1 border-dark" value="${user.education}" id="education" required>
    <option value="Middle school">Middle School</option>
    <option value="High school">High School</option>
    <option value="University">University</option>
    </select>

    <select name="department" class="form-control mt-3 border-1 border-dark" ${user.department} id="department" required>
    <option value="software">Software</option>
    <option value="Human Resources">Human Resources</option>
    <option value="Design">Design</option>
    <option value="Marketing">Marketing</option>
    </select>
    `
    form.append(button)
    div.append(form)
    return div
}



function userUpdate(id,form){
    const names =["name","surname","email","age","phone_number","education","department"]
    const elementArray = []
   for(const x of form){
       elementArray.push(x)
   }
   elementArray.pop()
   const object = new Object()
   object.id = id
    for(let i =0;i < elementArray.length;i++){
        if(elementArray[i].value != ""){
            object[names[i]] = elementArray[i].value
        }
        else{
            break
        }
    }
    if(Object.keys(object).length == 8){
        userUpdateFetch(object)
    }
    else{
        alert("Tüm Alanları Doldurunuz")
    }
}
function userUpdateFetch(object){
fetch("http://localhost:5000/userUpdate",{
    headers:{
        "content-type":"application/json"
    },
    method:"POST",
    redirect:"follow",
    body:JSON.stringify(object)
}).then(async response =>{
    response = await response.text()
    alert(response)
    window.location.reload()
}).catch(err => alert("Not Updated!!!"))
}
userGet()