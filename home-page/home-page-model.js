var _ = require('lodash');
var fs = require('fs');
var config = require('../config');
var logger = require('../utils/logger');
var util = require('util');
var constants = require('../utils/constants');
const { log } = require('console');

var customer = {};

/**
 * get customer Data
 * @param {*} data 
 * @returns 
 */
customer.getCustomerData = (data) => {
    return new Promise((resolve, reject) => {
        // read file and provide data.
        getFileData().then((fileData) => {
            console.log(fileData);
            // find customer details by id. 
            let findInd = fileData.customerList.findIndex((obj) => {
                if (obj.id == data.id) {
                    return true;
                }
            });
            // if customerDetalis found.
            if (findInd > -1) {
                resolve(fileData.customerList[findInd]);
            } else {
                // customer detalis not found
                let err = new Error("Customer Not Found!!");
                err.code = 4003;
                reject(err);
            }
        }).catch((err) => {
            reject(err);
        })
    });
};

// adding and updating customer to json file.
customer.customerData = (data) => {
    
    if (!data.id) {
        return new Promise((resolve, reject) => {
            // read file and provide data.
            getFileData().then((fileData) => {

                //checking the number of records in file.
                let len = fileData['customerList'].length;
                //adding new record.
                fileData['customerList'].push(Object.assign({ id: len + 1 }, data));

                // Another way of adding new data
                //geting new record
                // let newRecord = {
                //     id: len + 1,
                //     firstName: data.firstName,
                //     lastName: data.lastName,
                //     age: data.age,
                //     address: {
                //         addr1: data.address.addr1,
                //         addr2: data.address.addr2,
                //         city: data.address.city,
                //         zipcode: data.address.zipcode
                //     }
                // };

                //writing new record into json file.
                writeFileData(fileData).then(() => {
                    resolve(fileData);
                    console.log("New Record Inserted Successfull");
                }).catch((err) => {
                    reject(err);
                });


            }).catch((err) => {
                reject(err);
            })
        });
    } else {
        return new Promise((resolve, reject) => {
            // read file and provide data.
            getFileData().then((fileData) => {
                // find customer details by id. 
                let findInd = fileData.customerList.findIndex((obj) => {
                    if (obj.id == data.id) {

                        return true;
                    }
                });

                // if customerDetalis found.
                if (findInd > -1) {

                    if (data.firstName) {
                        fileData.customerList[findInd].firstName = data.firstName;
                    }
                    if (data.lastName) {
                        fileData.customerList[findInd].lastName = data.lastName;
                    }
                    if (data.age) {
                        fileData.customerList[findInd].age = data.age;
                    }
                    if (data.address) {
                        if (data.address.addr1) {
                            fileData.customerList[findInd].address.addr1 = data.address.addr1;
                        }
                        if (data.address.addr2) {
                            fileData.customerList[findInd].address.addr2 = data.address.addr2;
                        }
                        if (data.address.city) {
                            fileData.customerList[findInd].address.city = data.address.city;
                        }
                        if (data.address.zipcode) {
                            fileData.customerList[findInd].address.zipcode = data.address.zipcode;
                        }
                    }

                    //updating the JSON file with New Data
                    writeFileData(fileData).then(() => {
                        resolve(fileData);
                        console.log("Record Updated Successfull");
                    }).catch((err) => {
                        reject(err);
                    });
                } else {
                    // customer detalis not found
                    let err = new Error("Customer Not Found!!");
                    err.code = 4003;
                    reject(err);
                }
            }).catch((err) => {
                reject(err);
            })
        });
    }
};

//Updating the customerlist.
// customer.updateCustomerData = (data) => {
//     return new Promise((resolve, reject) => {
//         // read file and provide data.
//         getFileData().then((fileData) => {
//             // find customer details by id. 
//             let findInd = fileData.customerList.findIndex((obj) => {
//                 if (obj.id == data.id) {

//                     return true;
//                 }
//             });

//             // if customerDetalis found.
//             if (findInd > -1) {

//                 if (data.firstName) {
//                     fileData.customerList[findInd].firstName = data.firstName;
//                 }
//                 if (data.lastName) {
//                     fileData.customerList[findInd].lastName = data.lastName;
//                 }
//                 if (data.age) {
//                     fileData.customerList[findInd].age = data.age;
//                 }
//                 if (data.address) {
//                     if (data.address.addr1) {
//                         fileData.customerList[findInd].address.addr1 = data.address.addr1;
//                     }
//                     if (data.address.addr2) {
//                         fileData.customerList[findInd].address.addr2 = data.address.addr2;
//                     }
//                     if (data.address.city) {
//                         fileData.customerList[findInd].address.city = data.address.city;
//                     }
//                     if (data.address.zipcode) {
//                         fileData.customerList[findInd].address.zipcode = data.address.zipcode;
//                     }
//                 }

//                 //updating the JSON file with New Data
//                 writeFileData(fileData).then(() => {
//                     resolve(fileData);
//                     console.log("updated Successfull");
//                 }).catch((err) => {
//                     reject(err);
//                 });
//             } else {
//                 // customer detalis not found
//                 let err = new Error("Customer Not Found!!");
//                 err.code = 4003;
//                 reject(err);
//             }
//         }).catch((err) => {
//             reject(err);
//         })
//     });
// };

// File Reading....
let getFileData = () => {
    return new Promise((resolve, reject) => {
        //Reading file
        fs.readFile(constants.filePath, (err, resp) => {
            if (err) {
                //if anu error
                logger.error(`Error in read file: ${err}`);
                reject(err);
            } else {
                //readind Json file.
                let fileData = JSON.parse(resp.toString());
                if (fileData.customerList && fileData.customerList.length > 0) {
                    resolve(fileData);
                } else {
                    let err = new Error("Customer Not Found!!");
                    err.code = 4003;
                    reject(err);
                }
            }
        });
    });
}

//File Writing...
let writeFileData = (data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(constants.filePath, JSON.stringify(data), (err) => {
            if (err) {
                //if any error.
                logger.error(`Error in Writing${err}`);
            } else {
                resolve(JSON.stringify(data));
            }
        });
    });
};
module.exports = customer;