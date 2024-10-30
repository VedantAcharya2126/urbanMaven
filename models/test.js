let watson = require("../utils/ibm-watson");

let data = {
    "question": "How to add a retrun?",
    "answer": "you can add return from dashboard",
    "articleId": "66ed3914-73f5-478a-8d3a-e02e5126d2bb",
    "tags": ["return", "add"]
};

var aDoc = {
    stream: Buffer.from(JSON.stringify(data)),
    fileName: "AT-66ed3914-73f5-478a-8d3a-e02e5126d2bb.json",
    fileContentType: "application/json"
};

let fs = require("fs")

// Add Json Doc.
// watson.document.add("0ffb018c-5be1-42bb-939a-2ecbd57ac646", "a78d2f23-a858-e3e9-0000-017dbee6d10b", aDoc).then((status) => {
//     console.log(status);
// }).catch((err) => {
//     console.log(err);
// })

// added doc Id.
// {
//     document_id: '1be59521-8f2a-4929-9c56-0835aa841ac8',
//     status: 'pending'
//   }

watson.queries.query("0ffb018c-5be1-42bb-939a-2ecbd57ac646", "a78d2f23-a858-e3e9-0000-017dbee6d10b", undefined, undefined, undefined, "add a retrun").then((status) => {
    console.log(JSON.stringify(status));
    fs.writeFileSync("./DemoResponse.json", JSON.stringify(status))
}).catch((err) => {
    console.log(err);
});