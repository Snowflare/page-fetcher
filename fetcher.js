const arg = process.argv.slice(2);
const fs = require("fs");
const request = require('request');
let writeStream = fs.createWriteStream(arg[1]);
writeStream.on('error', err => {console.log(err.message)})
// console.log(arg);

request(arg[0], (error, response, body) => {
  if (error){
    console.log(error);
    return;
  }
  writeStream.write(body);
  
  // the finish event is emitted when all data has been flushed from the stream
  writeStream.on('finish', () => {
    console.log(`Downloaded and saved ${writeStream.bytesWritten} bytes to ${arg[1]}`);
  });

  // close the stream
  writeStream.end();
});











// fs.writeFile("./test_async.txt", "h3ll0 file!\n", (error) => {
//   if (error) {
//     // Handle error
//     console.log("Failed to write to file");
//     return;
//   }
//   // Success!
//   console.log(`Downloaded and saved ${fs.bytesWritten} bytes to ./index.html`);
// });
