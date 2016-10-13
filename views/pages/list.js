const header = require('components/header');
const list = require('components/list');
const nav = require('components/nav');
const cookie = require('common/cookie');

console.log('这是page-list'); // eslint-disable-line
const uid = cookie.get('uid');
if (!uid) {
  alert(1);
  header.init();
  list.init();
  nav.init();
}
