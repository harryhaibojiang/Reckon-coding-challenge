## Reckon coding challenge

Thanks for giving me the opportunity to take this test.

During testing I found the API provided sometimes return 2 types of error: CORS error and 502 error.

- I used a proxy server to walkaround the CORS error, so please start the node server inside api folder first before start the front-end.
- The 502 error is not handled(ignored) due to lack of information in the requirement.

## How to start

Spin up the server:

```bash
npm install
cd ./api
node index.js
```

open another terminal to run the client:

```bash
npm start
```

Optionally: run unit test:

```bash
npm test
```
