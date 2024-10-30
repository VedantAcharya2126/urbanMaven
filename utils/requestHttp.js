const https = require('https');
const logger = require('./logger');

const requestPost = (url, option) => {
    return new Promise((resolve, reject) => {
        console.log("url: " + url);
        let portNumber;
        let path = url.split("//");
        // Prepare hostname
        let hostname = path[1].split("/").slice(0, 1);
        hostname = hostname.toString();
        // Prepare api path
        let apiUrl = path[1].replace(hostname, "");

        if (url.indexOf("http://") > -1) {
            hostname = url.substring(url.indexOf("://") + 3, url.lastIndexOf(":"));
            portNumber = url.substr(url.lastIndexOf(":") + 1, 4);
        } else {
            portNumber = 443;
        }

        const data = JSON.stringify(option.data);
        const options = {
            hostname: hostname,
            port: portNumber,
            path: apiUrl,
            method: 'POST',
            timeout: 7000,
            headers: (option.headers !== undefined) ? option.headers : {
                'Content-Type': 'application/json',
                'Content-Length': (data == undefined) ? 0 : data.length
            }
        };
        const req = https.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`);
            let chunk = [];
            res.on('data', d => {
                chunk.push(d);
            });
            res.on('end', () => {
                // Check for the Response Status code, If 200 then process further.
                if (res.statusCode === 200) {
                    let actualData = JSON.parse(Buffer.concat(chunk).toString());
                    resolve({ "response": res, "data": actualData });
                } else {
                    if (res.statusCode === 401) {
                        let error = new Error(`Error occurred in calling api ${options.path}, Status Code ${res.statusCode}, Message ${Buffer.concat(chunk).toString()}`);
                        logger.error(`UCS >> HTTP Post Request >> Error occurred in calling api ${options.path}, Status Code ${res.statusCode}, Message ${Buffer.concat(chunk).toString()}`);
                        reject(JSON.parse(Buffer.concat(chunk).toString()));
                    } else {
                        let error = new Error(`Error occurred in calling api ${options.path}, Status Code ${res.statusCode}, Message ${Buffer.concat(chunk).toString()}`);
                        reject(error);
                    }
                }
            });
        });
        req.on('error', error => {
            console.error(error);
            reject(error);
        })
        // use its "timeout" event to abort the request
        req.on('timeout', () => {
            req.end();
        });
        if (data && data.length !== 0) {
            req.write(data);
        }
        req.end();
    });
};

//https://crmapi.advanced-taxsolutions.com/customer/GetCustomerDetailForActivity

// requestPost("https://nextalphadecisionmaker.mytaxprepoffice.com/getPhoneOrChatSystemSwitchLogs", {
//     data: {
//         "system": "phone",
//         "month":"05",
//         "year":"2021"
//       },
//     headers: {
//         'Content-Type': 'application/json'
//     }
// }).then((result)=>{
//     console.log(result.statusCode)
//     console.log(result.data.data)
// });

module.exports = {
    requestPost: requestPost
};