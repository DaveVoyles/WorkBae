var express = require('express');
var router = express.Router();
var url = require('url');
var async = require('async');
var outlook = require("node-outlook");
var token,email;
var count = 0;
var messages = [];
var sentMessages = [];
var baeFinder = require('../baefinder/bae');

router.get('/', function(request, response, next) {
   
    token = getValueFromCookie('node-tutorial-token', request.headers.cookie);
    // console.log("Token found in cookie: ", token);
    email = getValueFromCookie('node-tutorial-email', request.headers.cookie);
    //console.log("Email found in cookie: ", email);
    async.whilst(
        function () { return count < 5; },
        function (callback) {
            console.log(count);
           
            getSentMail(callback);
            getMail(callback)
            count++;
        },
        function (err, n) {
            // 5 seconds have passed, n = 5
            var result = baeFinder.determineBae(messages,sentMessages);
            // console.log(messages);
            response.json({"result":result});
            
           
        }
    ); 



});

function getValueFromCookie(valueName, cookie) {
  if (cookie.indexOf(valueName) !== -1) {
    var start = cookie.indexOf(valueName) + valueName.length + 1;
    var end = cookie.indexOf(';', start);
    end = end === -1 ? cookie.length : end;
    return cookie.substring(start, end);
  }
}



function getMail(callback){
    
    var skip = count*100;
    var queryParams = {
      '$top': 100,
      '$skip':skip
    };
    outlook.base.setAnchorMailbox(email);
    outlook.mail.getMessages({token: token, odataParams: queryParams},
      function(error, result){
        if (error) {
          console.log('getMessages returned an error: ' + error);
           callback(error);
        }
        else if (result) {
         
          result.value.forEach(function(message) {
            messages.push(JSON.stringify(message));
          });
          callback();
        }
      });
    
}
function getSentMail(callback){
    var skip = count*100;
    var queryParams = {
      '$top': 100,
      '$skip':skip
      // '$filter': "DateTimeReceived gt DateTime'2016-04-00T09:13:28'"
    };
    var url= "https://graph.microsoft.com/v1.0/me/mailFolders/sentItems/messages"

    outlook.mail.getMessages({ token: token, userInfo: email, folderId:"sentItems", odataParams: queryParams}, 
      function(error, result) {
        if (error){
          console.log('Get Messages returned an error: ' + error);
          callback(error);
        }
        else if(result){
          result.value.forEach(function(message) {
            sentMessages.push(JSON.stringify(message));
          });
          callback();
          
        }
    });
  }

module.exports = router;



