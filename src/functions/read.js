export default (req, res) => {
  fs = require("fs");
  fs.readFile("/tmp/cacheone.txt", function(err, data) {
    if (err) {
      console.log(err);
      res.status(500).send('fail desperately.');
    } else {
      res.status(200).send(data);
    }
  });
}