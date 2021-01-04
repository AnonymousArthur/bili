#!/usr/bin/env node
const { program } = require("commander");
const { spawnSync } = require("child_process");
const { pathExistsSync } = require("fs-extra");
const { getCookie } = require("../helpers/cookieManager");
const path = require("path");

program.option("-f, --fidility <fidility>").parse(process.argv);

const url = program.args[0] || "";
const destination = program.args[1] || ".";
const resolvedDestination = path.resolve(destination);
const { fidility = 120 } = program.opts();
console.log(program.args, program.opts());

if (!url || !validUrl(url)) {
  return;
}

if (!pathExistsSync(destination)) {
  return;
}

function validUrl() {
  return true;
}

async function startDownload(url, fidility, destination) {
  const cookie = await getCookie();
  console.log(cookie);
  return spawnSync("annie", ["-f", fidility, "-c", cookie, url], {
      stdio: ["ignore", "inherit", "inherit"],
  });
}

startDownload(url, fidility, resolvedDestination);
