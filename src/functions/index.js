export default (req, res) => {
  fs = require("fs");
  fs.writeFile("cacheone.txt", "this is cache file.", 'utf8', function(err) {
    res.status(200).send(`file written.`);
  })
}