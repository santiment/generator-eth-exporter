'use strict';
const Generator = require('yeoman-generator');
var yeoman = require('yeoman-environment');
const path = require('path');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the ${chalk.red('eth-exporter')} project generator!`)
    );

    const prompts = [
      {
        type: 'input',
        name: 'project_name',
        message: 'What is the name of your extractor?',
        default: path.basename(this.destinationRoot())
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {

    ["package.json", "Jenkinsfile"].forEach(file => {
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(file),
        { project_name: this.props.project_name }
      );
    });

    ["index.js", "Dockerfile", "docker-compose.yaml", ".gitignore", ".dockerignore"].forEach(file => {
      this.fs.copy(this.templatePath(file), this.destinationPath(file));
    });
  }

  install() {
    this.log("Running the default extractor");
    this.log(`Make sure you have ${chalk.red("docker")} and ${chalk.red("docker-compose")} installed so that you can run the exporter!`)
    this.log(`Running the exporter the ${chalk.red("docker-compose up --build")}...`)
    this.spawnCommand("docker-compose", ["build"]);
    this.spawnCommand("docker-compose", ["run", "exporter", "npm", "install"]);
    this.spawnCommand("docker-compose", ["up"]);
  }
};