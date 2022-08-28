export default (req, res) => {
  bip39 = require("bip39");

  console.log(req.body);
  res.end();
}