
let urlencode = require('urlencode');

let encodes = urlencode(`{
"main": {
"ddd": "xxx"
}
}`);
console.log(encodes);
let decodes = urlencode.decode(encodes)
console.log(decodes);
