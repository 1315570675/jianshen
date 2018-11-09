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