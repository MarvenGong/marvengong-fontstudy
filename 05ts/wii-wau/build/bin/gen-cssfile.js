var fs = require('fs');
var path = require('path');
var Components = require('../../components.json');
Components = Object.keys(Components);
var basepath = path.resolve(__dirname, '../../packages/');

function fileExists (filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch (err) {
    return false;
  }
}

['styles'].forEach((theme) => {
  var indexContent =
    "@import 'base.less';\n// 以下代码通过 gen-cssfile.js 自动生成\n";
  Components.forEach(function (key) {
    if (['icon', 'option', 'option-group'].indexOf(key) > -1) return;
    var fileName = key + '.less';
    indexContent += '@import "./' + fileName + '";\n';
    var filePath = path.resolve(basepath, theme, fileName);
    if (!fileExists(filePath)) {
      fs.writeFileSync(filePath, '', 'utf8');
      console.log(theme, ' 创建遗漏的 ', filePath, ' 文件');
    }
  });
  fs.writeFileSync(path.resolve(basepath, theme, 'index.less'), indexContent);
});
