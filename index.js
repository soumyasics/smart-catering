const express=require('express')
const bodyParser=require('body-parser')
const db=require('./DBConnection')
const app=express()
const cors=require('cors')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.static(`${__dirname}/projects/smart_catering/uploads`));

app.use(cors())
const route=require('./routes')
app.use('/smart_catering_api',route)

app.listen(4008,()=>{
    console.log("Server created successfully");
})