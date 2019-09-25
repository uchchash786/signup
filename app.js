const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html")
});
app.post("/",function(req,res){
var firstname = req.body.fname;
var lastname = req.body.lname;
var medicalCollegeName = req.body.mCName;
var session = req.body.ses;
var email = req.body.email;
var regNo = req.body.regNo;


var data={
  members:[
    {
      email_address:email,
      status:"subscribed",
      merge_fields:{
        FNAME:firstname,
        LNAME:lastname,
        REGNO:regNo,
        SES: session,
        MCNAME: medicalCollegeName,
      }
    }
  ]
};
 var jsonData=JSON.stringify(data);
var options={
  url:"https://us20.api.mailchimp.com/3.0/lists/43b49e6f8d",
  method:"POST",
  headers:{"Authorization":"DrAbdullahAlMUKTADIR a79d2a40ce4c0e3489637ee87f1a94c4-us20"},
  body:jsonData
};
request( options,function(error,response,body)  {
if (error) {  res.sendFile(__dirname+"/failure.html");
}else{
    if (response.statusCode===200) {
    res.sendFile(__dirname+"/success.html");
  }else {
     res.sendFile(__dirname+"/failure.html");
  }
}
});
});
app.post("/failure",function(req,res){
  res.redirect("/");
});
app.listen(process.env.PORT||3000,function(){
  console.log("your server is running on 3000");
});
//a79d2a40ce4c0e3489637ee87f1a94c4-us20
//43b49e6f8d
