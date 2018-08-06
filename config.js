module.exports = {
    port: '8080',
    env: '/src',    //输出环境[build src]
    engine: 'jade',    //模板引擎[jade handlebars ejs swig]
    routes: [
      {path: '/test', file: 'test'},
      {path: '/users', file: 'users'},
      {path: '/', file: 'index'}
    ]
};
