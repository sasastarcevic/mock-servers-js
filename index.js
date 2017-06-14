var spawn = require('child_process').spawn;
var fs = require('fs');
var request = require('request');
var child;

exports.startWireMock = function(port, executableLocation) {
			if(executableLocation == null){
				executableLocation = "./node_modules/mock-servers-js/wiremock-standalone-2.6.0.jar";
			};
      var out = fs.openSync('logFileForPort' + port, 'a');
      var err = fs.openSync('logFileForPort' + port, 'a');
			runJavaJar(port, executableLocation, out, err);
}

exports.shutDownWireMock = function(port) {
	request.post('http://localhost:' + port + "/__admin/shutdown", '')
		.on('response', function(response) {
				console.log("Shutdown WireMock server on port: " + port);
		})
		.on('error', function(response) {
				console.log("Error while shuting down WireMock server on port: " + port);
		});
}

exports.setNewMappingForPort = function(port, jsonBody) {

	var options = {
	  uri: 'http://localhost:' + port + '/__admin/mappings/new',
	  method: 'POST',
	  json: jsonBody
	};

	request(options, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
		console.log(response);
	  }
	});
}

function runJavaJar(port, executableLocation, out, err) {
		console.log("WireMock server on port: "+port);
		rootDirectory = "./node_modules/mock-servers-js";
		child = spawn('java', ['-jar', executableLocation, '--port', port, '--root-dir', rootDirectory], {
				detached: true,
				stdio: ['ignore', out, err]
		});
		child.unref();
}
