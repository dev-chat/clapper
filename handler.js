"use strict";
const axios = require("axios");
const querystring = require("querystring");

module.exports.clapper = (event, context, callback) => {
  const { text, user_id, response_url } = querystring.parse(event.body);
  let output = "";
  const words = text.split(" ");
  if (!text || words.length <= 1) {
    return {
      statusCode: 200,
      body: `You need more than one word to use clapper.`
    };
  }
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
  axios.post(response_url, response).catch(e => console.log(e));
  return { statusCode: 200 };
};

// Use this code if you don't use the http event with the LAMBDA-PROXY integration
// return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
