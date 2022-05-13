import fs from "fs"
export default class CRUD{
    constructor(){
        this.fileUrl = "./database/user.json"
    }
    userPost(object){
        fs.exists(this.fileUrl,(bool)=>{
            if(bool){
                fs.readFile(this.fileUrl,"utf-8",(err,data)=>{
                    if(err)console.log(err)
                    else{
                        data = JSON.parse(data)
                        object.id = data.length + 1
                        data.push(object)
                        data = JSON.stringify(data)
                        fs.writeFile(this.fileUrl,data,()=>{
                            console.log("Dosyaya Yazıldı")
                        })
                    }
                })
            }
            else{
                object.id = 1
                object = JSON.stringify(object)
                object = object.padStart(object.length+1,"[")
                object = object.padEnd(object.length+1,"]")
                fs.writeFile(this.fileUrl,object,()=>{
                    console.log("Dosya Oluşturuldu\n"+"İçerik Eklendi")
                })
            }
        })
    }
    userGet(){
        return new Promise((resolve,reject)=>{
            fs.readFile(this.fileUrl,"utf-8",(err,data)=>{
                if(err) reject(err)
                else resolve(data)
            })
        })
    }
    userDelete(id){
        return new Promise((resolve,reject)=>{
            fs.readFile(this.fileUrl,"utf-8",(error,data)=>{
                if(error) reject(error)
                else{
                    data = JSON.parse(data)
                    data.forEach(element => {
                      if(element.id == id){
                          data.splice(id - 1,1)
                          let count = 1
                          data.forEach(user =>{
                              user.id = count
                              count++ 
                          })
                          fs.writeFile(this.fileUrl,JSON.stringify(data),()=>{
                              resolve("User Deleted")
                          })
                      }  
                    })
                }
            })
        })

    }
    userUpdate(object){
    return new Promise((resolve,reject)=>{
        fs.readFile(this.fileUrl,"utf-8",(err,data)=>{
            if(err){
                reject("Dosya Okunamadı")
            }
            else{
                data = JSON.parse(data)
                data.forEach(user =>{
                    if(object.id == user.id){
                       for(const [key,value] of Object.entries(user)){
                           user[key] = object[key]
                       }
                       fs.writeFile(this.fileUrl,JSON.stringify(data),()=>{
                           resolve("User Updated")
                       })
                    }
                })
                
            }
        })
    })
    }
}