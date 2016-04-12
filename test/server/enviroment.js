var env = {
    NODE_CONFIG_DIR: [__dirname, 'config'].join('/'),
    DEBUG: '*'
};
// 生成环境就不显示调试信息了
if(process.env.NODE_ENV === 'prod') {
  env.DEBUG = 'fa,fa:*'
}
console.log('本来的环境变量：');
printConfigEnv();
replaceEnv();
console.log('改写以后的环境变量：');
printConfigEnv();


function printConfigEnv(){
    for(var i in env){
        console.log(i + ':' + process.env[i]);
    }
}

function replaceEnv(){
    for(var i in env){
        process.env[i] = env[i];
    }
}