const prompt = require('prompt');
const WebSocket = require('ws');

/* Web Socket URL */
const url = process.env.webSocketUrl || 'ws://localhost:8080';

/* User Input Questions */
const questions = [
	{
		type: 'integer',
		name: 'nodeClient',
		description: "How many clients we want to create from this 1 Node client?",
		message: "Must be a Number(int)",
		required: true
	},
	{
		type: 'integer',
		name: 'sendDataInSec',
		description: "How many X seconds we have to send data?",
		message: "Must be a Number(int)",
		required: true
	}
];

/* Get inputs for node console using prompt */
prompt.start();

prompt.get(questions, (err, result) => {
	if (err) { return onErr(err); }

	if(result.nodeClient) {
		webSocketCon(1, result.nodeClient, result.sendDataInSec);
	}
});
/* Get inputs for node console using prompt */



/* Web socket connection 
* clientId
*		- To specify socket connection based on ID
* nodeClient
*		- No. of client connection
* sec
*		- Interval for sending data to all clients
*/

function webSocketCon(clientId, nodeClient, sec) {
	const connection = new WebSocket(url);  //Connect client to server socket
	const mSec = sec * 1000;  //conversion to milliseconds

	connection.onopen = () => {
		let interval = setInterval(() => {
			let data = 'Message From Client ' + clientId;
			connection.send(data);
		}, mSec);
	}

	connection.onerror = (error) => {
		console.log(`WebSocket error: ${error}`);
	}

	connection.onmessage = (e) => {
		console.log(e.data);
	}

	if(nodeClient > 1) {
		let cId = clientId + 1;
		let nClient = nodeClient - 1;
		webSocketCon(cId,nClient,sec);
	}
}
/* Web socket connection end*/

/* Error function for prompt inputs */
function onErr(err) {
	console.log(err);
	return 1;
}