
var _ = require('lodash');
var logger = require('./logger');
var constants = require("./constants");
var fs = require('fs');

//const kafka = require('../utils/kafka');
const moment = require('moment');
const config = require('../config');


/**
 * This is function will remove the fields which are not allowed to vie
 * 
 * @param object
 *            data object
 * @param privacyObject
 *            contains the details privacy
 * @param viewerRelation
 *            relation of viewer with user
 */
var sanitizeByPrivacy = function (object, privacyObject, viewerRelation) {
	for (var index in privacyObject) {
		var keys = _.keys(privacyObject[index]);
		var matchedResult = _.intersection(viewerRelation, keys);
		if (matchedResult.length === 0) {
			delete object[index];
		}
	}
	return object;
};

var formatJson = function (json) {
	var i = 0, il = 0, tab = " ", newJson = "", indentLevel = 0, inString = false, currentChar = null;
	for (i = 0, il = json.length; i < il; i += 1) {
		currentChar = json.charAt(i);
		switch (currentChar) {
			case '{':
			case '[':
				if (!inString) {
					newJson += currentChar + "\n" + repeat(tab, indentLevel + 1);
					indentLevel += 1;
				} else {
					newJson += currentChar;
				}
				break;
			case '}':
			case ']':
				if (!inString) {
					indentLevel -= 1;
					newJson += "\n" + repeat(tab, indentLevel) + currentChar;
				} else {
					newJson += currentChar;
				}
				break;
			case ',':
				if (!inString) {
					newJson += ",\n" + repeat(tab, indentLevel);
				} else {
					newJson += currentChar;
				}
				break;
			case ':':
				if (!inString) {
					newJson += ": ";
				} else {
					newJson += currentChar;
				}
				break;
			case ' ':
			case "\n":
			case "\t":
				if (inString) {
					newJson += currentChar;
				}
				break;
			case '"':
				if (i > 0 && json.charAt(i - 1) !== '\\') {
					inString = !inString;
				}
				newJson += currentChar;
				break;
			default:
				newJson += currentChar;
				break;
		}
	}
	return newJson;
};

var repeat = function (s, count) {
	return new Array(count + 1).join(s);
}

/**
 * It is used to omit spaces from a string and replace them with the string provided in the constants file
 * 
 * @param str
 *            any string
 */
var omitSpace = function (str) {
	return str.replace(/ /g, constants.spaceReplacement);
};

var convertIntToBool = function (variable) {
	if (variable === undefined) {
		variable = false;
	} else if (variable === null) {
		variable = false;
	} else if (variable === 0) {
		variable = false;
	} else if (variable === 1) {
		variable = true;
	}
	return variable;
};

var compareObjects = function (newObj, oldObj) {
	var compResult = [];
	// Get the keys of new Object
	var newObjKeys = _.keys(newObj);
	// Get the keys of old object
	var oldObjKeys = _.keys(oldObj);
	// Compare old keys with new keys
	var diffInNewObject = _.difference(oldObjKeys, newObjKeys);
	// If any difference found between two then there are some fields which are removed in new object
	if (diffInNewObject.length > 0) {
		// Add removed fields in history
		for (var i in diffInNewObject) {
			var obj = {
				name: diffInNewObject[i],
				oldValue: oldObj[diffInNewObject[i]],
				newValue: ''
			}
			compResult.push(obj);
		}
	}
	// Iterate through all the keys of new object
	for (var index in newObj) {
		if (oldObj !== undefined && newObj[index] !== oldObj[index]) {
			var flag = true;
			// Check whether current field is array
			if (_.isArray(newObj[index])) {
				flag = false;
				// Check whether array is object array
				if (typeof (newObj[index][0]) === 'object') {
					var obj = {
						"arrayName": index
					};
					obj[index] = [];
					// Iterate through all the objects of array
					for (var i in newObj[index]) {
						if (oldObj[index] !== undefined) {
							// Recursive call to get difference between object array
							var comp = compareObjects(newObj[index][i], oldObj[index][i]);
							for (var j in comp) {
								var obj = {
									arrayIndex: (comp[j].id !== undefined) ? comp[j].id : i,
									name: index + '.' + comp[j].name,
									oldValue: comp[j].oldValue,
									newValue: comp[j].newValue,
									id: comp[j].id
								};
								compResult.push(obj);
							}
						} else {
							// Value is not in old object
							var obj = {
								name: index,
								oldValue: '',
								newValue: newObj[index],
								id: newObj.id
							}
							compResult.push(obj);
						}
					}
				} else {
					var elementsAddedInArray = _.difference(newObj[index], oldObj[index]);
					var elementsRemovedFromArray = _.difference(oldObj[index], newObj[index]);
					if (elementsAddedInArray.length > 0 || elementsRemovedFromArray.length > 0) {
						flag = true;
						var obj = {
							name: index,
							oldValue: oldObj[index],
							newValue: newObj[index],
							id: newObj[index].id
						}
						compResult.push(obj);
					}
				}
			} else if (!_.isUndefined(newObj[index]) && !_.isUndefined(oldObj[index])) {
				// If field is object then find the difference between object(s)
				if (typeof (newObj[index]) == 'object') {
					var comp = compareObjects(newObj[index], oldObj[index]);
					if (comp.length > 0) {
						for (var i in comp) {
							var obj = {
								name: index + '.' + comp[i].name,
								oldValue: comp[i].oldValue,
								newValue: comp[i].newValue,
								arrayIndex: (comp[i].id !== undefined) ? comp[i].id : comp[i].arrayIndex,
								id: comp[i].id
							};
							compResult.push(obj);
						}
					}
				} else {
					var obj = {
						name: index,
						oldValue: oldObj[index],
						newValue: newObj[index],
						id: newObj.id
					}
					compResult.push(obj);
				}

			} else if (_.isUndefined(oldObj[index])) {
				// Value is not in old object
				var obj = {
					name: index,
					oldValue: '', // Made change here
					newValue: newObj[index],
					id: newObj.id
				}
				compResult.push(obj);
			}
		} else if (oldObj === undefined && newObj !== undefined) {
			// Value is not in old object
			var obj = {
				name: index,
				oldValue: '',
				newValue: newObj[index],
				id: newObj.id
			}
			compResult.push(obj);
		}
	}
	return compResult;
};

/**
 * To check if given object is valid or not
 * 
 * @param obj
 *            contains object
 */
var isValidObj = function (obj) {
	for (var index in obj) {
		if (obj[index] !== undefined && obj[index] !== null && obj[index] !== "") {
			return true;
		}
	}
	return false;
};

/*
 * var custNumArray = []; for (var i = 0; i <= 100000; i++) { var custNum = generateCustomerNumber(); if (custNumArray.indexOf(custNum) != -1) { console.log(custNum); } else { custNumArray.push(custNum); } // console.log("Customer Number: ", custNum); }
 */

/**
* to check is syntax error/ReferenceError or system error
* @param {*} error 
*/
let getErrorContent = (error) => {
	if (Object.keys(error).length > 0) {
		return JSON.stringify(error);
	} else {
		return error.toString();
	}
}

let addLogToKafka = (type, dir, data) => {
	let prepareLogData = {
		ts: moment().utc().format(),
		type: type,
		dir: dir,
		data: data
	}
	console.log(config.get('kafka.topics.callLogs'))
	//add Call log in KAFKA
	kafka.sendMessage(config.get('kafka.topics.callLogs'), JSON.stringify(prepareLogData), "test").then((kafkaResponse) => {
		logger.info(`Log added to kafka with data: ${JSON.stringify(prepareLogData)}`);
	}).catch((error) => {
		logger.error(`Error in adding log to kafka with data: ${JSON.stringify(prepareLogData)}, Error: ${getErrorContent(error)}`);
	});
};


let addPhoneSystemLogToKafka = (logObj, level, channel) => {
	if (Object.keys(logObj).length > 0) {
		logObj.serviceName = "UCS";
		logObj.commChannel = channel;
	}
	let prepareLogData = {
		jsonLog: logObj,
		timestamp: moment().utc().format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
		level: level
	}
	//console.log(JSON.stringify(prepareLogData))

	//add Call log in KAFKA
	kafka.sendMessage(config.get('kafka.topics.commonlogs'), JSON.stringify(prepareLogData), "test").then((kafkaResponse) => {
		logger.info(`Phone System Log added to kafka with data: ${JSON.stringify(prepareLogData)}`);
	}).catch((error) => {
		logger.error(`Error in adding log to kafka with data: ${JSON.stringify(prepareLogData)}, Error: ${getErrorContent(error)}`);
	});
}

let addMessageToKafka = (type, data, key = false) => {
	let kafkaObj = {
		ts: moment().utc().format(),
		type: type,
		data: data
	}
	//add Call log in KAFKA
	kafka.sendMessage(config.get('kafka.topics.crmUpdater'), JSON.stringify(kafkaObj), key).then((kafkaResponse) => {
		logger.info(`Message added to kafka with data: ${JSON.stringify(kafkaObj)}`);
	}).catch((error) => {
		logger.error(`Error in adding message to kafka with data: ${JSON.stringify(kafkaObj)}, Error: ${getErrorContent(error)}`);
	});
}

/**
 * Create History doc.
 * 
 * @param newDoc
 *              
 * @param oldDoc
 * 
 * @returns
 *          history object
 * 
 */

 var getHistoryData = (newDoc, oldDoc, userId, fullUserName) => {
	let historyDetails = {
		updatedById: userId,
		updatedByName: fullUserName,
		updatedDate: moment().utc().format(),
		fields: []
	};
	delete newDoc.updatedById;
	delete oldDoc.updatedById;
	delete newDoc.updatedByName;
	delete oldDoc.updatedByName;
	delete newDoc.updatedDate;
	delete oldDoc.updatedDate;
	let result = compareObjects(newDoc, oldDoc);
	if (result.length > 0) {
		for (let index in result) {
			delete result[index].id
		}
	}
	historyDetails.fields = result;
	return historyDetails;
};

var sanitize = function (object, schema) {
	var schemaKeys = _.keys(schema.properties);
	var objectKeys = _.keys(object);
	var constantsValues = _.values(constants.keys);

	for (var key in objectKeys) {
		var isValueMatched = false;
		for (var index in constantsValues) {
			if (constantsValues[index].indexOf(objectKeys[key].substring(0, constantsValues[index].length)) === 0) {
				isValueMatched = true;
				break;
			}
		}
		if (!isValueMatched && schemaKeys.indexOf(objectKeys[key]) === -1) {
			delete object[objectKeys[key]];
		} else {
			var propertyList = _.keys(schema.properties[objectKeys[key]]);
			for (var index = 0; index < propertyList.length; index++) {
				if (propertyList[index] === '$ref') {
					var refValue = schema.properties[objectKeys[key]];
					var refSchema = refValue.$ref.substring(1, refValue.$ref.length);
					sanitize(object[objectKeys[key]], schemas[refSchema]);
				}
			}
		}
	}
	// logger.info(util.format('%j', object));
	return object;
};
module.exports = {
	sanitizeByPrivacy: sanitizeByPrivacy,
	formatJson: formatJson,
	omitSpace: omitSpace,
	convertIntToBool: convertIntToBool,
	compareObjects: compareObjects,
	isValidObj: isValidObj,
	getErrorContent: getErrorContent,
	addLogToKafka: addLogToKafka,
	addPhoneSystemLogToKafka: addPhoneSystemLogToKafka,
	addMessageToKafka: addMessageToKafka,
	getHistoryData: getHistoryData,
	sanitize: sanitize
};