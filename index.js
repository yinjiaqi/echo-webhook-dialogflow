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
                                "title": "Echo V2 card display",
                                "formattedText": "Your Query Input"+speech,
                                "image": {
                                    "url": "http://image.baidu.com/search/detail?z=0&word=%E6%B2%AA%E4%B8%8A%E5%B0%BE%E7%94%9F&hs=0&pn=2&spn=0&di=0&pi=54979624680&tn=baiduimagedetail&is=0%2C0&ie=utf-8&oe=utf-8&cs=592577143%2C1463899829&os=&simid=&adpicid=0&lpn=0&fm=&sme=&cg=&bdtype=-1&oriquery=&objurl=http%3A%2F%2Fa.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fb219ebc4b74543a96a58c53112178a82b801148f.jpg&fromurl=&gsm=0&catename=pcindexhot&islist=&querylist=",
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
