
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
    var firstUrl="https://api.coingecko.com/api/v3/coins/";
    var lastUrl="?localization=false&community_data=false&developer_data=false&sparkline=false";

    var finalUrl = firstUrl+crypto+lastUrl;
   
    request(finalUrl,function(err,response,body){
        var data = JSON.parse(body);
        var price=data.market_data.current_price[fiat];
        res.write("<h1>Current Price of "+crypto[0].toUpperCase() + crypto.substring(1)+" is : "+price+" "+fiat.toUpperCase()+"</h1>");
        res.send();
    });
});

app.listen(3000,function(){
    console.log("Server started on port 3000");
});
