// 判断arr是否为一个数组，返回一个bool值

function isArray(arr) {
    return Object.prototype.toString.call(arr) == "[object Array]";
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    return Object.prototype.toString.call(fn) == "[object Function]";
}


// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
function cloneObject (src) {
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        toString = Object.prototype.toString,
        result,
        item,
        cur;

    if (!src || typeof src !== 'object') {
        return src;
    }

    if (toString.call(src) == '[object Array]') {
        result = [];
    } else {
        result = {};
    }

    for (item in src) {
        cur = src[item];
        if (hasOwnProperty.call(src, item)) {
            if (typeof cur === 'object') {
                result[item] = cloneObject(cur);;
            } else {
                result[item] = cur;
            }
        }
    }

    return result;
};

// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    var i,
        tmp,
        result = [],
        map = {};

    for (i = 0; i < arr.length; i++) {
        tmp = arr[i];
        if (!map[tmp]) {
            result.push(tmp);
            map[tmp] = true;
        }
    }
    return result;
}

// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 先暂时不要简单的用一句正则表达式来实现
function simpleTrim(str) {
    var i,
        result = '';
    for (i = 0; i < str.length; i++) {
        var tmp = str.charAt(i);
        if (tmp != 0) {
            result += tmp;
        }
    }
    return result;
}

// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/,'');
}

//遍历数组
var each = function (arr, func) {
    for (var i in arr) {
        func(arr[i], i);
    }
};


// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    var result = 0;
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            result++;
        }
    }
    return result;
}

// 判断是否为邮箱地址
function isEmail(emailStr) {
    return emailStr.match(/^([a-zA-Z0-9_-\.])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])$/);
}

// 判断是否为手机号
function isMobilePhone(phone) {
    return (/^1[34578]\d{9}$/).test(phone);
}