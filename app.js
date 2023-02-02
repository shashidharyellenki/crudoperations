const Task = require('./models/Task');
const express = require('express');
const mongoose = require('mongoose');
const app = express()
mongoose.set('strictQuery', true);
app.use(express.json())
const port = 5000;

const createUser = async (req,res)=>{
    try{
        const tasks = await Task.create(req.body)
        res.json({tasks})
    }catch(error){
        res.json({error})
    }
 }
 const getAllTasks = async(req,res)=>{
    try{
       const tasks = await Task.find({});
       res.json({tasks}) 
    }catch(error){
        res.status(500).json({"Message": "Something went wrong while extracting the data from the database"})
    }
 }

 const deleteTask = async (req,res)=>{
     try{
       const {id: taskId} = req.params;
       const tasks =  await Task.deleteOne({id:taskId})
       console.log(tasks)
       if(!tasks){
           return res.status(404).json({"message":"No item found to delete"});
       }
       res.status(200).json({"Success":"Deleted successfully"})
     }catch(error){
         res.status(500).json({"msg":"sonmething went wrong"});
     }
 }

const updateTask = async(req,res)=>{
    try{
        const {id:taskID} = req.params;
        const tasks = await Task.findByIdAndUpdate({_id:taskID},req.body,{
            new:true, runValidators:true
        }); 
        if(!tasks){
           return  res.status(404).json({msg:"No task found"})
        }
        res.status(200).json(tasks)
     
       }catch(error){
        res.status(500).json({msg:error}) 
       }
}
app.get('/getAllEmployees', getAllTasks)

app.post('/addNewEmployee', createUser)

app.patch('/editEmployee/:id', updateTask)

app.delete('/deleteEmployee/:id', deleteTask)




//connecting to the database
mongoose.connect("mongodb+srv://shashidhar:QWc5Gcjz8IyxvO4m@data.npd50ji.mongodb.net/Details?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(app.listen(port, ()=>console.log("Connected!!")))
.catch(error=>console.log(error))
