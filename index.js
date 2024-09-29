const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require('./Models/Todo')
const dotenv = require('dotenv')
const app = express()
app.use(cors()) 
app.use(express.json())
dotenv.config()

const port = process.env.PORT || 3001
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Db is connected")
}).catch(err => console.log(err))
app.get('/get',(req, res)=>{
    TodoModel.find().then(result=>res.json(result)).catch(err => res.json(err))
})
app.post('/add', (req, res) =>{
    const task = req.body.task;
    TodoModel.create({
        task:task
    }).then(result=>res.json(result)).catch(err=>res.json(err))
})

app.put('/update/:id', (req, res)=>{
    const {id} = req.params;
    TodoModel.findByIdAndUpdate({_id: id},{done: true})
    .then(result => res.json(result)).catch(err => res.json(err))

})
app.delete('/delete/:id', (req, res)=>{
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result)).catch(err => res.json(err))
})
app.listen(port,()=>{
    console.log("Server is running");
})
