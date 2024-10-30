var util = require('util');
var Validator = require('jsonschema').Validator;
var logger = require('../utils/logger');
var _validator = new Validator();

var schemas = function () {
};

//add or edit knowledgeBase article schema
schemas.getCustomerData = {
    'id': '/getCustomerData',
    'type': 'object',
    'properties': {
        'id': {
            'type': 'number',
            'required': false
        }
    }
};

schemas.addCustomerData = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "properties": {
        "id": {
            "type": "integer",
            "require" : true
        },
        "firstName": {
            "type": "string",
            "require" : true
        },
        "lastName": {
            "type": "string",
            "require" : true
        },
        "age": {
            "type": "integer",
            "require" : true
        },
        "address": {
            "type": "object",
            "properties": {
                "addr1": {
                    "type": "string",
                    "require" : true
                },
                "addr2": {
                    "type": "string",
                    "require" : true
                },
                "city": {
                    "type": "string",
                    "require" : true
                },
                "zipcode": {
                    "type": "string",
                    "require" : true
                }
            }
        }
    }
};

schemas.updateCustomerData = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "properties": {
        "id": {
            "type": "integer"
        },
        "firstName": {
            "type": "string"
        },
        "lastName": {
            "type": "string"
        },
        "age": {
            "type": "integer"
        },
        "address": {
            "type": "object",
            "properties": {
                "addr1": {
                    "type": "string"
                },
                "addr2": {
                    "type": "string"
                },
                "city": {
                    "type": "string"
                },
                "zipcode": {
                    "type": "string"
                }
            },
        }
    }
};


schemas.validate = function (object, schema) {
    if (object === undefined || object === null) {
        return false;
    } else {
        var errors = _validator.validate(object, schema).errors;
        if (errors.length > 0) {
            logger.error(util.format('Schema validation failed for 0: %j', errors));
        }
        return errors.length <= 0 ? true : false;
    }
};
module.exports = schemas;