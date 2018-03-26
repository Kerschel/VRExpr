// Found a nodejs one from https://github.com/palmerabollo/bingspeech-api-client
// Original one was doing processing on the client side

const { BingSpeechClient, VoiceRecognitionResponse } = require('bingspeech-api-client');
var fs = require("fs");
var admin = require("firebase-admin");
var fire= require("./firebase.js");
var serviceAccount = require("./services/services.json");
const download = require('download');
// Bing Speech Key (https://www.microsoft.com/cognitive-services/en-us/subscriptions)

// function getFile(fileList,name){
//     for(var i=0;i<fileList.length;i++){
//       if(fileList[i]["metadata"]['name']==name){
//           console.log(fileList[i]['metadata']["mediaLink"]);
//       return fileList[i]['metadata']["mediaLink"];
//       }
//     }
//   }

// // wwait for file to exist every few secs
//   function setCheck(path, timeout,key) {
//     timeout = setInterval(function() {

//         const file = path;
//         const fileExists = fs.existsSync(file);

//         console.log('Checking for: ', file);
//         console.log('Exists: ', fileExists);

//         if (fileExists) {
//             clearInterval(timeout);
//             let audioStream = fs.createReadStream(path);
//             let subscriptionKey = '041b277e4fa149c7b4d9dd1cbb4066aa';
//             let client = new BingSpeechClient(subscriptionKey);
//             client.recognizeStream(audioStream).then(response =>{
//                 fire.writeToDatabase({"Azure":{"Response":response.results[0].name}},key);
//             }
//                 );
//         }
//     }, timeout);

// };

module.exports = {
        recognize: function(file,key,sentence){
            const fileExists = fs.stat(file,function(err,stats){
             
                let audioStream = fs.createReadStream(file);
                let subscriptionKey = '8783eba6791a45cc869e699236e6edda';
                let client = new BingSpeechClient(subscriptionKey);
                client.recognizeStream(audioStream).then(response =>{
                    fire.writeToDatabase({"Azure":{"Response":response.results[0].name}},key,sentence);
            });
        });
    }
}
