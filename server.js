import express from "express"
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import CRUDclass from "./CRUD.js";
const CRUD = new CRUDclass()
const _dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
app.listen(5000)
app.use("/client",express.static("client"))
app.get("/",(req,res)=>{
    res.sendFile("panel.html",{root:_dirname})
})
app.get("/userGet",(req,res)=>{
    CRUD.userGet().then(response => {
        res.json(response)
    }).catch(error =>{
        res.send(error)
    })
})
app.post("/userPost",(req,res)=>{
    req.on("data",(chunk)=>{
        chunk = JSON.parse(chunk)
        CRUD.userPost(chunk)
        res.send("İşlem Başarılı")
    })
})
app.post("/userDelete",(req,res)=>{
    req.on("data",(id)=>{
        id = id.toString()
        CRUD.userDelete(id)
        .then(response =>{res.send(response)})
        .catch(err => alert(err))
    })
})
app.post("/userUpdate",(req,res)=>{
    req.on("data",(object)=>{
        object = JSON.parse(object)
        CRUD.userUpdate(object).then(response => res.send(response)).catch(err => res.send(err))
    })
})
