let watson = require("../utils/ibm-watson");
let fs = require("fs")

let data = {
    "question": "Is Bank Product Applications allowed in your System?",
    "answer": "Yes, Bank Product are allowed in our system : TPG, EPS, RA",
    "tags": ["Bank Product", "TPG", "EPS", "RA"],
    "createdBy": "shubham Vyas"
};
var aDoc = {
    stream: Buffer.from(JSON.stringify(data)),
    fileName: "test.json",
    fileContentType: "application/json"
};

// Add Json Doc.
watson.document.add("8bdcd97a-3069-431d-9bec-9cbc9385eac4", "317a8128-0838-f40c-0000-017e0b545043", aDoc).then((status) => {
    console.log(status);
}).catch((err) => {
    console.log(err);
})

// let data = {
//     "question": "How to add Return?",
//     "answer": "you can add returns from dashboard",
//     "tags": ["dashboard", "mytaxprepoffice", "return"],
//     "createdBy": "Shubham"
// };

// var aDoc = {
//     stream: Buffer.from(JSON.stringify(data)),
//     fileName: "test.json",
//     fileContentType: "application/json"
// };

// watson.document.update("8bdcd97a-3069-431d-9bec-9cbc9385eac4",
//     "317a8128-0838-f40c-0000-017e0b545043",
//     "f915219c-b9fa-46b3-8f14-d8773d92d3ea", aDoc).then((result) => {
//         console.log(result);
//     }).catch(err => {
//         console.log(err);
//     });



// watson.document.add("8bdcd97a-3069-431d-9bec-9cbc9385eac4",
//     "317a8128-0838-f40c-0000-017e0b545043", aDoc).then((result) => {
//         console.log(result);
//     }).catch(err => {
//         console.log(err);
//     });

// update JSON doc.
// Its not working.





// watson.document.delete("8bdcd97a-3069-431d-9bec-9cbc9385eac4",
//     "317a8128-0838-f40c-0000-017e0b545043",
//     "de6be8bf-e6d4-4251-9a26-55765c1d00ee").then((result) => {
//         console.log(result);
//     }).catch(err => {
//         console.log(err);
//     });



// {
//     document_id: '113611b0-3b90-45b1-af1c-49e7c73cf972',
//     status: 'pending'
//   }


// added doc Id.
// {
//     document_id: '1be59521-8f2a-4929-9c56-0835aa841ac8',
//     status: 'pending'
//   }

// watson.queries.query("8bdcd97a-3069-431d-9bec-9cbc9385eac4", "317a8128-0838-f40c-0000-017e0b545043",
//     undefined, undefined, undefined,"how to create return").then((status) => {
//         console.log(JSON.stringify(status));
//         fs.writeFileSync("./DemoResponse.json", JSON.stringify(status))
//     }).catch((err) => {
//         console.log(err);
//     });



// de6be8bf-e6d4-4251-9a26-55765c1d00ee

// watson.document.getAll("8bdcd97a-3069-431d-9bec-9cbc9385eac4", "317a8128-0838-f40c-0000-017e0b545043").then((result) => {
//     console.log(JSON.stringify(result));
// }).catch(err => {
//     console.log(err);
// });



