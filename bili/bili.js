#!/usr/bin/env node
const { program } = require("commander");

program
  .command("d <url>", "Download video")
  .command("login", "Login Bilibili")
  .parse(process.argv);
