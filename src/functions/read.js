export default (req, res) => {
  fs = require("fs");
  fs.readFile("cacheone.txt", function(err, data) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(data);
    }
  });
  })
}