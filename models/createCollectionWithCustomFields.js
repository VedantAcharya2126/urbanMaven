let watson = require("../utils/ibm-watson");

// let enrichments =[
// {
//     "enrichment_id": "1",
//     "fields": ["question", "answer", "tags"]
// }]
watson.collection.create("8e585886-d4d8-4c4a-9ce5-ed21330b9da0",
    "Support Spanish", "Support Spanish", 'en', [{
        "enrichment_id": "701db916-fc83-57ab-0000-000000000018",
        "fields": ["question", "answer", "tags"]
    }]).then((status) => {
        console.log(JSON.stringify(status));
    }).catch((err) => {
        console.log(err);
    });

// watson.document.ge

// watson.collection.list("8bdcd97a-3069-431d-9bec-9cbc9385eac4").then((result) => {
//     console.log(result);
// }).catch(err => {
//     console.log(err);
// })