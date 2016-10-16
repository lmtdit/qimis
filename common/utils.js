var utils = {
  getQueryString: function(name) {
    var reg = new RegExp('(\\?|^|&|\#)' + name + '=([^&|^#]*)(&|$|#)', 'i');
    var r = window.location.href.match(reg);
    if (r != null) return decodeURIComponent(r[2]);
    return '';
  },
  getSearchString: function(params) {
    return Object.keys(params).map(function(k) {
      return k + '=' + encodeURIComponent(params[k]);
    }).join('&')
  },
  matchUrlQueryParams: function(url, params) {
    for (key in params) {
      var val = params[key];
      var reg = new RegExp(key + '=([^&]*)(&|$)', 'i');
      var str = key + '=' + val;
      if (reg.test(url)) {
        url = url.replace(reg, str + '&');
      } else {
        url += '&' + str;
      }
    }
    if ((/\&\&/).test(url)) {
      url = url.replace('&&', '&');
    }

    if (url.lastIndexOf('&') === url.length - 1) {
      url = url.slice(0, url.length - 1);
    }
    return url;
  },
  antiJsValid: function(str) {
    //&apos;----单引号
    //&quot;-----双引号
    //&lt;  -----<
    //&gt;  ----->
    //&     -----&amp;
    //str = str.replace(/\&/g,"&amp;");
    str = str.replace(/\'/g, "&apos;");
    str = str.replace(/\"/g, "&quot;");
    str = str.replace(/\</g, "&lt;");
    str = str.replace(/\>/g, "&gt;");
    str = str.replace(/\&lt;br\/\&gt;/g, "<br/>");
    return str;
  },
  //加密uid 123456789->12xxxx789
  encryptUserId: function(str) {
    return str.replace(/(\w{2})(\w*)(\w{3})/, "$1xxxx$3");
  },

  asciiToString: function(asccode) {
    return String.fromCharCode(asccode);
  },
  /**
   * 判断是否为西文字符（占位是中文字符的一半）
   * @param s
   * @returns {Boolean}
   */
  isWestCharacters: function(s) {
    var c = s.charCodeAt(0);
    if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
      return true;
    } else {
      return false;
    }
  },
  /**
   * 返回中英文的长度
   *
   * @param s
   * @param max
   * @returns
   */
  fucCheckLength: function(s, max) {
    if (!s) return;

    var i, c, w = 0;
    for (i = 0; i < s.length; i++) {
      c = s.charCodeAt(i);
      if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
        w++;
      } else {
        w += 2;
      }
      if (max != null && max != "" && w > max) {
        return s.substr(0, i);
      }
    }
    if (max != null && max != "") {
      return s;
    }
    return w;
  },
  dateTranslate: function(date, format) {
    var o = {
      "M+": date.getMonth() + 1,
      "d+": date.getDate(),
      "h+": date.getHours(),
      "m+": date.getMinutes(),
      "s+": date.getSeconds(),
      "q+": Math.floor((date.getMonth() + 3) / 3),
      "S": date.getMilliseconds()
    };
    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
      }
    }
    return format;
  },
  /**
   * 时间戳 ==> xx 天/小时/分钟 前
   *
   * @param timestamp
   * @returns
   */
  dateFormat: function(timestamp) {
    var today = new Date(); // 今天
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    var oneday = 1000 * 60 * 60 * 24;
    var yesterday = new Date(today - oneday);
    var beforeyesterday = new Date(yesterday - oneday);
    var date = new Date(timestamp - 0);
    var now = new Date();
    var time = (now.valueOf() - date.valueOf()) / 1000;
    var text = "";
    if (date.valueOf() <= beforeyesterday.valueOf()) {
      return this.dateTranslate(date, "MM-dd hh:mm");
    } //超过两天
    if (yesterday.valueOf() >= date.valueOf() && date.valueOf() >= beforeyesterday.valueOf()) {
      return this.dateTranslate(date, "MM-dd hh:mm");
    } //前天
    if (today.valueOf() >= date.valueOf() && date.valueOf() >= yesterday.valueOf()) {
      return this.dateTranslate(date, "MM-dd hh:mm");
    } // 昨天
    if (time >= 3600 && date.valueOf() >= today.valueOf()) {
      return Math.round(time / 60 / 60) + "小时前";
    } //到今天前
    if (time >= 60 && time < 3600) {
      return Math.round(time / 60) + "分钟前";
    }
    if (time < 60) {
      return "刚刚";
    }
    return text;
  },
  isString: function(x) {
    return utils._objType(x, 'string');
  },
  isObject: function(x) {
    return utils._objType(x, 'object');
  },
  isArray: function(x) {
    return utils._objType(x, 'object');
  },
  _objType: function(obj, type) {
    return Object.prototype.toString.call(obj) === "[object " + type + "]"
  }
};

module.exports = utils;
