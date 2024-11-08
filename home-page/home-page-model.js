var _ = require('lodash');
var fs = require('fs');
var config = require('../config');
var logger = require('../utils/logger');
var util = require('util');
var constants = require('../utils/constants');
const { log } = require('console');

var homepage = {};

/**
 * get customer Data
 * @param {*} data 
 * @returns 
 */
// customer.getCustomerData = (data) => {
//     return new Promise((resolve, reject) => {
//         // read file and provide data.
//         getFileData().then((fileData) => {
//             console.log(fileData);
//             // find customer details by id. 
//             let findInd = fileData.customerList.findIndex((obj) => {
//                 if (obj.id == data.id) {
//                     return true;
//                 }
//             });
//             // if customerDetalis found.
//             if (findInd > -1) {
//                 resolve(fileData.customerList[findInd]);
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

homepage.bookService = (data) => {
    return new Promise((resolve, reject) => {
        // read file and provide data.
        resolve(data)
    });
};

module.exports = homepage;