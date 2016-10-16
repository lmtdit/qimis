const header = module.exports = {

  init: () => {
    const tpl = require('./header.html');
    console.log(tpl);
    header.test();
  },
  test: () => {
    console.log('header js');
  }
};
