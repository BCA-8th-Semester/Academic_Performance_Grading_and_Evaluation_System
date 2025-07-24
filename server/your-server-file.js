const { URL, URLSearchParams } = require('whatwg-url');

// Example usage
const url = new URL('http://localhost:5000/academic/signup');
console.log(url.pathname); // '/academic/signup'