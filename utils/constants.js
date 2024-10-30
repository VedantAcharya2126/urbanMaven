var constants = {
	responseCodeMessage: {
		code_5000: 'Internal server error.',
		code_5001: 'An error occured while creating user.',
		code_5002: 'Internal server error.',
		code_5003: 'File not uploaded. Error on creating file.',
		code_5004: 'Error in reading file.',
		code_5005: 'Validation Failed',
		code_4000: 'User already exists.',
		code_4001: 'Invalid credentials.',
		code_4002: 'Incomplete data.',
		code_4003: 'Data Not Found.',
		code_2000: 'Success',
		code_2001: 'User created successfully.',
		code_2002: 'Session created.',
		code_2003: 'Successful login.',
		code_2004: 'Mail sent successfully.'
	},
	keys: {
		Data: "DT_",
		isActive: true,
		knowledgeBaseArticle: 'KB_ART_',
		notification: 'NOT',
		callDecline: "CDL",
		callExpire: "CEL",
		notificationReceived: "NRL",
		userSession: "USR-SESS-",
		pendingDiscoveryDoc: "PENDING_DISCOVERY_DOCS",
		articleLookup: "LKPKB_ART_"
	},
	discoveryJsonFields: ["question", "srchTextWOMarkup", "tags"],
	discoveryEnrichedFields: ["enriched_question", "enriched_tags", "enriched_answer"],
	notificationType: {
		"read": "read",
		"unread": "unread",
		"sent": "sent"
	},
	socketEvents: {
		notifier: 'notifier',
		serverEventEmiter: 'serverEventEmiter',
		incomingCallRequest: 'incomingCallRequest'
	},
	regExp: {
		dateTime: /^\d{4}-(?:0[0-9]{1}|1[0-2]{1})-[0-9]{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/,
		date: /^\d{4}-(?:0[0-9]{1}|1[0-2]{1})-[0-9]{2}$/,
		time: /^\d{2}:\d{2}:\d{2}$/,
		email: /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/,
		ipAddress: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
		ipv6: /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/,
		uri: /^[a-zA-Z][a-zA-Z0-9+-.]*:[^\s]*$/,

		hostName: /^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$/,

		alpha: /^[a-zA-Z]+$/,
		alphanumeric: /^[a-zA-Z0-9]+$/,
		phone: /^\+(?:[0-9] ?){6,14}[0-9]$/,
	},
	callType: {
		OUTGOING: "out",
		INCOMING: "in",
		PD: "pd",
		INTERNAL: "internal"
	},
	callGroup: {
		TWOPARTY: "two-party",
		MULTIPARTY: "multi-party"
	},
	ibmWatsonErrorCodes: {
		NOT_FOUND: 404
	},
	ibmWatsonStatus: {
		PROCESSING: 1,
		SUCCESS: 2,
		FAILED: 3,
		WARNING: 4
	},
	filePath: "./sampleData.json"
};

module.exports = constants;
