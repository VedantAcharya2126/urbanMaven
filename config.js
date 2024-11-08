const convict = require('convict');
const fs = require('fs');
const config = convict({
    env: {
        doc: 'The applicaton environment.',
        format: ['production', 'development', 'beta'],
        default: 'development',
        env: 'NODE_ENV',
        arg: 'env'
    },
    server: {
        port: {
            doc: 'HTTP port to bind',
            format: 'port',
            default: 3030,
            env: 'PORT'
        },
        enableTrustProxy: {
            doc: 'Set value true when server is running behind proxy',
            format: Boolean,
            default: false
        },
        enableHttpLogging: {
            doc: 'Enable HTTP Logging',
            format: Boolean,
            default: true
        },
        enableCompression: {
            doc: 'Enable HTTP compression',
            format: Boolean,
            default: true
        },
        enableStatic: {
            doc: 'Enable Express static server',
            format: Boolean,
            default: false
        },
        security: {
            enableXframe: {
                doc: 'Enable Iframe protection',
                format: Boolean,
                default: true
            },
            enableHidePoweredBy: {
                doc: 'Hide X powered by Header',
                format: Boolean,
                default: true
            },
            enableNoCaching: {
                doc: 'Enable No caching',
                format: Boolean,
                default: false
            },
            enableCSP: {
                doc: 'Enable CSP policy',
                format: Boolean,
                default: false
            },
            enableHSTS: {
                doc: 'Enable HSTS',
                format: Boolean,
                default: false
            },
            enableXssFilter: {
                doc: 'Enable XSS filter protection',
                format: Boolean,
                default: true
            },
            enableForceContentType: {
                doc: 'Enable force content type',
                format: Boolean,
                default: false
            },
            enableCORS: {
                doc: 'Enable CORS',
                format: Boolean,
                default: true
            },
            salt: {
                doc: 'Default Salt for Encryption',
                format: String,
                default: 'd6F3Efeq',
            },
            emailSalt: {
                doc: 'salt',
                format: String,
                default: "$2a$10$e.oPc.dyrwRoQCpDvO9Rhe"
            },
            randomSaltlength: {
                doc: 'Random Salt Length',
                format: Number,
                default: 15,
            }
        },
        CORS: {
            allowedHosts: {
                doc: 'Allowed Host for CORS',
                format: Array,
                default: ["http://localhost:4200"]
            },
            allowedMethods: {
                doc: 'Allowed HTTP Methods for CORS',
                format: String,
                default: 'GET,POST,OPTIONS'
            },
            allowedHeaders: {
                doc: 'Allowed HTTP Headers for CORS',
                format: String,
                default: 'accept, x-xsrf-token,content-type, X-Location, certificate, X-Taxyear, X-RId , ngsw-bypass, X-Cache, Authorization'
            },
            exposedHeaders: {
                doc: 'Exposed HTTP Headers for CORS',
                format: String,
                default: 'XSRF-TOKEN'
            },
            Authorization: {
            }
        },

        session: {
            sidname: {
                doc: 'Name of a session',
                format: String,
                default: 'connect.sid'
            },
            path: {
                doc: 'Path of a session',
                format: String,
                default: '/'
            },
            httpOnly: {
                doc: 'httpOnly cookie',
                format: Boolean,
                default: true
            },
            secure: { // should be set to true when using https
                doc: 'Http security of a session',
                format: Boolean,
                default: false
            },
            maxAge: {
                doc: 'Maximum age of a session',
                format: Number,
                default: 24 * 60 * 60 * 1000 // one day
            },
            proxy: { // should set to true when using https and reverse proxy
                // like HAproxy
                doc: 'Http proxy',
                format: Boolean,
                default: false
            },
            rolling: { // should set to true when want to have sliding window
                // session
                doc: 'For sliding window of a session',
                format: Boolean,
                default: false
            }
        },
        bodyParser: {
            limit: {
                doc: 'maximum request body size',
                format: String,
                default: '5mb'
            }
        }
    },
    whitelistAPIs: {
        doc: 'white listed APIs',
        format: Array,
        default: []
    },
    tokenValidationUrl: {
        doc: 'token Validation Url',
        format: String,
        default: "http://localhost:3011/tokenValidation/verify"
    },
    gluu_Client_Secret: {
        doc: 'gluu secret',
        format: String,
        default: "Dynamic@2021"
    },
    logger: {
        httpLogFormat: {
            doc: 'HTTP log format',
            format: String,
            default: ':remote-addr - :remote-user [:date] Protocol - :protocol ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms ":referrer" ":user-agent"'
        },
        httpLogFileName: {
            doc: 'HTTP log File name',
            format: String,
            default: 'http.log'
        },
        path: {
            doc: 'HTTP log path',
            format: String,
            default: './logs/'
        },
        logFilePrefix: {
            doc: 'Log File Prefix',
            format: String,
            default: 'ucs',
            env: 'MY_POD_NAME'
        },
        logFileName: {
            doc: 'Log File name',
            format: String,
            default: 'logs.log'
        },
        exceptionLogFileName: {
            doc: 'Exception log File name',
            format: String,
            default: 'exceptions.log'
        },
        logFileSize: {
            doc: 'logs File Max File size',
            format: Number,
            default: 5242880
        }
    },
    mysql: {
        host: {
            doc: 'Database host',
            format: String,
            default: 'localhost',
            env: "MYSQL_HOST"
        },
        user: {
            doc: 'Session database user',
            format: String,
            default: 'root',
            env: "MYSQL_UNAME"
        },
        password: {
            doc: 'Password for conecting to database',
            format: String,
            default: '12345678',
            env: "MYQSL_PWD"
        },
        database: {
            db: {
                doc: 'Database name',
                format: String,
                default: 'urbanMaven'
            }
        }
    },
    sentry: {
        enableSentryLog: {
            doc: 'flag to check whther to enable sentry logger',
            format: Boolean,
            default: true
        },
        publicKey: {
            doc: 'Sentry Project public key',
            format: String,
            default: 'ecbd1fda256643dbb8e2e8b4f404b6ef'
        },
        secretKey: {
            doc: 'Sentry Project secret key',
            format: String,
            default: '00555b0eae0547ea99eded702d38f278'
        },
        host: {
            doc: 'Sentry Project host',
            format: String,
            default: 'qa.dynamic1001.com'
        },
        projectId: {
            doc: 'Sentry Project ID',
            format: Number,
            default: 34
        },
        environment: {
            doc: 'Sentry Environment',
            format: String,
            default: 'beta',
            env: 'SENTRY_ENVIRONMENT'
        }
    },
    elasticsearch: {
        host: {
            doc: 'host',
            format: Array,
            default: ["http://es.nu.dynamic1001.com"],
            env: 'ELASTIC_HOST'
        },
        knowledgeBaseArticle: {
            doc: 'index name',
            format: String,
            default: 'knowledgebase_article'
        },
        httpAuth: {
            doc: 'userName and password for ES',
            format: String,
            default: 'u-es-app:es@NU2020',
            env: 'ELASTIC_HTTPAUTH'
        },
        index: {
            doc: 'index name',
            format: String,
            default: 'sanitas'
        },
        typeName: {
            doc: 'Type Name',
            format: String,
            default: 'user'
        },
        notificationIndex: {
            doc: 'Notification Index',
            format: String,
            default: 'call_notification_logs',
            //env: 'PBX_BETA_LOGS_INDEX'
        }
    },
    currentServiceCounterArticle: {
        doc: 'Holds the Current Service Counter article Key',
        format: String,
        default: 'CNT_ARTICLES',
    },
    ibmWatson: {
        version: {
            doc: "IBM Watson API Version, Mainly it is based on the Date they released the Version",
            format: String,
            default: '2020-08-30'
        },
        apiKey: {
            doc: "IBM Watson API Secure Key",
            format: String,
            default: 'Q52genWPfa-csTZe2wjS3vOycGXd9qOgKeN4c7PFOPYL'
        },
        serviceUrl: {
            doc: "IBM Watson API Service URL",
            format: String,
            default: 'https://api.us-east.discovery.watson.cloud.ibm.com/instances/575ccf64-89e2-4ef6-a9f6-c4284ae0cfce'
        }
    },
    ibmWatsonEnv: {
        production: {
            supportInternal: {
                projectId: {
                    doc: "Project Id",
                    format: String,
                    default: 'd814d968-9c75-451e-b606-8e1a9a6814c8'
                },
                projectName: {
                    doc: "Project Name",
                    format: String,
                    default: 'BETA - Support Internal Live'
                },
                collection: {
                    english: {
                        collecionId: {
                            doc: "Collecion Id",
                            format: String,
                            default: '978aebeb-784a-f39d-0000-017e51fa7a59'
                        },
                        collectionName: {
                            doc: "Collecion Name",
                            format: String,
                            default: 'Support English'
                        }
                    },
                    spanish: {
                        collecionId: {
                            doc: "Collecion Id",
                            format: String,
                            default: '978aebeb-784a-f39d-0000-017e534b43d6'
                        },
                        collectionName: {
                            doc: "Collecion Name",
                            format: String,
                            default: 'Support Spanish'
                        }
                    }
                }
            },
            supportExternal: {
                projectId: {
                    doc: "Project Id",
                    format: String,
                    default: '7e842fb0-16e3-4e84-8f31-97ebf255ab2a'
                },
                projectName: {
                    doc: "Project Name",
                    format: String,
                    default: 'LIVE - Support External Live'
                },
                collection: {
                    english: {
                        collecionId: {
                            doc: "Collecion Id",
                            format: String,
                            default: '978aebeb-784a-f39d-0000-017e51fead21'
                        },
                        collectionName: {
                            doc: "Collecion Name",
                            format: String,
                            default: 'Support English'
                        }
                    },
                    spanish: {
                        collecionId: {
                            doc: "Collecion Id",
                            format: String,
                            default: '978aebeb-784a-f39d-0000-017e534f6ba3'
                        },
                        collectionName: {
                            doc: "Collecion Name",
                            format: String,
                            default: 'Support Spanish'
                        }
                    }
                }
            }
        },
        test: {
            supportInternal: {
                projectId: {
                    doc: "Project Id",
                    format: String,
                    default: '8bdcd97a-3069-431d-9bec-9cbc9385eac4'
                },
                projectName: {
                    doc: "Project Name",
                    format: String,
                    default: 'BETA - Support Internal Test'
                },
                collection: {
                    english: {
                        collecionId: {
                            doc: "Collecion Id",
                            format: String,
                            default: '317a8128-0838-f40c-0000-017e29f68655'
                        },
                        collectionName: {
                            doc: "Collecion Name",
                            format: String,
                            default: 'Support English'
                        }
                    },
                    spanish: {
                        collecionId: {
                            doc: "Collecion Id",
                            format: String,
                            default: '61f3e0fb-24cf-a112-0000-017e534052d6'
                        },
                        collectionName: {
                            doc: "Collecion Name",
                            format: String,
                            default: 'Support Spanish'
                        }
                    }
                }
            },
            supportExternal: {
                projectId: {
                    doc: "Project Id",
                    format: String,
                    default: '50c9645a-987c-435e-8b75-925ad1047c6a'
                },
                projectName: {
                    doc: "Project Name",
                    format: String,
                    default: 'BETA - Support External Test'
                },
                collection: {
                    english: {
                        collecionId: {
                            doc: "Collecion Id",
                            format: String,
                            default: '978aebeb-784a-f39d-0000-017e51fe3c91'
                        },
                        collectionName: {
                            doc: "Collecion Name",
                            format: String,
                            default: 'Support English'
                        }
                    },
                    spanish: {
                        collecionId: {
                            doc: "Collecion Id",
                            format: String,
                            default: '61f3e0fb-24cf-a112-0000-017e53446b7c'
                        },
                        collectionName: {
                            doc: "Collecion Name",
                            format: String,
                            default: 'Support Spanish'
                        }
                    }
                }

            }
        }
    }
});

config.loadFile('./config-' + config.get('env') + '.json');

config.set('logger.httpLogFileName', config.get('logger.path') + config.get('logger.logFilePrefix') + '-' + config.get('logger.httpLogFileName'));
config.set('logger.logFileName', config.get('logger.path') + config.get('logger.logFilePrefix') + '-' + config.get('logger.logFileName'));
config.set('logger.exceptionLogFileName', config.get('logger.path') + config.get('logger.logFilePrefix') + '-' + config.get('logger.exceptionLogFileName'));

// validate
config.validate();

module.exports = config;