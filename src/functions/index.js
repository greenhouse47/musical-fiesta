export default (req, res) => {
  fs = require("fs");
  fs.writeFile("/tmp/cacheone.txt", "this is cache file.", 'utf8', function(err) {
    if (err) {
      res.status(500).send(`fail desperately.`);
      console.log(err);
    } else {
      res.status(200).send(`file written.`);
    }
  })
}