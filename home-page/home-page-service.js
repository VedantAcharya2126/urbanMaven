const schemas = require(`../models/schemas`);
const logger = require(`../utils/logger`);
const common = require(`../utils/common`);
const model = require(`./home-page-model`);
const constants = require(`../utils/constants`);

const getCustomerData = (req, res) => {
    let data = common.sanitize(req.body, schemas.getCustomerData);
    logger.info(`Save Rejection Details data: ${JSON.stringify(data)}`);
    if (schemas.validate(data, schemas.getCustomerData)) {
        model.getCustomerData(data).then((result) => {
            res.status(200).send({
                code: 2000,
                messageKey: constants.responseCodeMessage.code_2000,
                data: result
            });
        }, (error) => {
            if (error.code == 4003) {
                res.status(401).send({
                    code: 4003,
                    messageKey: constants.responseCodeMessage.code_4003,
                    data: {}
                });
            } else {
                res.status(500).send({
                    code: 5002,
                    messageKey: constants.responseCodeMessage.code_5002,
                    data: error
                });
            }
        })
    } else {
        // Incomplete Data
        return res.status(400).send({
            code: 4002,
            messageKey: constants.responseCodeMessage.code_4002,
            data: {}
        });
    }
};

const customerData = (req, res) => {

    if (!req.body.id) {
        let data = common.sanitize(req.body, schemas.addCustomerData);
        logger.info(`Save Rejection Details data: ${JSON.stringify(data)}`);
        if (schemas.validate(data, schemas.addCustomerData)) {
            model.customerData(data).then((result) => {
                res.status(200).send({
                    code: 2000,
                    messageKey: constants.responseCodeMessage.code_2000,
                    data: result
                });
            }, (error) => {
                if (error.code == 4004) {
                    res.status(401).send({
                        code: 4004,
                        messageKey: constants.responseCodeMessage.code_4004,
                        data: {}
                    });
                } else {
                    res.status(500).send({
                        code: 5005,
                        messageKey: constants.responseCodeMessage.code_5005,
                        data: error
                    });
                }
            })
        } else {
            // Incomplete Data
            return res.status(400).send({
                code: 4002,
                messageKey: constants.responseCodeMessage.code_4002,
                data: {}
            });
        }
    } else {
        let data = common.sanitize(req.body, schemas.updateCustomerData);
        logger.info(`Save Rejection Details data: ${JSON.stringify(data)}`);
        if (schemas.validate(data, schemas.updateCustomerData)) {
            model.customerData(data).then((result) => {
                res.status(200).send({
                    code: 2000,
                    messageKey: constants.responseCodeMessage.code_2000,
                    data: result
                });
            }, (error) => {
                if (error.code == 4004) {
                    res.status(401).send({
                        code: 4003,
                        messageKey: constants.responseCodeMessage.code_4004,
                        data: {}
                    });
                } else {
                    res.status(500).send({
                        code: 5005,
                        messageKey: constants.responseCodeMessage.code_5005,
                        data: error
                    });
                }
            })
        } else {
            // Incomplete Data
            return res.status(400).send({
                code: 4002,
                messageKey: constants.responseCodeMessage.code_4002,
                data: {}
            });
        }
    }
};

// const updateCustomerData = (req, res) => {
//     let data = common.sanitize(req.body, schemas.updateCustomerData);
//     logger.info(`Save Rejection Details data: ${JSON.stringify(data)}`);
//     if (schemas.validate(data, schemas.updateCustomerData)) {
//         model.updateCustomerData(data).then((result) => {
//             res.status(200).send({
//                 code: 2000,
//                 messageKey: constants.responseCodeMessage.code_2000,
//                 data: result
//             });
//         }, (error) => {
//             if (error.code == 4004) {
//                 res.status(401).send({
//                     code: 4003,
//                     messageKey: constants.responseCodeMessage.code_4004,
//                     data: {}
//                 });
//             } else {
//                 res.status(500).send({
//                     code: 5005,
//                     messageKey: constants.responseCodeMessage.code_5005,
//                     data: error
//                 });
//             }
//         })
//     } else {
//         // Incomplete Data
//         return res.status(400).send({
//             code: 4002,
//             messageKey: constants.responseCodeMessage.code_4002,
//             data: {}
//         });
//     }
// };


module.exports = {
    getCustomerData: getCustomerData,
    customerData: customerData,
    //updateCustomerData: updateCustomerData
};