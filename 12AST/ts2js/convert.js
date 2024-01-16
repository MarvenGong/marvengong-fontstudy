const esprima = require('esprima');
const fs = require('fs');
const paser = require('@babel/parser');
const traverse = require("@babel/traverse");
const configStr = fs.readFileSync('./config.ts').toString();
const ast = paser.parse(configStr, {
  plugins: ['typescript'],
  sourceType: 'module'
});
let cont = 0;
traverse.default(ast, {
  enter(path) {
    // console.info(path.node.type === 'Variance' && path.node.name === 'CDN_URL');
    if (path.node.name === "CDN_URL") {
      // path.node.name = "x";
      cont++;
      if (cont <= 1) {
        console.info(path);
      }
    }
  },
});
// console.log(ast.program.body.Node)