Server mocking library based on WireMock library

Pre-requisites:
- Java installed (WireMock server is Java .jar)


Get library:
```
  npm install mock-servers-js
```

Setup:
```
  var mock_servers = require('mock-servers-js');
  mock_servers.startWireMock('1001', null);
```

Shutdown server:
```
  mock_servers.shutDownWireMock('1001');
```

Server will be started on port '1001'. Use WireMock api to setup new mappings:
http://wiremock.org/docs/api/
