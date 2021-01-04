const { readFile } = require("fs-extra");
const { resolve } = require("path");
const getCookie = async () => (await readFile(resolve(__dirname, "..", "cookie.txt"))).toString();

module.exports = {
  getCookie,
};
