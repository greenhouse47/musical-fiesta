export default (req, res) => {
  fs = require("fs");
  fs.writeFile("cacheone.txt", "this is cache file.", 'utf8', function(err) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(`file written.`);
    }
  })
}