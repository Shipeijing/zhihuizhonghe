/**
 * global helper functions
 * @module plugins/global
 */

if (typeof window !== 'undefined') {

    var debug = true;

    var weeks = ["周日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];

    var global = {};

    /**
     * just add empty console.log method in old IE to prevent error
     * @function module:utils/global.console
     * @param  {void}
     * @return {void}
     */
    if (! window.console) {
        window.console = {
            log: function() {}
        };
    }

    /**
     * print message 
     * @function module:utils/global.log
     * @param {string} msg text message to print
     * @return {void}
     */
    window.log = global.log = function(msg) {
        debug && console.log(msg);
    };

    /**
     * [dataSuccess description]
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    window.requestResult = global.requestResult = function(data) {
        return data.code == 200
    };

    /**
     * check whether an object is a function 
     * @function module:utils/global.isFunction
     * @param {Object} fn object to check
     * @return {boolean}
     */
    var isFunction = typeof alert === "object" ? function (fn) {
        try {
            return /^\s*\bfunction\b/.test(fn + "");
        } catch (e) {
            return false;
        }
    } : function (fn) {
        return Object.prototype.toString.call(fn) === "[object Function]";
    };

    window.isFunction = global.isFunction = isFunction;


    if (! Array.isArray) {
        Array.isArray = function (a) {
            return Object.prototype.toString.call(a) === "[object Array]"
        }
    }

    if (! Date.now) { //获取时间戳
        Date.now = function() { return new Date().getTime(); }
    }

    window.getWeekName = global.getWeekName = function() {
        var now = new Date();
        return weeks[now.getDay()];
    };

    // 日期加减天数
    window.addDate = global.addDate = function(oldDate, days) {
        var newDate = new Date(oldDate);
        newDate.setDate(newDate.getDate() + days);
        return newDate;
    };

    window.getFormatDate = global.getFormatDate = function(fmt, d) {
        var now = new Date();
        if (!! d) {
            now = d;
        }

        var o = {
            "M+" : now.getMonth()+1,                 //月份
            "d+" : now.getDate(),                    //日
            "h+" : now.getHours(),                   //小时
            "m+" : now.getMinutes(),                 //分
            "s+" : now.getSeconds(),                 //秒
            "q+" : Math.floor((now.getMonth()+3)/3), //季度
            "S"  : now.getMilliseconds()             //毫秒
        };

        if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (now.getFullYear()+"").substr(4 - RegExp.$1.length));
        }

        for(var k in o) {
            if(new RegExp("("+ k +")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            }
        }

        return fmt;
    };

    window.getDayNum = global.getDayNum = function(nowDate) {
        return new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, 0).getDate();
    };

    //秒转化成 时分秒
    window.secondToDate = global.secondToDate = function (result) {
        var h = Math.floor(result / 3600);
        var m = Math.floor((result / 60 % 60));
        var s = Math.floor((result % 60));
        if (h > 0) {
            return result = h + "小时" + m + "分钟" + s + "秒";
        } else {
            return result = m + "分钟" + s + "秒";
        }
    };


    /**
     * [unique 数组去重]
     * @param  {[type]} arr [description]
     * @return {[type]}     [description]
     */
    window.unique = global.unique = function(arr) {
        var result = [], hash = {};
        for (var i = 0, elem; (elem = arr[i]) != null; i++) {
            if (!hash[elem]) {
                result.push(elem);
                hash[elem] = true;
            }
        }
        return result;
    };

    var forbidOperate = function (e) {
        var ev = e || window.event;
        var obj = ev.target || ev.srcElement;
        var t = obj.type || obj.getAttribute('type');
        var vReadOnly = obj.getAttribute('readonly');
        var vEnabled = obj.getAttribute('enabled');
        vReadOnly = (vReadOnly == null) ? false : vReadOnly;
        vEnabled = (vEnabled == null) ? true : vEnabled;
        var flag1 = (ev.keyCode == 8 && (t == "password" || t == "text" || t == "textarea") && (vReadOnly || vEnabled != true))  ? true : false;
        if(flag1) {
            return false;
        }
        var flag2 = (ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea") ? true : false;
        if(flag2) {
            return false;
        }
    };

    window.forbidBackSpace = global.forbidBackSpace = function() {
        document.onkeypress = forbidOperate;
        //IE禁止使用回退键
        document.onkeydown = forbidOperate;
    };

    window.clearObj = global.clearObj = function(obj) {
        var newObj = {};
        for (var key in obj) {
            newObj[key] = "";
        }

        return newObj;
    };

    window.JsonToParam = global.JsonToParam = function(jsonObj) {
        var temp = [];
        for (var key in jsonObj) {
            temp.push(key + "=" + jsonObj[key]);
        }

        return temp.join("&");
    };

    /**
     * 阻止事件冒泡 (IE)
     */
    window.pvdf = global.pvdf = function() {
        window.event && (window.event.cancelBubble = true); 
    };

    window.releaseVMEvents = global.releaseVMEvents = function(vm) {
        if (!vm || !vm.$events) {
            return;
        }

        var events = vm.$events;
        for (var prop in events) {
            if (Array.isArray(events[prop])) {
                events[prop].length = 0;
            }
            delete events[prop];
        }
    };

    /**
     * jquery deferred object to ES6 promise
     */
    window.usePromise = global.usePromise = function(deferred) {
        return new Promise(function(resolve, reject) {
            deferred.done(data => {
                resolve(data)
            })
            deferred.fail(e => {
                reject(e)
            })
        })
    }


     var add0 = function (m){
         return m<10?'0'+m:m 
     }
   
    window.timeFormat = function(timestamp){
        //timestamp是整数，否则要parseInt转换,不会出现少个0的情况
        var time = new Date(timestamp);
        var year = time.getFullYear();
        var month = time.getMonth()+1;
        var date = time.getDate();
        /*var hours = time.getHours();
        var minutes = time.getMinutes();
        var seconds = time.getSeconds();*/
        return year+'-'+add0(month)+'-'+add0(date);
    }

    window.copyObj = function(obj) {
　　　　var obj1 = {};
　　　　for (var i in obj) {
　　　　　　obj1[i] = obj[i];
　　　　}
　　　　return obj1;
    }

}