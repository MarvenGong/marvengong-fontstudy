const ci = require('miniprogram-ci');
(async function() {
  const project = new ci.Project({
    appid: 'wx0cbaded26cb55749',
    type: 'miniProgram',
    projectPath: '/Users/gongminghua/Public/01work/ecs/ecs-miniprogram',
    privateKeyPath: '/Users/gongminghua/Public/01work/ecs/ecs-miniprogram/private.wx0cbaded26cb55749.key',
    ignores: ['node_modules/**/*'],
  });
  await ci.getDevSourceMap({
    project,
    robot: 30,
    sourceMapSavePath: './sm.zip'
  })
})()