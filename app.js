var fs = require('fs');

//read list of shops
var shops = fs.readFileSync('./shops.txt').toString().split("\n");

//read a message
var message = fs.readFileSync('./messages.txt','utf8').toString();

//Read account
var account = require('./account');
var email = account.email;
var password = account.password;

//facebook-chat-api
var login = require("facebook-chat-api");

login({email: email, password: password}, (err, api) => {
    if(err) {
        writeError(err);
        return console.error(err);
    }
   

    for(i in shops){
        var shopName = shops[i];
        console.log("Shop: " + shopName);
        
        api.getUserID(shopName, (err, data) => {
            
            if(err) {
                writeError(err);
                return console.error(err);
            }
            
            var receptionID = data[0].userID;
            console.log("Msg: " + message);
            api.sendMessage(message, receptionID);
        });
    }
});

var writeError = function(errors){
    fs.writeFile("./errors.txt", JSON.stringify(errors), function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });   
};