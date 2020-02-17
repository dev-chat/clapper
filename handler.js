"use strict";
const https = require("https");
const querystring = require("querystring");

module.exports.clapper = (event, context, callback) => {
  const { text, user_id, response_url } = querystring.parse(event.body);

  if (!text || text.length === 0) {
    return {
      statusCode: 200,
      body: `You need more than one word to use clapper.`
    };
  }
  let output = "";
  const words = text.split(" ");
  for (let i = 0; i < words.length; i++) {
    output += i !== words.length - 1 ? `${words[i]} :clap: ` : words[i];
  }

  const response = JSON.stringify({
    attachments: [
      {
        text: output
      }
    ],
    response_type: "in_channel",
    text: `<@${user_id}>`
  });

  sendMessage(response_url, response);

  return { statusCode: 200 };
};

const sendMessage = (url, response) => {
  const options = {
    hostname: url,
    port: 443,
    path: "",
    method: "POST"
  };

  const req = https.request(options, res => {
    console.log("res");
  });

  req.on("error", e => console.error(e));
  req.end();
};

// Use this code if you don't use the http event with the LAMBDA-PROXY integration
// return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
