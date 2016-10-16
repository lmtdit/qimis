const cookie = require('common/cookie.js');
const utils = require('common/utils.js');
const header = require('components/header');
const list = require('components/list');
const nav = require('components/nav');

const id = utils.getQueryString('id');
console.log(utils); // eslint-disable-line
console.log(id); // eslint-disable-line

console.log('这是page-index'); // eslint-disable-line
const uid = cookie.get('uid');
if (!uid) {
  header.init();
  list.init();
  nav.init();
}
