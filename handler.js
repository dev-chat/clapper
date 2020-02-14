"use strict";

const querystring = require("querystring");
const https = require("https");

module.exports.clapper = (event, context, callback) => {
  const { text, user_id, response_url } = querystring.parse(event.body);

  if (!text || text.length === 0) {
    //  TODO
    // return {
    //   statusCode: 200,
    //   body: JSON.stringify({ text }),
    // }
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
    text: `<@${user_id}> - max's`
  });

  const options = {
    hostname: response_url,
    method: "POST"
  };

  const req = https.request(options, res =>
    res.on("data", () => callback(null, "OK"))
  );
  req.on("error", error => callback(JSON.stringify(error)));

  req.write(response);
  req.end();
};

// Use this code if you don't use the http event with the LAMBDA-PROXY integration
// return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
