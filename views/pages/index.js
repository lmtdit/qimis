const header = require('components/header');
const list = require('components/list');
const nav = require('components/nav');
const cookie = require('common/cookie');

console.log(cookie); // eslint-disable-line
console.log('这是page-index'); // eslint-disable-line
const uid = cookie.get('uid');
if (!uid) {
  header.init();
  list.init();
  nav.init();
}
