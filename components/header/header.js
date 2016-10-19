const tpl = require('./header.html');

const header = module.exports = {
  init() {
    console.log(Vue);
    header.test();
  },
  test() {
    console.log('header js');
  }
};
