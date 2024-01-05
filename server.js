const exp=require('express')
const mongoose=require('mongoose')
const app=exp()
mongoose.connect('mongodb://localhost:27017/userDetails',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(()=>{
  console.log("dataBase connected successfully")
})
.catch((err)=>{
  console.log("not connected",err)
})
const StudentSchema=new mongoose.Schema({
  name:String,
  roleId:Number,
  gender:String
})
app.use(exp.json())
const StudentModal=mongoose.model('studentDetails',StudentSchema)
app.post('/postDetails',async(req,res)=>{
  try {
    const {name,roleId,gender}=req.body
    if (!name||!gender||!roleId) {
      return res.status(400).json({message:"missing required fields"})
    } 
      const response=new StudentModal({name,roleId,gender})   
      await response.save()
      return res.status(201).json({message:"data retrieved successfully",data:response})   
  } catch (error) {
    res.status(500).json({message:"Something went wrong"})
  }
})
app.get('/getDetails',async(req,res)=>{
  const data=await StudentModal.find({}).select('-__v')
  try {
    res.status(200).json({message:"data Retieved successfully",data:data})
  } catch (error) {
    res.status(500).json({message:"Something went wrong"})
  }
})
app.listen(3500,()=>{
  console.log("server started")
})