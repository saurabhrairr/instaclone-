const  express=require('express')
const app=express()
const moongose=require('mongoose')
const postmodel=require('./postschema')
const cors=require("cors")

//midaleware
app.use(express.json({limit:"30mb", extended : true}));
app.use(express.urlencoded({ extended: false }));
app.use(cors())


app.listen(process.env.PORT || 3082,(err)=>
{
if(!err)
{
       console.log("servre connect 3082 port");
}
else
{
       console.log(err);
}

})

moongose.connect("mongodb://localhost/imageuploaddata", (err) => {
  if (!err) {
    console.log("connected to Database");
  } else {
    console.log(err);
  }
});
app.post("/post",(req,res)=>{
  
       postmodel.create({
                  
              name:req.body.name,
              location:req.body.location,
              likes:req.body.likes,
              postimage:req.body.postimage,
              descripation:req.body.descripation,
              date:req.body.date
              //some change done

    }).then(()=> { 
       res.status(200).send( "added successfully"); 
   }).catch((err)=> {
       res.status(400).send(err.message)
})
})

app.get("/post", (req, res)=> {
       postmodel.find().then((itemData)=> {
           res.status(200).send({item: itemData});
       }).catch((err)=> {
              res.status(400).send(err.message)
       })
   });



   


