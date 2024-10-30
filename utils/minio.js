const config = require('../config');
const minio = require('minio');
const fs = require('fs');
const logger = require('./logger');

let minioClient = new minio.Client({
    endPoint:  '192.168.1.8',
    port: 9000,
    useSSL: false,
    accessKey: 'minioadmin',
    secretKey: 'minioadmin'
});
// minioClient.setRequestOptions({ ca: [fs.readFileSync(config.get('minio.caCertPath'))] });
var _minioFileUploader = function (bucketName, objectName, filePath) {
    return new Promise((resolve, reject) => {
        minioClient.bucketExists(bucketName, function (err, exists) {
            if (err) {
                logger.error(`Error in bucketExists Error: ${Object.keys(err).length > 0 ? JSON.stringify(err) : err}`);
                return reject(err);
            }
            let metaData = {
                //'Content-Type': 'text/html',
                //'X-Amz-Meta-Testing': 1234,
                //'example': 5678
            }
            minioClient.fPutObject(bucketName, objectName, filePath, metaData, function (err, etag) {
                if (err) {
                    logger.error(`Error in adding object: ${filePath} Error: ${Object.keys(err).length > 0 ? JSON.stringify(err) : err}`);
                    return reject(err);
                } else {
                    return resolve(etag);
                }
            });
        });
    });
};

let _miniofGetObject = function (bucketName, objectName, filePath) {
    return new Promise((resolve, reject) => {
        minioClient.bucketExists(bucketName, function (err, exists) {
            if (err) {
                logger.error(`Error bucket does not exists Error: ${Object.keys(err).length > 0 ? JSON.stringify(err) : err}`);
                return reject(err);
            }
            minioClient.fGetObject(bucketName, objectName, filePath, function (err, dataStream) {
                if (err) {
                    logger.error(`Error in get object Error: ${Object.keys(err).length > 0 ? JSON.stringify(err) : err}`);
                    return reject(err);
                } else {
                    return resolve(dataStream);
                }
            });
        });
    });
}

let _minioListObjects = function (bucketName, prefix, isRecursive, startAfter) {
    return new Promise((resolve, reject) => {
        minioClient.bucketExists(bucketName, function (err, exists) {
            if (err) {
                logger.error(`Error in bucketExists Error: ${Object.keys(err).length > 0 ? JSON.stringify(err) : err}`);
                return reject(err);
            }
            var stream = minioClient.listObjects(bucketName, prefix, isRecursive, startAfter);
            let objects = [];
            stream.on('data', function (obj) {
                objects.push(obj);
                console.log(objects);
                // resolve(obj);
            })

            stream.on('end', function () {
                resolve(objects);
            });

            stream.on('error', function (err) {
                logger.error(`Error in get list object Error: ${Object.keys(err).length > 0 ? JSON.stringify(err) : err}`);
                reject(err);
            });
        });
    });
}

var _minioGetObject = function (bucketName, objectName, res) {
    return new Promise((resolve, reject) => {
        minioClient.bucketExists(bucketName, function (err, exists) {
            if (err) {
                logger.error(`Error bucket not exists _minioGetObject Error: ${Object.keys(err).length > 0 ? JSON.stringify(err) : err}`);
                return reject(err);
            }
            minioClient.getObject(bucketName, objectName, function (err, dataStream) {

                if (err) {
                    logger.error(`Error in get getObject Error: ${Object.keys(err).length > 0 ? JSON.stringify(err) : err}`);
                    return reject(err);
                }

                let data = [];
                dataStream.on('data', function (chunk) {
                    if (res) {
                        res.write(chunk);
                    } else {
                        data.push(chunk);
                    }
                });

                dataStream.on('end', function () {
                    resolve(Buffer.concat(data));
                });

                dataStream.on('error', function (err) {
                    logger.error(`Error in get dataStream Error: ${Object.keys(err).length > 0 ? JSON.stringify(err) : err}`);
                    return reject(err);
                });
            });
        });
    });
}

var _minioGetStat = function (bucketName, objectName) {
    return new Promise((resolve, reject) => {
        minioClient.bucketExists(bucketName, function (err, exists) {
            if (err) {
                logger.error(`Error bucket not exists _minioGetStat Error: ${Object.keys(err).length > 0 ? JSON.stringify(err) : err}`);
                return reject(err);
            }
            minioClient.statObject(bucketName, objectName, function (err, stat) {
                if (err) {
                    logger.error(`Error in get statObject Error: ${Object.keys(err).length > 0 ? JSON.stringify(err) : err}`);
                    return reject(err);
                } else {
                    return resolve(stat);
                }
            });
        });
    });
}

var _minioPutObject = function (bucketName, objectName, stream) {
    return new Promise((resolve, reject) => {
        minioClient.putObject(bucketName, objectName, stream, function (err, etag) {
            if (err) {
                logger.error(`Error in putObject Error: ${Object.keys(err).length > 0 ? JSON.stringify(err) : err}`);
                return reject(err);
            } else {
                return resolve(etag);
            }
        });
    });
}

var _minioRemoveObjects = function (bucketName, objectName) {
    return new Promise((resolve, reject) => {
        minioClient.statObject(bucketName, objectName, function (err, stat) {
            if (err) {
                //logger.error(`Error in get statObject Error: ${Object.keys(err).length > 0 ? JSON.stringify(err) : err}`);
                reject(err);
            }
            else {
                minioClient.removeObject(bucketName, objectName, function (e) {
                    if (e) {
                        reject(err);
                    } else {
                        logger.info('Removed the objects successfully');
                        resolve(true);
                    }
                })
            }
        });
    });
}

module.exports = {
    minioFileUploader: _minioFileUploader,
    miniofGetObject: _miniofGetObject,
    minioListObjects: _minioListObjects,
    minioGetObject: _minioGetObject,
    minioGetStat: _minioGetStat,
    minioPutObject: _minioPutObject,
    minioRemoveObjects: _minioRemoveObjects
}