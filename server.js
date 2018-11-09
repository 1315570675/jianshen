var WebSocket = require('ws');
var os = require('os');
var localIp;
var netList = os.networkInterfaces();

var platform = os.platform();

if (platform == "win32")
{
	netList = netList['本地连接']
}
else
{
	netList = netList['en0']
}

for (var i = 0; i < netList.length; i++)
{
	if (netList[i].family == 'IPv4')
	{
		localIp = netList[i].address;
	}
}

console.log(localIp);
var WebSocketServer = WebSocket.Server,
	wss = new WebSocketServer({
		host: localIp,
		port: 8181
	});
var clients = [];
var conClients = [];
var pageClients = [];
var courClients = [];
var message;
var sendData = {
	pageStatus: 1,
	pageId: 1,
	classType: -1,
	startTime: 0,
	endTime: 0,
	totalTime: 0
};

var sendData2 = {
	pageStatus: 2,
	courseId: 1,
	courseType: -1,
	startTime: 0,
	endTime: 0,
	totalTime: 0
};

function wsSend(type, message, clientType)
{
	var curClients = [];
	if (clientType == 'page')
	{
		curClients = pageClients;
	}
	else if (clientType == 'con')
	{
		curClients = conClients;
	}
	else if (clientType == 'cour')
	{
		curClients = courClients;
	}
	else
	{
		curClients = clients;
	}

	for (var i = 0; i < curClients.length; i++)
	{
		var clientSocket = curClients[i].ws;
		if (clientSocket.readyState === WebSocket.OPEN)
		{
			clientSocket.send(message);
		}
	}

}

function getDate()
{
	var timestamp = new Date().getTime();
	return timestamp;
}

function sendCon($type)
{
	var pageStatus;
	if ($type == 1)
	{
		var currSendData = sendData;
		pageStatus = 1;
	}
	else if ($type == 2)
	{
		var currSendData = sendData2;
		pageStatus = 2;
	}
	var typeData = {
		pageStatus: pageStatus
	};
	if ($type == 1)
	{
		typeData.pageId = currSendData.pageId;
		typeData.classType = currSendData.classType;
	}
	else if ($type == 2)
	{
		typeData.courseId = currSendData.courseId;
		typeData.courseType = currSendData.courseType;
	}
	if (currSendData.courseType == -1 || currSendData.classType == -1)
	{
		typeData.totalTime = currSendData.totalTime;
		typeData.startTime = currSendData.startTime;

		return JSON.stringify(typeData);
	}

	if (currSendData.courseType == 0 || currSendData.courseType == 2 || currSendData.classType == 0 || currSendData.classType == 2)
	{
		typeData.endTime = getDate();
		typeData.totalTime = typeData.endTime - currSendData.startTime + currSendData.totalTime;
		typeData.startTime = currSendData.startTime;
		typeData.endTime = currSendData.endTime;
		return JSON.stringify(typeData);
	}
	if (currSendData.courseType == 1 || currSendData.classType == 1)
	{
		typeData.totalTime = currSendData.totalTime;
		typeData.startTime = currSendData.startTime;
		typeData.endTime = currSendData.endTime;
		return JSON.stringify(typeData);
	}

	if (currSendData.courseType == 3 || currSendData.classType == 3)
	{
		typeData.totalTime = currSendData.totalTime;
		typeData.startTime = currSendData.startTime;
		typeData.endTime = currSendData.endTime;
		return JSON.stringify(typeData);
	}
}



function conSendCon($pageStatus, message, $obj)
{

	var currData;
	if ($pageStatus == 1)
	{
		currData = $obj;
	}
	else if ($pageStatus == 2)
	{
		currData = $obj;

	}

	function commonStatus()
	{
		if ($pageStatus == 1)
		{
			currData.classType = message.classType;
			currData.pageId = message.pageId;
		}
		else if ($pageStatus == 2)
		{
			currData.courseType = message.courseType;
			currData.courseId = message.courseId;
		}
	}

	if (message.courseType == -1 || message.classType == -1)
	{
		currData.startTime = 0;
		currData.endTime = 0;
		currData.totalTime = 0;
		commonStatus();
		return currData;
	}

	if (message.courseType == 0 || message.classType == 0)
	{
		if (currData.courseType == -1 || currData.courseType == 3 || currData.classType == -1 || currData.classType == 3)
		{
			currData.totalTime = 0;
			currData.startTime = getDate();
			commonStatus();
			return currData;

		}
	}
	if (message.courseType == 1 || message.classType == 1)
	{
		if (currData.courseType == 0 || currData.courseType == 2 || currData.classType == 0 || currData.classType == 2)
		{
			currData.endTime = getDate();
			currData.totalTime += currData.endTime - currData.startTime;
			commonStatus();
			return currData;
		}
		else
		{
			commonStatus();
			return currData;
		}

	}

	if (message.courseType == 2 || message.classType == 2)
	{
		if (currData.courseType == 1 || currData.classType == 1)
		{
			currData.startTime = getDate();
			currData.endTime = 0;
			commonStatus();
			return currData;
		}
	}

	if (message.courseType == 3 || message.classType == 3)
	{
		currData.startTime = 0;
		currData.endTime = 0;
		currData.totalTime = 0;
		commonStatus();
		return currData;
	}

}


wss.on('connection', (ws) => {

	clients.push({
		"ws": ws,
	});

	ws.on('message', (message) => {
		message = JSON.parse(message);

		if (message.type == 'control')
		{
			conClients.push({
				"ws": ws,
			});
		}
		else if (message.type == 'page')
		{
			pageClients.push({
				"ws": ws,
			});
		}
		else if (message.type == 'cour')
		{
			courClients.push({
				"ws": ws,
			});
		}

		if (message.isFirst)
		{
			wsSend("message", sendCon(2), 'con');
			wsSend("message", sendCon(1), 'con');
		}
		if (message.pageStatus == 1)
		{
			sendData.pageStatus = 1;

			if (message.classType == 5)
			{
				wsSend("message", sendCon(1));
			}

			var currData = conSendCon(1, message, sendData);


			if(currData){
				sendData = currData;
				wsSend("message", JSON.stringify(sendData));
			}


		}
		else if (message.pageStatus == 2)
		{
			sendData2.pageStatus = 2;
			if (message.courseType == 5)
			{
				wsSend("message", sendCon(2));
			}


			var currData = conSendCon(2, message, sendData2);
			if(currData){
				sendData2 = currData;
				wsSend("message", JSON.stringify(sendData2));
			}
		}

	});

	var closeSocket = function (customMessage) {
		//链接关闭
	};
	ws.on('close', function () {
		closeSocket();
	});

	process.on('SIGINT', function () {
		console.log("Closing things");
		closeSocket('Server has disconnected');
		process.exit();
	});
});

