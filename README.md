Server mocking library based on WireMock library

Pre-requisites:
- Java installed (WireMock server is Java .jar)


Get library:
```
  npm install mock-servers-js
```

Run server:
```
  var mock_servers = require('mock-servers-js');
  mock_servers.startWireMock('1001', null);
```

Setup new mapping from js:
```
  var request = {
      "request": {
        "method": "GET",
        "url": "/endpoint/for/mocking"
      },
      "response": {
        "status": 200,
        "jsonBody": {
          "mock_servers_js": "Hello :)"
        },
        "headers": {
          "Content-Type": "application/json"
        }
      }
    };

  mock_servers.setNewMappingForPort('1001', request);
```

Setup new mapping with curl:
```
  curl -X POST \
  --data '{ "request": { "url": "/get/this", "method": "GET" }, "response": { "status": 200, "body": "Here it is!\n" }}' \
  http://localhost:1001/__admin/mappings/new
```

Check mappings:
```
  http://localhost:1001/endpoint/for/mocking
  http://localhost:1001/get/this
```

Shutdown server from js:
```
  mock_servers.shutDownWireMock('1001');
```

Server will be started on port '1001'. Use WireMock api to setup new mappings:
http://wiremock.org/docs/api/
