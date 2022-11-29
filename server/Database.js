const mongoose = require('mongoose');
const Note = require('./schemas/note')
class Database{
    constructor() {
        this.url = 'mongodb://localhost:27017/notes'
    }

    connect(){
        mongoose.connect(this.url,{useNewUrlParser:true,useUnifiedTopology:true,})
        .then(()=>{
            console.log('connected to database successfully');
        }).catch((err)=>{
            console.log('connected to database failed : ',err);
        })
    }

    addNote(note){
      return new Promise((resolve, reject)=>{
          note['createdDate'] = new Date()
          note['updatedDate'] = new Date()
          let newNote = new Note(note)
          newNote.save().then(doc =>{
              resolve(doc)
          }).catch(err=>{
              reject(err)
          })
      })
    }
    getNotes(){
        return new Promise((resolve, reject)=>{
            Note.find({
            }).then(data =>{
                resolve(data)
            }).catch(err =>{
                reject(err)
            })
        })
    }
    getNoteById(id){
        return new Promise((resolve, reject)=>{
            Note.findById(id).then(data =>{
                resolve(data)
            }).catch(err =>{
                reject(err)
            })
        })
    }
}


module.exports = Database