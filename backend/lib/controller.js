import fs from "fs"
import path from 'path'

function newId(array){
  if (array.length > 0) {
    return array[array.length-1].id + 1;
  } else {
    return 1
  }
}

class MessageApp {
  constructor(filepath) {
    this.filepath = filepath
    this.messages = filepath ? this.readFromJson() : []
  }

  post(content) {
    if (content) {
      this.messages.push({
        content: content,
        date: new Date(),
        id: newId(this.messages)
      })
      this.writeToJson()
      return this.messages
    }
    else if (!content){
      return []
    }
  }

  get(id) {
    return this.messages.filter(message => message.id == id )[0]
  }

  getAll(){
    return this.messages
  }

  update(id,update){
    if (this.messages.some(message => parseInt(message.id) == parseInt(id))) {
      let index = this.messages.map(message => parseInt(message.id)).indexOf(parseInt(id))
      this.messages[index].content = update
      this.writeToJson()
      return this.messages
    }
    else {
      return []
    }
  }

  delete(id) {
    if (this.messages.some(message => message.id == id)) {
      this.messages = this.messages.filter(message => message.id != id)
      this.writeToJson()
    }
    else {
      return "Message not found in database"
    }
  }

  readFromJson(){
    var result = JSON.parse(fs.readFileSync(__dirname+path.normalize(this.filepath), "utf8", (err, data) => {
      if (err) throw err;
    }))
    return result
  }

  writeToJson(){
    if (this.filepath) {
      const jsonItem = JSON.stringify(this.messages)
      fs.writeFile(__dirname+path.normalize(this.filepath), jsonItem, (err) => {
        if (err) throw err;
      });
    }
  }
}

export default MessageApp
