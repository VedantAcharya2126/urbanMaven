let watson = require("../utils/ibm-watson");

let fs = require("fs");
const ibmWatson = require("../utils/ibm-watson");

// projectId: "8bdcd97a-3069-431d-9bec-9cbc9385eac4"
// CallectionId: "317a8128-0838-f40c-0000-017e0b545043"
// watson.document.getAll("8bdcd97a-3069-431d-9bec-9cbc9385eac4", "fecb6fb4-d3bf-1c17-0000-017dfc4de35d").then((result) => {
//     console.log(JSON.stringify(result));
//     fs.writeFileSync("./DemoResponse.json", JSON.stringify(result))
// }).catch((err) => {
//     console.log(JSON.stringify(err));
// });

// watson.queries.query("8bdcd97a-3069-431d-9bec-9cbc9385eac4", "317a8128-0838-f40c-0000-017e0b545043", "document_id:f2977fe4-6b33-4308-a376-c98f82f2eac8").then((result) => {
//     console.log(JSON.stringify(result));
//     fs.writeFileSync("./DemoResponse.json", JSON.stringify(result))
// }).catch((err) => {
//     console.log(JSON.stringify(err));
// });

// let data = ;


// 466d63a9-a497-49de-ac3c-38db49cafd67

let deleteDocs = (docList) => {
    return new Promise((resolve, reject) => {
        if (docList && docList.length > 0) {
            let currentDocId = docList.shift();
            ibmWatson.document.delete("7e842fb0-16e3-4e84-8f31-97ebf255ab2a", "978aebeb-784a-f39d-0000-017e51fead21", currentDocId).then((status) => {
                console.log("Doc Deleted with key: " + currentDocId);
                resolve(deleteDocs(docList))
            }).catch((err) => {
                console.log(err);
            });
        } else {
            console.log("All Deleted");
        }
    });
};

deleteDocs(["8245503f-1817-45b6-af98-8da8a7317b82"]);