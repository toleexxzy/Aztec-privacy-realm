const http = require('http');

// Test if backend is responding
const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/api/images/upload',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  }
};

console.log('Testing backend connectivity...');

const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  console.log(`Headers:`, res.headers);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Response body:', data);
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

// Send a simple test request
req.write(JSON.stringify({ test: 'data' }));
req.end();