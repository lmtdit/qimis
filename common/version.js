var rules = {
    range: /^\s*([\d\.]+)~([\d\.]+)\s*$/,
    min: /^\s*([\d\.]+)~\s*$/,
    max: /^\s*~([\d\.]+)\s*$/
  },
  // 缺省版本位权值
  bitValue = 100;
/**
 *  @param tarVer {String} 需要判断的版本号
 *  @param verRule {String} 判定规则：
 *         a) "9.5~" 版本号大于等于9.5
 *         b) "9.5~9.7" 版本号大于等于9.5小于9.7
 *         b) "~9.5" 版本号小于9.5
 **/
module.exports = function match(tarVer, verRule) {

  var ruleMatches;

  if (ruleMatches = verRule.match(rules.range)) {

    var minVer = ruleMatches[1],
      maxVer = ruleMatches[2],
      bitValue = getMaxBitLength([tarVer, minVer, maxVer]),
      tar = calcVersionValue(tarVer, bitValue),
      min = calcVersionValue(minVer, bitValue),
      max = calcVersionValue(maxVer, bitValue);

    return (tar >= min && tar < max);

  } else if (ruleMatches = verRule.match(rules.min)) {

    var minVer = ruleMatches[1],
      bitValue = getMaxBitLength([tarVer, minVer]),
      tar = calcVersionValue(tarVer, bitValue),
      min = calcVersionValue(minVer, bitValue);

    return (tar >= min);

  } else if (ruleMatches = verRule.match(rules.max)) {
    var maxVer = ruleMatches[1],
      bitValue = getMaxBitLength([tarVer, maxVer]),
      tar = calcVersionValue(tarVer, bitValue),
      max = calcVersionValue(maxVer, bitValue);

    return (tar < max);

  } else {
    // 规则匹配失败
    return false;
  }
}

/**
 *  将版本号转化为可比较运算的number
 **/

function calcVersionValue(ver, bitValue) {
  if (!/\./.test(ver)) return 0;

  var bits = ver.split('.'),
    baseBitValue = Math.pow(bitValue, 3),
    value = 0;

  [].forEach.call(bits, function(bit,index){
    value += bit * baseBitValue * Math.pow(bitValue, 0 - index);
  });

  return value;
}

/**
 *  获取版本号中最长位
 **/
function getMaxBitLength(versions) {

  var maxLen = 1;

  if (isString(versions)) {
    versions = [versions];
  }
  [].forEach.call(versions, function(ver){
    if (/\./.test(ver)) {
      [].forEach.call(ver.split('.'), function(verBit){
        if (verBit.length > maxLen) {
          maxLen = verBit.length;
        }
      });
    }
  });
  return Math.pow(10, maxLen);
}

function isString(x) {
  return x !== null && x !== undefined && x.constructor === String;
}

/****  testing  ****/
// console.log('9.6', '9.6~', match('9.6', '9.6~'));
// console.log('9.6', '9.6~9.7.12', match('9.6', '9.6~9.7.12'));
// console.log('9.6', '~9.4.999', match('9.6', '~9.4.999'));
