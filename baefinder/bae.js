var express = require('express');
var router = express.Router();
// var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var fs = require('fs');

//https://graph.microsoft.com/v1.0/me/mailFolders?$filter=displayName eq 'Sent Items' 
// https://graph.microsoft.com/v1.0/me/mailFolders/AAMkADczYTRmYWFjLWFjNjAtNDRiMC1iYTNhLWY0ZDUxN2Y3MGE0MgAuAAAAAAArl7kfqzYMS5c6NtcoKwa4AQAOp_SkTUtaQY-Oow8ABRr9AAAApHXFAAA=/messages

//https://graph.microsoft.com/v1.0/users/marybak@microsoft.com/photo/$value



/* GET home page. */
function determineBae(messages, sentMessages){
   
  file =JSON.stringify(messages);
  fileSent = JSON.stringify(sentMessages);

  data = JSON.parse(file);

  totalReceived= data.length;
  var From = {};
  var afterHoursReceived={};
  var totalAfterReceived = 0;
  for(var i = 0; i <data.length; i++){
      data[i]= JSON.parse(data[i]);
      var date = convertDateTime(data[i]['DateTimeReceived']).toString();
      var day = date.split(" ")[0];
      if(day =="Sat" ||day =="Sun"){
          totalAfterReceived +=1;
          if(!afterHoursReceived[data[i]['From']['EmailAddress']['Name']]){
            afterHoursReceived[data[i]['From']['EmailAddress']['Name']] = 1;
          }
          else{
            afterHoursReceived[data[i]['From']['EmailAddress']['Name']] += 1;
          }
      }
      if(!From[data[i]['From']['EmailAddress']['Name']]){
          From[data[i]['From']['EmailAddress']['Name']] = 1;
      }
      else{
          From[data[i]['From']['EmailAddress']['Name']] += 1;
      }
  };
//   console.log(From);    
  var sent = {};
  dataSent = JSON.parse(fileSent);
//   dataSent = dataSent['value'];
//   console.log(dataSent);
  totalSent = dataSent.length;
  var totalAfterSent = 0
  afterHoursSent = {};
  userName = "";
  for(var i = 0; i < dataSent.length; i++){
        dataSent[i]= JSON.parse(dataSent[i]);
        userName = dataSent[i]['From']['EmailAddress']['Name'];
        // console.log(Object.keys(dataSent[i]));
        emails = dataSent[i]['ToRecipients'];
        // console.log(dataSent[i]);
        var date = convertDateTime(dataSent[i]['DateTimeSent']).toString();
        var day = date.split(" ")[0];
        if(day =="Sat" || day =="Sun"){
            totalAfterSent+=1;
             for(var k =0; k<emails.length; k++){
                if(!afterHoursSent[emails[k]['EmailAddress']['Name']]){
                    afterHoursSent[emails[k]['EmailAddress']['Name']] = 1;
                }
                else{
                    afterHoursSent[emails[k]['EmailAddress']['Name']] += 1;
                }
            }
        }
        for(var k =0; k<emails.length; k++){
            if(!sent[emails[k]['EmailAddress']['Name']]){
                sent[emails[k]['EmailAddress']['Name']] = 1;
            }
            else{
                sent[emails[k]['EmailAddress']['Name']] += 1;
            }
        }
    };
    var scores= {};
    for(var i=0; i<Object.keys(sent).length; i++){
        Name = Object.keys(sent)[i];
        if(From[Name]!=null){
            percentReceived = From[Name]/totalReceived;
            percentSent = sent[Name]/totalSent;
            scores[Name] = percentReceived*percentSent;         
        }     
    }

    var bae = Object.keys(scores)[0];
    console.log(userName);
    var min = Math.abs(1 - scores[Object.keys(scores)[0]]);
    delete Object.keys(scores)[userName];
    for(i =1; i<Object.keys(scores).length;i++){
        Name = Object.keys(scores)[i];
        var diff = Math.abs(1 - scores[Name]);
        if(diff< min){
            bae=Name;
        }
    }
    return bae;
};

function convertDateTime(dt){
    dateTime = dt.split("T");
    var date = dateTime[0].split("-");
    var yyyy = date[0];
    var mm = date[1]-1;
    var dd = date[2];

    var time = dateTime[1].split(":");
    var h = time[0];
    var m = time[1];
    var s = parseInt(time[2]); //get rid of that 00.0;

    return new Date(yyyy,mm,dd,h,m,s);
}
// exports.getAuthUrl = getAuthUrl;
exports.determineBae = determineBae;



