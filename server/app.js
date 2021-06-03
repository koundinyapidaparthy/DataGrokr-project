const fs = require('fs');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config({path:"./dot.env"});
require("./db/conn");
const contactModel= require('./model/contactSchema');
const app=express();
app.use(express.json());
// datagrokrprojectbykoundinya
const port =process.env.PORT || 5000;

app.get("/",(req,res)=>{
    res.send("hello");
})

app.post("/DataBase",async (req,res)=>{
    const { Firstname,Lastname,Email,ZipCode,Age,PhoneNumber,StorageMedium} = req.body;
    console.log( Firstname,Lastname,Email,ZipCode,Age,PhoneNumber,StorageMedium);
    const regxP = /^[6-9]\d{9}$/ ;
    const regxZ = /^([1-9]{6})$/;
    const regxE =/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    const PN=PhoneNumber.toString();
    const ZC=ZipCode.toString();
    const EV=Email;
    try{
        if( !Firstname || !Lastname || !Email || !ZipCode || !Age || !PhoneNumber || !StorageMedium){
            return res.status(422).json({ error: "Provide All Details",status:422 });
        }
        else if(PN.length!==10  ){
            return res.status(422).json({ error: "Enter Valid 10 digit number",status:422 });
        }
        else if(regxP.test(PN)===false){
            return res.status(422).json({ error: "Enter Valid 10 digit number",status:422 });
        }
        else if(ZC.length!==6  ){
            return res.status(422).json({ error: "Enter Valid 6 digit PinCode",status:422 });
        }
        else if(regxZ.test(ZC)===false){
            return res.status(422).json({ error: "Enter Valid 6 digit PinCode",status:422 });
        }
        else if(regxE.test(EV)===false){
            return res.status(422).json({ error: "Enter Valid Email",status:422 });
        }
        const userExist = await contactModel.findOne({ Email: Email });
        if (userExist) {
            return res.status(422).json({ error: "Email already Exist",status:422 });
        }  
        else {
            if(StorageMedium==="DataBase"){
                const ConSchema=new contactModel({
                    Firstname,Lastname,Email,ZipCode,Age,PhoneNumber,StorageMedium
               });
               const result=await ConSchema.save();
               console.log(result);
               return res.status(201).json({ message: "user registered successfuly",status:201 });
            }
            else{
                return res.status(422).json({ error: "Select DataBase to Store in dataBase",status:422 });
            }
        }
    }
    catch(e){
        console.log(e);
    }
})
app.post("/LocalFile",async (req,res)=>{
    const { Firstname,Lastname,Email,ZipCode,Age,PhoneNumber,StorageMedium} = req.body;
    console.log( Firstname,Lastname,Email,ZipCode,Age,PhoneNumber,StorageMedium);
    const regxP = /^[6-9]\d{9}$/ ;
    const regxZ = /^([1-9]{6})$/;
    const regxE =/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    const PN=PhoneNumber.toString();
    const ZC=ZipCode.toString();
    const EV=Email;
    try{
        if( !Firstname || !Lastname || !Email || !ZipCode || !Age || !PhoneNumber || !StorageMedium){
            return res.status(422).json({ error: "Provide All Details",status:422 });
        }
        else if(PN.length!==10  ){
            return res.status(422).json({ error: "Enter Valid 10 digit number",status:422 });
        }
        else if(regxP.test(PN)===false){
            return res.status(422).json({ error: "Enter Valid 10 digit number",status:422 });
        }
        else if(ZC.length!==6  ){
            return res.status(422).json({ error: "Enter Valid 6 digit PinCode",status:422 });
        }
        else if(regxZ.test(ZC)===false){
            return res.status(422).json({ error: "Enter Valid 6 digit PinCode",status:422 });
        }
        else if(regxE.test(EV)===false){
            return res.status(422).json({ error: "Enter Valid Email",status:422 });
        }
        // const userExist = await contactModel.findOne({ Email: Email });
        // if (userExist) {
        //     return res.status(422).json({ error: "Email already Exist",status:422 });
        // }
        else{
            var object={
                    Firstname,Lastname,Email,ZipCode,Age,PhoneNumber,StorageMedium
            };
            const jsonobj=JSON.stringify(object);
            fs.appendFile("contact.json",jsonobj,(err)=>{console.log("data added")});
            return res.status(201).json({ message: "user registered successfuly",status:201 });
        }
    }
    catch(e){
        console.log(e);
    }
})
app.get("/LocalFile",(req,res)=>{
     fs.readFile("contact.json","UTF-8", (err, jsonString) => {
        if (err) {
        console.log("File read failed:", err);
        return;
        }
        console.log("File data:", jsonString);
        res.send(jsonString);
        
    });
})



app.listen(port);