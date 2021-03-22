
const express=require("express");
const bodyParser=require("body-parser");
const request =require("request"); 

const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"//index.html");
});

app.post("/",function(req,res){
    
    var crypto = req.body.crypto;
    var fiat =req.body.fiat;
    var url="https://apiv2.bitcoinaverage.com/indices/global/ticker/";

    var finalUrl = url+crypto+fiat;
   
    request(finalUrl,function(err,response,body){
        var data = JSON.parse(body);
        var price=data.last;
        var date=data.display_timestamp;

        res.write("<h1>Today's date is "+date+"</h1>");
        res.write("<h2>The current price of "+crypto+" is "+price+" "+fiat+"</h2>");
        res.send();
    });
});

app.listen(3000,function(){
    console.log("Server started on port 3000");
});
