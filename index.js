"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

restService.use(
    bodyParser.urlencoded({
        extended: true
    })
);

restService.use(bodyParser.json());


restService.get("/", function (req, res) {
    return res.send('Hello from Echo sample!');
});

restService.post("/echo", function(req, res) {

    console.log('Incoming request body:', req.body);

    var speech =
        req.body.queryResult &&
        req.body.queryResult.parameters &&
        req.body.queryResult.parameters.echoText
            ? req.body.queryResult.parameters.echoText
            : "Seems like some problem. Speak again.";

    console.log('speech:', speech);

    return res.json({
        fulfillmentText: speech,
        payload: {
            google: {
                expectUserResponse: true,
                richResponse: {
                    items:[
                        {
                            "simpleResponse": {
                                "textToSpeech": speech
                            }
                        },
                        {
                            "basicCard": {
                                "title": speech,
                                "formattedText": "Your Query Input"+speech,
                                "image": {
                                    "url": "https://www.google.com.tw/search?biw=1356&bih=599&tbm=isch&sa=1&ei=HuJCW_COIcib8wWou4bIDg&q=sql&oq=sql&gs_l=img.3..0l10.1696.2152.0.2369.4.4.0.0.0.0.210.210.2-1.1.0....0...1c.1.64.img..3.1.210.0...0.sfGMguLMH4Q#imgrc=3vXINHvNrjHCPM:",
                                    "accessibilityText": "Image alternate text"
                                },
                                "buttons": [
                                    {
                                        "title": "Read more",
                                        "openUrlAction": {
                                            "url": "https://baidu.com"
                                        }
                                    }
                                ],
                                "imageDisplayOptions": "CROPPED"
                            }
                        }
                    ],
                }
            }
        },
        source: "https://echo-webhook-dialogflow.herokuapp.com"
    });
});

restService.listen(process.env.PORT || 8000, function() {
    console.log("Server up and listening");
});
