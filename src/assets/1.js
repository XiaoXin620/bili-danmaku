/*!
 * Bilibili Player Danmaku Websocket Component v1.4.3 (32)
 * 
 * Copyright 2016 - 2020 Bilibili, Inc.
 * Released in Fri Nov 27 2020 15:45:21 GMT+0800 (China Standard Time)
 */

! function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.DanmakuWebSocket = t() : e.DanmakuWebSocket = t()
}("undefined" != typeof self ? self : this, function() {
    return function(e) {
        function t(i) {
            if (n[i]) return n[i].exports;
            var o = n[i] = {
                i: i,
                l: !1,
                exports: {}
            };
            return e[i].call(o.exports, o, o.exports, t), o.l = !0, o.exports
        }
        var n = {};
        return t.m = e, t.c = n, t.d = function(e, n, i) {
            t.o(e, n) || Object.defineProperty(e, n, {
                configurable: !1,
                enumerable: !0,
                get: i
            })
        }, t.n = function(e) {
            var n = e && e.__esModule ? function() {
                return e.default
            } : function() {
                return e
            };
            return t.d(n, "a", n), n
        }, t.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, t.p = "", t(t.s = 1)
    }([function(e, t, n) {
        "use strict";
        var i = {
            WS_OP_HEARTBEAT: 2,
            WS_OP_HEARTBEAT_REPLY: 3,
            WS_OP_MESSAGE: 5,
            WS_OP_USER_AUTHENTICATION: 7,
            WS_OP_CONNECT_SUCCESS: 8,
            WS_PACKAGE_HEADER_TOTAL_LENGTH: 16,
            WS_PACKAGE_OFFSET: 0,
            WS_HEADER_OFFSET: 4,
            WS_VERSION_OFFSET: 6,
            WS_OPERATION_OFFSET: 8,
            WS_SEQUENCE_OFFSET: 12,
            WS_BODY_PROTOCOL_VERSION_NORMAL: 0,
            WS_BODY_PROTOCOL_VERSION_DEFLATE: 2,
            WS_HEADER_DEFAULT_VERSION: 1,
            WS_HEADER_DEFAULT_OPERATION: 1,
            WS_HEADER_DEFAULT_SEQUENCE: 1,
            WS_AUTH_OK: 0,
            WS_AUTH_TOKEN_ERROR: -101
        };
        t.a = i
    }, function(e, t, n) {
        var i = n(2).default;
        e.exports = i
    }, function(e, t, n) {
        "use strict";

        function i(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = n(3),
            r = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var i = t[n];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                    }
                }
                return function(t, n, i) {
                    return n && e(t.prototype, n), i && e(t, i), t
                }
            }(),
            a = function() {
                function e(t) {
                    return i(this, e), "development" === e.CONFIG.bundleType && (console.clear(), console.dir(e.CONFIG)), this.initialize(t)
                }
                return e.prototype.initialize = function(t) {
                    return "development" === e.CONFIG.bundleType && console.log("App Initialized."), this.ws = new o.a(t), this.getReturn()
                }, e.prototype.getReturn = function() {
                    return "development" === e.CONFIG.bundleType ? this : {
                        destroy: this.destroy.bind(this),
                        send: this.send.bind(this),
                        getAuthInfo: this.getAuthInfo.bind(this),
                        getRetryCount: this.getRetryCount.bind(this)
                    }
                }, e.prototype.destroy = function() {
                    this.ws && this.ws.destroy()
                }, e.prototype.send = function(e) {
                    this.ws && this.ws.send(e)
                }, e.prototype.getAuthInfo = function() {
                    return this.ws && this.ws.getAuthInfo()
                }, e.prototype.getRetryCount = function() {
                    return this.ws && this.ws.getRetryCount()
                }, r(e, null, [{
                    key: "CONFIG",
                    get: function() {
                        return {
                            version: "1.4.3",
                            gitHash: "bf68b6a8",
                            build: "32",
                            bundleType: "release"
                        }
                    }
                }]), e
            }();
        t.default = a
    }, function(e, t, n) {
        "use strict";

        function i(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        var o = n(0),
            r = n(4),
            a = n(5),
            s = n(6).inflate,
            u = function() {
                function e(t) {
                    if (i(this, e), e.checkOptions(t)) {
                        var n = {
                            url: "",
                            urlList: [],
                            rid: 0,
                            aid: 0,
                            uid: 0,
                            from: -1,
                            retry: !0,
                            retryMaxCount: 0,
                            retryInterval: 5,
                            retryThreadCount: 10,
                            connectTimeout: 5e3,
                            retryConnectCount: 3,
                            retryconnectTimeout: 1e4,
                            retryRoundInterval: Math.floor(2 * Math.random()) + 3,
                            customAuthParam: [],
                            fallback: function() {},
                            heartBeatInterval: 30,
                            onReceivedMessage: function() {},
                            onReceiveAuthRes: function() {},
                            onHeartBeatReply: function() {},
                            onInitialized: function() {},
                            onOpen: function() {},
                            onClose: function() {},
                            onError: function() {},
                            onListConnectError: function() {}
                        };
                        this.options = a.a.extend({}, n, t), this.wsBinaryHeaderList = a.a.extend([], r.a), this.authInfo = {
                            origin: "",
                            encode: ""
                        }, 0 !== this.options.urlList.length && 0 !== this.options.retryMaxCount && this.options.retryMaxCount < this.options.urlList.length && (this.options.retryMaxCount = this.options.urlList.length - 1), this.state = {
                            retryCount: 0,
                            listConnectFinishedCount: 0,
                            index: 0,
                            connectTimeoutTimes: 0
                        }, this.callbackQueueList = {
                            onInitializedQueue: [],
                            onOpenQueue: [],
                            onCloseQueue: [],
                            onErrorQueue: [],
                            onReceivedMessageQueue: [],
                            onHeartBeatReplyQueue: [],
                            onRetryFallbackQueue: [],
                            onListConnectErrorQueue: [],
                            onReceiveAuthResQueue: []
                        }, this.HEART_BEAT_INTERVAL = 0, this.CONNECT_TIMEOUT = 0, this.mixinCallback().initialize(this.options.urlList.length > 0 ? this.options.urlList[0] : this.options.url)
                    }
                }
                return e.prototype.initialize = function(e) {
                    var t = this,
                        n = "MozWebSocket" in window ? window.MozWebSocket : window.WebSocket,
                        i = this.options;
                    try {
                        this.ws = new n(e), this.ws.binaryType = "arraybuffer", this.ws.onopen = this.onOpen.bind(this), this.ws.onmessage = this.onMessage.bind(this), this.ws.onclose = this.onClose.bind(this), this.ws.onerror = this.onError.bind(this), a.a.callFunction(this.callbackQueueList.onInitializedQueue), this.callbackQueueList.onInitializedQueue = [];
                        var o = this.state.connectTimeoutTimes >= 3 ? i.retryconnectTimeout : i.connectTimeout;
                        this.CONNECT_TIMEOUT = setTimeout(function() {
                            t.state.connectTimeoutTimes += 1, console.error("connect timeout ", t.state.connectTimeoutTimes), t.ws.close()
                        }, o)
                    } catch (e) {
                        "function" == typeof i.fallback && i.fallback()
                    }
                    return this
                }, e.prototype.onOpen = function() {
                    return a.a.callFunction(this.callbackQueueList.onOpenQueue), this.state.connectTimeoutTimes = 0, this.CONNECT_TIMEOUT && clearTimeout(this.CONNECT_TIMEOUT), this.userAuthentication(), this
                }, e.prototype.userAuthentication = function() {
                    var e = this,
                        t = this.options,
                        n = {
                            uid: parseInt(t.uid, 10),
                            roomid: parseInt(t.rid, 10),
                            protover: parseInt(t.protover, 10) || o.a.WS_BODY_PROTOCOL_VERSION_NORMAL
                        },
                        i = "";
                    t.aid && (n.aid = parseInt(t.aid, 10)), t.from > 0 && (n.from = parseInt(t.from, 10) || 7);
                    for (var r = 0; r < t.customAuthParam.length; r++) {
                        var a = t.customAuthParam[r],
                            s = a.type || "string";
                        switch (void 0 !== n[a.key] && console.error("Token has the same key already! 【" + a.key + "】"), a.key.toString() && a.value.toString() || console.error("Invalid customAuthParam, missing key or value! 【" + a.key + "】-【" + a.value + "】"), s) {
                            case "string":
                                n[a.key] = a.value;
                                break;
                            case "number":
                                n[a.key] = parseInt(a.value, 10);
                                break;
                            case "boolean":
                                n[a.key] = !!n[a.value];
                                break;
                            default:
                                return void console.error("Unsupported customAuthParam type!【" + s + "】")
                        }
                    }
                    i = this.convertToArrayBuffer(JSON.stringify(n), o.a.WS_OP_USER_AUTHENTICATION), this.authInfo.origin = n, this.authInfo.encode = i, setTimeout(function() {
                        e.ws.send(i)
                    }, 0)
                }, e.prototype.getAuthInfo = function() {
                    return this.authInfo
                }, e.prototype.heartBeat = function() {
                    var e = this;
                    clearTimeout(this.HEART_BEAT_INTERVAL);
                    var t = this.convertToArrayBuffer({}, o.a.WS_OP_HEARTBEAT);
                    this.ws.send(t), this.HEART_BEAT_INTERVAL = setTimeout(function() {
                        e.heartBeat()
                    }, 1e3 * this.options.heartBeatInterval)
                }, e.prototype.onMessage = function(e) {
                    var t = this;
                    try {
                        var n = this.convertToObject(e.data);
                        if (n instanceof Array) n.forEach(function(e) {
                            t.onMessage(e)
                        });
                        else if (n instanceof Object) switch (n.op) {
                            case o.a.WS_OP_HEARTBEAT_REPLY:
                                this.onHeartBeatReply(n.body);
                                break;
                            case o.a.WS_OP_MESSAGE:
                                this.onMessageReply(n.body, n.seq);
                                break;
                            case o.a.WS_OP_CONNECT_SUCCESS:
                                if (0 !== n.body.length && n.body[0]) switch (n.body[0].code) {
                                    case o.a.WS_AUTH_OK:
                                        this.heartBeat();
                                        break;
                                    case o.a.WS_AUTH_TOKEN_ERROR:
                                        this.options.retry = !1, "function" == typeof this.options.onReceiveAuthRes && this.options.onReceiveAuthRes(n.body);
                                        break;
                                    default:
                                        this.onClose()
                                } else this.heartBeat()
                        }
                    } catch (e) {
                        console.error("WebSocket Error: ", e)
                    }
                    return this
                }, e.prototype.onMessageReply = function(e, t) {
                    var n = this;
                    try {
                        e instanceof Array ? e.forEach(function(e) {
                            n.onMessageReply(e, t)
                        }) : e instanceof Object && "function" == typeof this.options.onReceivedMessage && this.options.onReceivedMessage(e, t)
                    } catch (e) {
                        console.error("On Message Resolve Error: ", e)
                    }
                }, e.prototype.onHeartBeatReply = function(e) {
                    a.a.callFunction(this.callbackQueueList.onHeartBeatReplyQueue, e)
                }, e.prototype.onClose = function() {
                    var e = this,
                        t = this.options.urlList.length;
                    return a.a.callFunction(this.callbackQueueList.onCloseQueue), clearTimeout(this.HEART_BEAT_INTERVAL), this.options.retry ? (this.checkRetryState() ? setTimeout(function() {
                        console.error("Danmaku Websocket Retry .", e.state.retryCount), e.state.index += 1, 0 === t || e.state.retryCount > e.options.retryThreadCount ? setTimeout(function() {
                            e.initialize(e.options.url)
                        }, 1e3 * e.options.retryRoundInterval) : 0 !== t && e.state.index > t - 1 ? (e.state.index = 0, e.state.listConnectFinishedCount += 1, 1 === e.state.listConnectFinishedCount && a.a.callFunction(e.callbackQueueList.onListConnectErrorQueue), setTimeout(function() {
                            e.initialize(e.options.urlList[e.state.index])
                        }, 1e3 * e.options.retryRoundInterval)) : e.initialize(e.options.urlList[e.state.index])
                    }, 1e3 * this.options.retryInterval) : (console.error("Danmaku Websocket Retry Failed."), a.a.callFunction(this.callbackQueueList.onRetryFallbackQueue)), this) : this
                }, e.prototype.onError = function(e) {
                    return console.error("Danmaku Websocket On Error.", e), a.a.callFunction(this.callbackQueueList.onErrorQueue, e), this
                }, e.prototype.destroy = function() {
                    this.HEART_BEAT_INTERVAL && clearTimeout(this.HEART_BEAT_INTERVAL), this.CONNECT_TIMEOUT && clearTimeout(this.CONNECT_TIMEOUT), this.options.retry = !1, this.ws && this.ws.close(), this.ws = null
                }, e.prototype.convertToArrayBuffer = function(e, t) {
                    this.encoder || (this.encoder = a.a.getEncoder());
                    var n = new ArrayBuffer(o.a.WS_PACKAGE_HEADER_TOTAL_LENGTH),
                        i = new DataView(n, o.a.WS_PACKAGE_OFFSET),
                        r = this.encoder.encode(e);
                    return i.setInt32(o.a.WS_PACKAGE_OFFSET, o.a.WS_PACKAGE_HEADER_TOTAL_LENGTH + r.byteLength), this.wsBinaryHeaderList[2].value = t, this.wsBinaryHeaderList.forEach(function(e) {
                        4 === e.bytes ? i.setInt32(e.offset, e.value) : 2 === e.bytes && i.setInt16(e.offset, e.value)
                    }), a.a.mergeArrayBuffer(n, r)
                }, e.prototype.convertToObject = function(e) {
                    var t = new DataView(e),
                        n = {
                            body: []
                        };
                    if (n.packetLen = t.getInt32(o.a.WS_PACKAGE_OFFSET), this.wsBinaryHeaderList.forEach(function(e) {
                            4 === e.bytes ? n[e.key] = t.getInt32(e.offset) : 2 === e.bytes && (n[e.key] = t.getInt16(e.offset))
                        }), n.packetLen < e.byteLength && this.convertToObject(e.slice(0, n.packetLen)), this.decoder || (this.decoder = a.a.getDecoder()), !n.op || o.a.WS_OP_MESSAGE !== n.op && n.op !== o.a.WS_OP_CONNECT_SUCCESS) n.op && o.a.WS_OP_HEARTBEAT_REPLY === n.op && (n.body = {
                        count: t.getInt32(o.a.WS_PACKAGE_HEADER_TOTAL_LENGTH)
                    });
                    else
                        for (var i = o.a.WS_PACKAGE_OFFSET, r = n.packetLen, u = "", c = ""; i < e.byteLength; i += r) {
                            r = t.getInt32(i), u = t.getInt16(i + o.a.WS_HEADER_OFFSET);
                            try {
                                if (n.ver === o.a.WS_BODY_PROTOCOL_VERSION_DEFLATE) {
                                    var l = e.slice(i + u, i + r),
                                        f = s(new Uint8Array(l));
                                    c = this.convertToObject(f.buffer).body
                                } else {
                                    var h = this.decoder.decode(e.slice(i + u, i + r));
                                    c = 0 !== h.length ? JSON.parse(h) : null
                                }
                                c && n.body.push(c)
                            } catch (t) {
                                console.error("decode body error:", new Uint8Array(e), n, t)
                            }
                        }
                    return n
                }, e.prototype.send = function(e) {
                    this.ws && this.ws.send(e)
                }, e.prototype.addCallback = function(e, t) {
                    return "function" == typeof e && t instanceof Array && t.push(e), this
                }, e.prototype.mixinCallback = function() {
                    var e = this.options,
                        t = this.callbackQueueList;
                    return this.addCallback(e.onReceivedMessage, t.onReceivedMessageQueue).addCallback(e.onHeartBeatReply, t.onHeartBeatReplyQueue).addCallback(e.onInitialized, t.onInitializedQueue).addCallback(e.onOpen, t.onOpenQueue).addCallback(e.onClose, t.onCloseQueue).addCallback(e.onError, t.onErrorQueue).addCallback(e.onRetryFallback, t.onRetryFallbackQueue).addCallback(e.onListConnectError, t.onListConnectErrorQueue).addCallback(e.onReceiveAuthRes, t.onReceiveAuthResQueue), this
                }, e.prototype.getRetryCount = function() {
                    return this.state.retryCount
                }, e.prototype.checkRetryState = function() {
                    var e = this.options,
                        t = !1;
                    return (0 === e.retryMaxCount || this.state.retryCount < e.retryMaxCount) && (this.state.retryCount += 1, t = !0), t
                }, e.checkOptions = function(e) {
                    return e || e instanceof Object ? e.url ? !!e.rid || (console.error("WebSocket Initialize options rid(cid) missing."), !1) : (console.error("WebSocket Initialize options url missing."), !1) : (console.error("WebSocket Initialize options missing or error.", e), !1)
                }, e
            }();
        t.a = u
    }, function(e, t, n) {
        "use strict";
        var i = n(0),
            o = [{
                name: "Header Length",
                key: "headerLen",
                bytes: 2,
                offset: i.a.WS_HEADER_OFFSET,
                value: i.a.WS_PACKAGE_HEADER_TOTAL_LENGTH
            }, {
                name: "Protocol Version",
                key: "ver",
                bytes: 2,
                offset: i.a.WS_VERSION_OFFSET,
                value: i.a.WS_HEADER_DEFAULT_VERSION
            }, {
                name: "Operation",
                key: "op",
                bytes: 4,
                offset: i.a.WS_OPERATION_OFFSET,
                value: i.a.WS_HEADER_DEFAULT_OPERATION
            }, {
                name: "Sequence Id",
                key: "seq",
                bytes: 4,
                offset: i.a.WS_SEQUENCE_OFFSET,
                value: i.a.WS_HEADER_DEFAULT_SEQUENCE
            }];
        t.a = o
    }, function(e, t, n) {
        "use strict";
        var i = {
            getDecoder: function() {
                return window.TextDecoder ? new window.TextDecoder : {
                    decode: function(e) {
                        return decodeURIComponent(window.escape(String.fromCharCode.apply(String, new Uint8Array(e))))
                    }
                }
            },
            getEncoder: function() {
                return window.TextEncoder ? new window.TextEncoder : {
                    encode: function(e) {
                        for (var t = new ArrayBuffer(e.length), n = new Uint8Array(t), i = 0, o = e.length; i < o; i++) n[i] = e.charCodeAt(i);
                        return t
                    }
                }
            },
            mergeArrayBuffer: function(e, t) {
                var n = new Uint8Array(e),
                    i = new Uint8Array(t),
                    o = new Uint8Array(n.byteLength + i.byteLength);
                return o.set(n, 0), o.set(i, n.byteLength), o.buffer
            },
            callFunction: function(e, t) {
                return e instanceof Array && e.length ? (e.forEach(function(e) {
                    return "function" == typeof e && e(t)
                }), null) : "function" == typeof e && e(t)
            },
            extend: function(e) {
                for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) n[i - 1] = arguments[i];
                var o = e || {};
                return o instanceof Object && n.forEach(function(e) {
                    e instanceof Object && Object.keys(e).forEach(function(t) {
                        o[t] = e[t]
                    })
                }), o
            }
        };
        t.a = i
    }, function(e, t, n) {
        var i, i;
        ! function(t) {
            e.exports = t()
        }(function() {
            return function e(t, n, o) {
                function r(s, u) {
                    if (!n[s]) {
                        if (!t[s]) {
                            var c = "function" == typeof i && i;
                            if (!u && c) return i(s, !0);
                            if (a) return a(s, !0);
                            var l = new Error("Cannot find module '" + s + "'");
                            throw l.code = "MODULE_NOT_FOUND", l
                        }
                        var f = n[s] = {
                            exports: {}
                        };
                        t[s][0].call(f.exports, function(e) {
                            return r(t[s][1][e] || e)
                        }, f, f.exports, e, t, n, o)
                    }
                    return n[s].exports
                }
                for (var a = "function" == typeof i && i, s = 0; s < o.length; s++) r(o[s]);
                return r
            }({
                1: [function(e, t, n) {
                    "use strict";
                    var i = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
                    n.assign = function(e) {
                        for (var t, n, i = Array.prototype.slice.call(arguments, 1); i.length;) {
                            var o = i.shift();
                            if (o) {
                                if ("object" != typeof o) throw new TypeError(o + "must be non-object");
                                for (var r in o) t = o, n = r, Object.prototype.hasOwnProperty.call(t, n) && (e[r] = o[r])
                            }
                        }
                        return e
                    }, n.shrinkBuf = function(e, t) {
                        return e.length === t ? e : e.subarray ? e.subarray(0, t) : (e.length = t, e)
                    };
                    var o = {
                            arraySet: function(e, t, n, i, o) {
                                if (t.subarray && e.subarray) e.set(t.subarray(n, n + i), o);
                                else
                                    for (var r = 0; r < i; r++) e[o + r] = t[n + r]
                            },
                            flattenChunks: function(e) {
                                var t, n, i, o, r, a;
                                for (t = i = 0, n = e.length; t < n; t++) i += e[t].length;
                                for (a = new Uint8Array(i), t = o = 0, n = e.length; t < n; t++) r = e[t], a.set(r, o), o += r.length;
                                return a
                            }
                        },
                        r = {
                            arraySet: function(e, t, n, i, o) {
                                for (var r = 0; r < i; r++) e[o + r] = t[n + r]
                            },
                            flattenChunks: function(e) {
                                return [].concat.apply([], e)
                            }
                        };
                    n.setTyped = function(e) {
                        e ? (n.Buf8 = Uint8Array, n.Buf16 = Uint16Array, n.Buf32 = Int32Array, n.assign(n, o)) : (n.Buf8 = Array, n.Buf16 = Array, n.Buf32 = Array, n.assign(n, r))
                    }, n.setTyped(i)
                }, {}],
                2: [function(e, t, n) {
                    "use strict";

                    function i(e, t) {
                        if (t < 65534 && (e.subarray && a || !e.subarray && r)) return String.fromCharCode.apply(null, o.shrinkBuf(e, t));
                        for (var n = "", i = 0; i < t; i++) n += String.fromCharCode(e[i]);
                        return n
                    }
                    var o = e("./common"),
                        r = !0,
                        a = !0;
                    try {
                        String.fromCharCode.apply(null, [0])
                    } catch (e) {
                        r = !1
                    }
                    try {
                        String.fromCharCode.apply(null, new Uint8Array(1))
                    } catch (e) {
                        a = !1
                    }
                    for (var s = new o.Buf8(256), u = 0; u < 256; u++) s[u] = 252 <= u ? 6 : 248 <= u ? 5 : 240 <= u ? 4 : 224 <= u ? 3 : 192 <= u ? 2 : 1;
                    s[254] = s[254] = 1, n.string2buf = function(e) {
                        var t, n, i, r, a, s = e.length,
                            u = 0;
                        for (r = 0; r < s; r++) 55296 == (64512 & (n = e.charCodeAt(r))) && r + 1 < s && 56320 == (64512 & (i = e.charCodeAt(r + 1))) && (n = 65536 + (n - 55296 << 10) + (i - 56320), r++), u += n < 128 ? 1 : n < 2048 ? 2 : n < 65536 ? 3 : 4;
                        for (t = new o.Buf8(u), r = a = 0; a < u; r++) 55296 == (64512 & (n = e.charCodeAt(r))) && r + 1 < s && 56320 == (64512 & (i = e.charCodeAt(r + 1))) && (n = 65536 + (n - 55296 << 10) + (i - 56320), r++), t[a++] = n < 128 ? n : (t[a++] = n < 2048 ? 192 | n >>> 6 : (t[a++] = n < 65536 ? 224 | n >>> 12 : (t[a++] = 240 | n >>> 18, 128 | n >>> 12 & 63), 128 | n >>> 6 & 63), 128 | 63 & n);
                        return t
                    }, n.buf2binstring = function(e) {
                        return i(e, e.length)
                    }, n.binstring2buf = function(e) {
                        for (var t = new o.Buf8(e.length), n = 0, i = t.length; n < i; n++) t[n] = e.charCodeAt(n);
                        return t
                    }, n.buf2string = function(e, t) {
                        var n, o, r, a, u = t || e.length,
                            c = new Array(2 * u);
                        for (n = o = 0; n < u;)
                            if ((r = e[n++]) < 128) c[o++] = r;
                            else if (4 < (a = s[r])) c[o++] = 65533, n += a - 1;
                        else {
                            for (r &= 2 === a ? 31 : 3 === a ? 15 : 7; 1 < a && n < u;) r = r << 6 | 63 & e[n++], a--;
                            c[o++] = 1 < a ? 65533 : r < 65536 ? r : (r -= 65536, c[o++] = 55296 | r >> 10 & 1023, 56320 | 1023 & r)
                        }
                        return i(c, o)
                    }, n.utf8border = function(e, t) {
                        var n;
                        for ((t = t || e.length) > e.length && (t = e.length), n = t - 1; 0 <= n && 128 == (192 & e[n]);) n--;
                        return n < 0 ? t : 0 === n ? t : n + s[e[n]] > t ? n : t
                    }
                }, {
                    "./common": 1
                }],
                3: [function(e, t, n) {
                    "use strict";
                    t.exports = function(e, t, n, i) {
                        for (var o = 65535 & e | 0, r = e >>> 16 & 65535 | 0, a = 0; 0 !== n;) {
                            for (n -= a = 2e3 < n ? 2e3 : n; r = r + (o = o + t[i++] | 0) | 0, --a;);
                            o %= 65521, r %= 65521
                        }
                        return o | r << 16 | 0
                    }
                }, {}],
                4: [function(e, t, n) {
                    "use strict";
                    t.exports = {
                        Z_NO_FLUSH: 0,
                        Z_PARTIAL_FLUSH: 1,
                        Z_SYNC_FLUSH: 2,
                        Z_FULL_FLUSH: 3,
                        Z_FINISH: 4,
                        Z_BLOCK: 5,
                        Z_TREES: 6,
                        Z_OK: 0,
                        Z_STREAM_END: 1,
                        Z_NEED_DICT: 2,
                        Z_ERRNO: -1,
                        Z_STREAM_ERROR: -2,
                        Z_DATA_ERROR: -3,
                        Z_BUF_ERROR: -5,
                        Z_NO_COMPRESSION: 0,
                        Z_BEST_SPEED: 1,
                        Z_BEST_COMPRESSION: 9,
                        Z_DEFAULT_COMPRESSION: -1,
                        Z_FILTERED: 1,
                        Z_HUFFMAN_ONLY: 2,
                        Z_RLE: 3,
                        Z_FIXED: 4,
                        Z_DEFAULT_STRATEGY: 0,
                        Z_BINARY: 0,
                        Z_TEXT: 1,
                        Z_UNKNOWN: 2,
                        Z_DEFLATED: 8
                    }
                }, {}],
                5: [function(e, t, n) {
                    "use strict";
                    var i = function() {
                        for (var e, t = [], n = 0; n < 256; n++) {
                            e = n;
                            for (var i = 0; i < 8; i++) e = 1 & e ? 3988292384 ^ e >>> 1 : e >>> 1;
                            t[n] = e
                        }
                        return t
                    }();
                    t.exports = function(e, t, n, o) {
                        var r = i,
                            a = o + n;
                        e ^= -1;
                        for (var s = o; s < a; s++) e = e >>> 8 ^ r[255 & (e ^ t[s])];
                        return -1 ^ e
                    }
                }, {}],
                6: [function(e, t, n) {
                    "use strict";
                    t.exports = function() {
                        this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1
                    }
                }, {}],
                7: [function(e, t, n) {
                    "use strict";
                    t.exports = function(e, t) {
                        var n, i, o, r, a, s, u, c, l, f, h, d, b, _, p, y, m, w, k, E, g, v, T, A, S;
                        n = e.state, i = e.next_in, A = e.input, o = i + (e.avail_in - 5), r = e.next_out, S = e.output, a = r - (t - e.avail_out), s = r + (e.avail_out - 257), u = n.dmax, c = n.wsize, l = n.whave, f = n.wnext, h = n.window, d = n.hold, b = n.bits, _ = n.lencode, p = n.distcode, y = (1 << n.lenbits) - 1, m = (1 << n.distbits) - 1;
                        e: do {
                            b < 15 && (d += A[i++] << b, b += 8, d += A[i++] << b, b += 8), w = _[d & y];
                            t: for (;;) {
                                if (d >>>= k = w >>> 24, b -= k, 0 == (k = w >>> 16 & 255)) S[r++] = 65535 & w;
                                else {
                                    if (!(16 & k)) {
                                        if (0 == (64 & k)) {
                                            w = _[(65535 & w) + (d & (1 << k) - 1)];
                                            continue t
                                        }
                                        if (32 & k) {
                                            n.mode = 12;
                                            break e
                                        }
                                        e.msg = "invalid literal/length code", n.mode = 30;
                                        break e
                                    }
                                    E = 65535 & w, (k &= 15) && (b < k && (d += A[i++] << b, b += 8), E += d & (1 << k) - 1, d >>>= k, b -= k), b < 15 && (d += A[i++] << b, b += 8, d += A[i++] << b, b += 8), w = p[d & m];
                                    n: for (;;) {
                                        if (d >>>= k = w >>> 24, b -= k, !(16 & (k = w >>> 16 & 255))) {
                                            if (0 == (64 & k)) {
                                                w = p[(65535 & w) + (d & (1 << k) - 1)];
                                                continue n
                                            }
                                            e.msg = "invalid distance code", n.mode = 30;
                                            break e
                                        }
                                        if (g = 65535 & w, b < (k &= 15) && (d += A[i++] << b, (b += 8) < k && (d += A[i++] << b, b += 8)), u < (g += d & (1 << k) - 1)) {
                                            e.msg = "invalid distance too far back", n.mode = 30;
                                            break e
                                        }
                                        if (d >>>= k, b -= k, (k = r - a) < g) {
                                            if (l < (k = g - k) && n.sane) {
                                                e.msg = "invalid distance too far back", n.mode = 30;
                                                break e
                                            }
                                            if (T = h, (v = 0) === f) {
                                                if (v += c - k, k < E) {
                                                    for (E -= k; S[r++] = h[v++], --k;);
                                                    v = r - g, T = S
                                                }
                                            } else if (f < k) {
                                                if (v += c + f - k, (k -= f) < E) {
                                                    for (E -= k; S[r++] = h[v++], --k;);
                                                    if (v = 0, f < E) {
                                                        for (E -= k = f; S[r++] = h[v++], --k;);
                                                        v = r - g, T = S
                                                    }
                                                }
                                            } else if (v += f - k, k < E) {
                                                for (E -= k; S[r++] = h[v++], --k;);
                                                v = r - g, T = S
                                            }
                                            for (; 2 < E;) S[r++] = T[v++], S[r++] = T[v++], S[r++] = T[v++], E -= 3;
                                            E && (S[r++] = T[v++], 1 < E && (S[r++] = T[v++]))
                                        } else {
                                            for (v = r - g; S[r++] = S[v++], S[r++] = S[v++], S[r++] = S[v++], 2 < (E -= 3););
                                            E && (S[r++] = S[v++], 1 < E && (S[r++] = S[v++]))
                                        }
                                        break
                                    }
                                }
                                break
                            }
                        } while (i < o && r < s);
                        i -= E = b >> 3, d &= (1 << (b -= E << 3)) - 1, e.next_in = i, e.next_out = r, e.avail_in = i < o ? o - i + 5 : 5 - (i - o), e.avail_out = r < s ? s - r + 257 : 257 - (r - s), n.hold = d, n.bits = b
                    }
                }, {}],
                8: [function(e, t, n) {
                    "use strict";

                    function i(e) {
                        return (e >>> 24 & 255) + (e >>> 8 & 65280) + ((65280 & e) << 8) + ((255 & e) << 24)
                    }

                    function o() {
                        this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new d.Buf16(320), this.work = new d.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0
                    }

                    function r(e) {
                        var t;
                        return e && e.state ? (t = e.state, e.total_in = e.total_out = t.total = 0, e.msg = "", t.wrap && (e.adler = 1 & t.wrap), t.mode = g, t.last = 0, t.havedict = 0, t.dmax = 32768, t.head = null, t.hold = 0, t.bits = 0, t.lencode = t.lendyn = new d.Buf32(v), t.distcode = t.distdyn = new d.Buf32(T), t.sane = 1, t.back = -1, k) : E
                    }

                    function a(e) {
                        var t;
                        return e && e.state ? ((t = e.state).wsize = 0, t.whave = 0, t.wnext = 0, r(e)) : E
                    }

                    function s(e, t) {
                        var n, i;
                        return e && e.state ? (i = e.state, t < 0 ? (n = 0, t = -t) : (n = 1 + (t >> 4), t < 48 && (t &= 15)), t && (t < 8 || 15 < t) ? E : (null !== i.window && i.wbits !== t && (i.window = null), i.wrap = n, i.wbits = t, a(e))) : E
                    }

                    function u(e, t) {
                        var n, i;
                        return e ? (i = new o, (e.state = i).window = null, (n = s(e, t)) !== k && (e.state = null), n) : E
                    }

                    function c(e) {
                        if (A) {
                            var t;
                            for (f = new d.Buf32(512), h = new d.Buf32(32), t = 0; t < 144;) e.lens[t++] = 8;
                            for (; t < 256;) e.lens[t++] = 9;
                            for (; t < 280;) e.lens[t++] = 7;
                            for (; t < 288;) e.lens[t++] = 8;
                            for (y(m, e.lens, 0, 288, f, 0, e.work, {
                                    bits: 9
                                }), t = 0; t < 32;) e.lens[t++] = 5;
                            y(w, e.lens, 0, 32, h, 0, e.work, {
                                bits: 5
                            }), A = !1
                        }
                        e.lencode = f, e.lenbits = 9, e.distcode = h, e.distbits = 5
                    }

                    function l(e, t, n, i) {
                        var o, r = e.state;
                        return null === r.window && (r.wsize = 1 << r.wbits, r.wnext = 0, r.whave = 0, r.window = new d.Buf8(r.wsize)), i >= r.wsize ? (d.arraySet(r.window, t, n - r.wsize, r.wsize, 0), r.wnext = 0, r.whave = r.wsize) : (i < (o = r.wsize - r.wnext) && (o = i), d.arraySet(r.window, t, n - i, o, r.wnext), (i -= o) ? (d.arraySet(r.window, t, n - i, i, 0), r.wnext = i, r.whave = r.wsize) : (r.wnext += o, r.wnext === r.wsize && (r.wnext = 0), r.whave < r.wsize && (r.whave += o))), 0
                    }
                    var f, h, d = e("../utils/common"),
                        b = e("./adler32"),
                        _ = e("./crc32"),
                        p = e("./inffast"),
                        y = e("./inftrees"),
                        m = 1,
                        w = 2,
                        k = 0,
                        E = -2,
                        g = 1,
                        v = 852,
                        T = 592,
                        A = !0;
                    n.inflateReset = a, n.inflateReset2 = s, n.inflateResetKeep = r, n.inflateInit = function(e) {
                        return u(e, 15)
                    }, n.inflateInit2 = u, n.inflate = function(e, t) {
                        var n, o, r, a, s, u, f, h, v, T, A, S, O, R, C, x, I, L, N, B, F, H, D, U, W = 0,
                            z = new d.Buf8(4),
                            P = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
                        if (!e || !e.state || !e.output || !e.input && 0 !== e.avail_in) return E;
                        12 === (n = e.state).mode && (n.mode = 13), s = e.next_out, r = e.output, f = e.avail_out, a = e.next_in, o = e.input, u = e.avail_in, h = n.hold, v = n.bits, T = u, A = f, H = k;
                        e: for (;;) switch (n.mode) {
                            case g:
                                if (0 === n.wrap) {
                                    n.mode = 13;
                                    break
                                }
                                for (; v < 16;) {
                                    if (0 === u) break e;
                                    u--, h += o[a++] << v, v += 8
                                }
                                if (2 & n.wrap && 35615 === h) {
                                    z[n.check = 0] = 255 & h, z[1] = h >>> 8 & 255, n.check = _(n.check, z, 2, 0), v = h = 0, n.mode = 2;
                                    break
                                }
                                if (n.flags = 0, n.head && (n.head.done = !1), !(1 & n.wrap) || (((255 & h) << 8) + (h >> 8)) % 31) {
                                    e.msg = "incorrect header check", n.mode = 30;
                                    break
                                }
                                if (8 != (15 & h)) {
                                    e.msg = "unknown compression method", n.mode = 30;
                                    break
                                }
                                if (v -= 4, F = 8 + (15 & (h >>>= 4)), 0 === n.wbits) n.wbits = F;
                                else if (F > n.wbits) {
                                    e.msg = "invalid window size", n.mode = 30;
                                    break
                                }
                                n.dmax = 1 << F, e.adler = n.check = 1, n.mode = 512 & h ? 10 : 12, v = h = 0;
                                break;
                            case 2:
                                for (; v < 16;) {
                                    if (0 === u) break e;
                                    u--, h += o[a++] << v, v += 8
                                }
                                if (n.flags = h, 8 != (255 & n.flags)) {
                                    e.msg = "unknown compression method", n.mode = 30;
                                    break
                                }
                                if (57344 & n.flags) {
                                    e.msg = "unknown header flags set", n.mode = 30;
                                    break
                                }
                                n.head && (n.head.text = h >> 8 & 1), 512 & n.flags && (z[0] = 255 & h, z[1] = h >>> 8 & 255, n.check = _(n.check, z, 2, 0)), v = h = 0, n.mode = 3;
                            case 3:
                                for (; v < 32;) {
                                    if (0 === u) break e;
                                    u--, h += o[a++] << v, v += 8
                                }
                                n.head && (n.head.time = h), 512 & n.flags && (z[0] = 255 & h, z[1] = h >>> 8 & 255, z[2] = h >>> 16 & 255, z[3] = h >>> 24 & 255, n.check = _(n.check, z, 4, 0)), v = h = 0, n.mode = 4;
                            case 4:
                                for (; v < 16;) {
                                    if (0 === u) break e;
                                    u--, h += o[a++] << v, v += 8
                                }
                                n.head && (n.head.xflags = 255 & h, n.head.os = h >> 8), 512 & n.flags && (z[0] = 255 & h, z[1] = h >>> 8 & 255, n.check = _(n.check, z, 2, 0)), v = h = 0, n.mode = 5;
                            case 5:
                                if (1024 & n.flags) {
                                    for (; v < 16;) {
                                        if (0 === u) break e;
                                        u--, h += o[a++] << v, v += 8
                                    }
                                    n.length = h, n.head && (n.head.extra_len = h), 512 & n.flags && (z[0] = 255 & h, z[1] = h >>> 8 & 255, n.check = _(n.check, z, 2, 0)), v = h = 0
                                } else n.head && (n.head.extra = null);
                                n.mode = 6;
                            case 6:
                                if (1024 & n.flags && (u < (S = n.length) && (S = u), S && (n.head && (F = n.head.extra_len - n.length, n.head.extra || (n.head.extra = new Array(n.head.extra_len)), d.arraySet(n.head.extra, o, a, S, F)), 512 & n.flags && (n.check = _(n.check, o, S, a)), u -= S, a += S, n.length -= S), n.length)) break e;
                                n.length = 0, n.mode = 7;
                            case 7:
                                if (2048 & n.flags) {
                                    if (0 === u) break e;
                                    for (S = 0; F = o[a + S++], n.head && F && n.length < 65536 && (n.head.name += String.fromCharCode(F)), F && S < u;);
                                    if (512 & n.flags && (n.check = _(n.check, o, S, a)), u -= S, a += S, F) break e
                                } else n.head && (n.head.name = null);
                                n.length = 0, n.mode = 8;
                            case 8:
                                if (4096 & n.flags) {
                                    if (0 === u) break e;
                                    for (S = 0; F = o[a + S++], n.head && F && n.length < 65536 && (n.head.comment += String.fromCharCode(F)), F && S < u;);
                                    if (512 & n.flags && (n.check = _(n.check, o, S, a)), u -= S, a += S, F) break e
                                } else n.head && (n.head.comment = null);
                                n.mode = 9;
                            case 9:
                                if (512 & n.flags) {
                                    for (; v < 16;) {
                                        if (0 === u) break e;
                                        u--, h += o[a++] << v, v += 8
                                    }
                                    if (h !== (65535 & n.check)) {
                                        e.msg = "header crc mismatch", n.mode = 30;
                                        break
                                    }
                                    v = h = 0
                                }
                                n.head && (n.head.hcrc = n.flags >> 9 & 1, n.head.done = !0), e.adler = n.check = 0, n.mode = 12;
                                break;
                            case 10:
                                for (; v < 32;) {
                                    if (0 === u) break e;
                                    u--, h += o[a++] << v, v += 8
                                }
                                e.adler = n.check = i(h), v = h = 0, n.mode = 11;
                            case 11:
                                if (0 === n.havedict) return e.next_out = s, e.avail_out = f, e.next_in = a, e.avail_in = u, n.hold = h, n.bits = v, 2;
                                e.adler = n.check = 1, n.mode = 12;
                            case 12:
                                if (5 === t || 6 === t) break e;
                            case 13:
                                if (n.last) {
                                    h >>>= 7 & v, v -= 7 & v, n.mode = 27;
                                    break
                                }
                                for (; v < 3;) {
                                    if (0 === u) break e;
                                    u--, h += o[a++] << v, v += 8
                                }
                                switch (n.last = 1 & h, v -= 1, 3 & (h >>>= 1)) {
                                    case 0:
                                        n.mode = 14;
                                        break;
                                    case 1:
                                        if (c(n), n.mode = 20, 6 !== t) break;
                                        h >>>= 2, v -= 2;
                                        break e;
                                    case 2:
                                        n.mode = 17;
                                        break;
                                    case 3:
                                        e.msg = "invalid block type", n.mode = 30
                                }
                                h >>>= 2, v -= 2;
                                break;
                            case 14:
                                for (h >>>= 7 & v, v -= 7 & v; v < 32;) {
                                    if (0 === u) break e;
                                    u--, h += o[a++] << v, v += 8
                                }
                                if ((65535 & h) != (h >>> 16 ^ 65535)) {
                                    e.msg = "invalid stored block lengths", n.mode = 30;
                                    break
                                }
                                if (n.length = 65535 & h, v = h = 0, n.mode = 15, 6 === t) break e;
                            case 15:
                                n.mode = 16;
                            case 16:
                                if (S = n.length) {
                                    if (u < S && (S = u), f < S && (S = f), 0 === S) break e;
                                    d.arraySet(r, o, a, S, s), u -= S, a += S, f -= S, s += S, n.length -= S;
                                    break
                                }
                                n.mode = 12;
                                break;
                            case 17:
                                for (; v < 14;) {
                                    if (0 === u) break e;
                                    u--, h += o[a++] << v, v += 8
                                }
                                if (n.nlen = 257 + (31 & h), h >>>= 5, v -= 5, n.ndist = 1 + (31 & h), h >>>= 5, v -= 5, n.ncode = 4 + (15 & h), h >>>= 4, v -= 4, 286 < n.nlen || 30 < n.ndist) {
                                    e.msg = "too many length or distance symbols", n.mode = 30;
                                    break
                                }
                                n.have = 0, n.mode = 18;
                            case 18:
                                for (; n.have < n.ncode;) {
                                    for (; v < 3;) {
                                        if (0 === u) break e;
                                        u--, h += o[a++] << v, v += 8
                                    }
                                    n.lens[P[n.have++]] = 7 & h, h >>>= 3, v -= 3
                                }
                                for (; n.have < 19;) n.lens[P[n.have++]] = 0;
                                if (n.lencode = n.lendyn, n.lenbits = 7, D = {
                                        bits: n.lenbits
                                    }, H = y(0, n.lens, 0, 19, n.lencode, 0, n.work, D), n.lenbits = D.bits, H) {
                                    e.msg = "invalid code lengths set", n.mode = 30;
                                    break
                                }
                                n.have = 0, n.mode = 19;
                            case 19:
                                for (; n.have < n.nlen + n.ndist;) {
                                    for (; x = (W = n.lencode[h & (1 << n.lenbits) - 1]) >>> 16 & 255, I = 65535 & W, !((C = W >>> 24) <= v);) {
                                        if (0 === u) break e;
                                        u--, h += o[a++] << v, v += 8
                                    }
                                    if (I < 16) h >>>= C, v -= C, n.lens[n.have++] = I;
                                    else {
                                        if (16 === I) {
                                            for (U = C + 2; v < U;) {
                                                if (0 === u) break e;
                                                u--, h += o[a++] << v, v += 8
                                            }
                                            if (h >>>= C, v -= C, 0 === n.have) {
                                                e.msg = "invalid bit length repeat", n.mode = 30;
                                                break
                                            }
                                            F = n.lens[n.have - 1], S = 3 + (3 & h), h >>>= 2, v -= 2
                                        } else if (17 === I) {
                                            for (U = C + 3; v < U;) {
                                                if (0 === u) break e;
                                                u--, h += o[a++] << v, v += 8
                                            }
                                            v -= C, F = 0, S = 3 + (7 & (h >>>= C)), h >>>= 3, v -= 3
                                        } else {
                                            for (U = C + 7; v < U;) {
                                                if (0 === u) break e;
                                                u--, h += o[a++] << v, v += 8
                                            }
                                            v -= C, F = 0, S = 11 + (127 & (h >>>= C)), h >>>= 7, v -= 7
                                        }
                                        if (n.have + S > n.nlen + n.ndist) {
                                            e.msg = "invalid bit length repeat", n.mode = 30;
                                            break
                                        }
                                        for (; S--;) n.lens[n.have++] = F
                                    }
                                }
                                if (30 === n.mode) break;
                                if (0 === n.lens[256]) {
                                    e.msg = "invalid code -- missing end-of-block", n.mode = 30;
                                    break
                                }
                                if (n.lenbits = 9, D = {
                                        bits: n.lenbits
                                    }, H = y(m, n.lens, 0, n.nlen, n.lencode, 0, n.work, D), n.lenbits = D.bits, H) {
                                    e.msg = "invalid literal/lengths set", n.mode = 30;
                                    break
                                }
                                if (n.distbits = 6, n.distcode = n.distdyn, D = {
                                        bits: n.distbits
                                    }, H = y(w, n.lens, n.nlen, n.ndist, n.distcode, 0, n.work, D), n.distbits = D.bits, H) {
                                    e.msg = "invalid distances set", n.mode = 30;
                                    break
                                }
                                if (n.mode = 20, 6 === t) break e;
                            case 20:
                                n.mode = 21;
                            case 21:
                                if (6 <= u && 258 <= f) {
                                    e.next_out = s, e.avail_out = f, e.next_in = a, e.avail_in = u, n.hold = h, n.bits = v, p(e, A), s = e.next_out, r = e.output, f = e.avail_out, a = e.next_in, o = e.input, u = e.avail_in, h = n.hold, v = n.bits, 12 === n.mode && (n.back = -1);
                                    break
                                }
                                for (n.back = 0; x = (W = n.lencode[h & (1 << n.lenbits) - 1]) >>> 16 & 255, I = 65535 & W, !((C = W >>> 24) <= v);) {
                                    if (0 === u) break e;
                                    u--, h += o[a++] << v, v += 8
                                }
                                if (x && 0 == (240 & x)) {
                                    for (L = C, N = x, B = I; x = (W = n.lencode[B + ((h & (1 << L + N) - 1) >> L)]) >>> 16 & 255, I = 65535 & W, !(L + (C = W >>> 24) <= v);) {
                                        if (0 === u) break e;
                                        u--, h += o[a++] << v, v += 8
                                    }
                                    h >>>= L, v -= L, n.back += L
                                }
                                if (h >>>= C, v -= C, n.back += C, n.length = I, 0 === x) {
                                    n.mode = 26;
                                    break
                                }
                                if (32 & x) {
                                    n.back = -1, n.mode = 12;
                                    break
                                }
                                if (64 & x) {
                                    e.msg = "invalid literal/length code", n.mode = 30;
                                    break
                                }
                                n.extra = 15 & x, n.mode = 22;
                            case 22:
                                if (n.extra) {
                                    for (U = n.extra; v < U;) {
                                        if (0 === u) break e;
                                        u--, h += o[a++] << v, v += 8
                                    }
                                    n.length += h & (1 << n.extra) - 1, h >>>= n.extra, v -= n.extra, n.back += n.extra
                                }
                                n.was = n.length, n.mode = 23;
                            case 23:
                                for (; x = (W = n.distcode[h & (1 << n.distbits) - 1]) >>> 16 & 255, I = 65535 & W, !((C = W >>> 24) <= v);) {
                                    if (0 === u) break e;
                                    u--, h += o[a++] << v, v += 8
                                }
                                if (0 == (240 & x)) {
                                    for (L = C, N = x, B = I; x = (W = n.distcode[B + ((h & (1 << L + N) - 1) >> L)]) >>> 16 & 255, I = 65535 & W, !(L + (C = W >>> 24) <= v);) {
                                        if (0 === u) break e;
                                        u--, h += o[a++] << v, v += 8
                                    }
                                    h >>>= L, v -= L, n.back += L
                                }
                                if (h >>>= C, v -= C, n.back += C, 64 & x) {
                                    e.msg = "invalid distance code", n.mode = 30;
                                    break
                                }
                                n.offset = I, n.extra = 15 & x, n.mode = 24;
                            case 24:
                                if (n.extra) {
                                    for (U = n.extra; v < U;) {
                                        if (0 === u) break e;
                                        u--, h += o[a++] << v, v += 8
                                    }
                                    n.offset += h & (1 << n.extra) - 1, h >>>= n.extra, v -= n.extra, n.back += n.extra
                                }
                                if (n.offset > n.dmax) {
                                    e.msg = "invalid distance too far back", n.mode = 30;
                                    break
                                }
                                n.mode = 25;
                            case 25:
                                if (0 === f) break e;
                                if (S = A - f, n.offset > S) {
                                    if ((S = n.offset - S) > n.whave && n.sane) {
                                        e.msg = "invalid distance too far back", n.mode = 30;
                                        break
                                    }
                                    O = S > n.wnext ? (S -= n.wnext, n.wsize - S) : n.wnext - S, S > n.length && (S = n.length), R = n.window
                                } else R = r, O = s - n.offset, S = n.length;
                                for (f < S && (S = f), f -= S, n.length -= S; r[s++] = R[O++], --S;);
                                0 === n.length && (n.mode = 21);
                                break;
                            case 26:
                                if (0 === f) break e;
                                r[s++] = n.length, f--, n.mode = 21;
                                break;
                            case 27:
                                if (n.wrap) {
                                    for (; v < 32;) {
                                        if (0 === u) break e;
                                        u--, h |= o[a++] << v, v += 8
                                    }
                                    if (A -= f, e.total_out += A, n.total += A, A && (e.adler = n.check = n.flags ? _(n.check, r, A, s - A) : b(n.check, r, A, s - A)), A = f, (n.flags ? h : i(h)) !== n.check) {
                                        e.msg = "incorrect data check", n.mode = 30;
                                        break
                                    }
                                    v = h = 0
                                }
                                n.mode = 28;
                            case 28:
                                if (n.wrap && n.flags) {
                                    for (; v < 32;) {
                                        if (0 === u) break e;
                                        u--, h += o[a++] << v, v += 8
                                    }
                                    if (h !== (4294967295 & n.total)) {
                                        e.msg = "incorrect length check", n.mode = 30;
                                        break
                                    }
                                    v = h = 0
                                }
                                n.mode = 29;
                            case 29:
                                H = 1;
                                break e;
                            case 30:
                                H = -3;
                                break e;
                            case 31:
                                return -4;
                            case 32:
                            default:
                                return E
                        }
                        return e.next_out = s, e.avail_out = f, e.next_in = a, e.avail_in = u, n.hold = h, n.bits = v, (n.wsize || A !== e.avail_out && n.mode < 30 && (n.mode < 27 || 4 !== t)) && l(e, e.output, e.next_out, A - e.avail_out) ? (n.mode = 31, -4) : (T -= e.avail_in, A -= e.avail_out, e.total_in += T, e.total_out += A, n.total += A, n.wrap && A && (e.adler = n.check = n.flags ? _(n.check, r, A, e.next_out - A) : b(n.check, r, A, e.next_out - A)), e.data_type = n.bits + (n.last ? 64 : 0) + (12 === n.mode ? 128 : 0) + (20 === n.mode || 15 === n.mode ? 256 : 0), (0 === T && 0 === A || 4 === t) && H === k && (H = -5), H)
                    }, n.inflateEnd = function(e) {
                        if (!e || !e.state) return E;
                        var t = e.state;
                        return t.window && (t.window = null), e.state = null, k
                    }, n.inflateGetHeader = function(e, t) {
                        var n;
                        return e && e.state ? 0 == (2 & (n = e.state).wrap) ? E : ((n.head = t).done = !1, k) : E
                    }, n.inflateSetDictionary = function(e, t) {
                        var n, i = t.length;
                        return e && e.state ? 0 !== (n = e.state).wrap && 11 !== n.mode ? E : 11 === n.mode && b(1, t, i, 0) !== n.check ? -3 : l(e, t, i, i) ? (n.mode = 31, -4) : (n.havedict = 1, k) : E
                    }, n.inflateInfo = "pako inflate (from Nodeca project)"
                }, {
                    "../utils/common": 1,
                    "./adler32": 3,
                    "./crc32": 5,
                    "./inffast": 7,
                    "./inftrees": 9
                }],
                9: [function(e, t, n) {
                    "use strict";
                    var i = e("../utils/common"),
                        o = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0],
                        r = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78],
                        a = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0],
                        s = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
                    t.exports = function(e, t, n, u, c, l, f, h) {
                        var d, b, _, p, y, m, w, k, E, g = h.bits,
                            v = 0,
                            T = 0,
                            A = 0,
                            S = 0,
                            O = 0,
                            R = 0,
                            C = 0,
                            x = 0,
                            I = 0,
                            L = 0,
                            N = null,
                            B = 0,
                            F = new i.Buf16(16),
                            H = new i.Buf16(16),
                            D = null,
                            U = 0;
                        for (v = 0; v <= 15; v++) F[v] = 0;
                        for (T = 0; T < u; T++) F[t[n + T]]++;
                        for (O = g, S = 15; 1 <= S && 0 === F[S]; S--);
                        if (S < O && (O = S), 0 === S) return c[l++] = 20971520, c[l++] = 20971520, h.bits = 1, 0;
                        for (A = 1; A < S && 0 === F[A]; A++);
                        for (O < A && (O = A), v = x = 1; v <= 15; v++)
                            if (x <<= 1, (x -= F[v]) < 0) return -1;
                        if (0 < x && (0 === e || 1 !== S)) return -1;
                        for (H[1] = 0, v = 1; v < 15; v++) H[v + 1] = H[v] + F[v];
                        for (T = 0; T < u; T++) 0 !== t[n + T] && (f[H[t[n + T]]++] = T);
                        if (m = 0 === e ? (N = D = f, 19) : 1 === e ? (N = o, B -= 257, D = r, U -= 257, 256) : (N = a, D = s, -1), v = A, y = l, C = T = L = 0, _ = -1, p = (I = 1 << (R = O)) - 1, 1 === e && 852 < I || 2 === e && 592 < I) return 1;
                        for (;;) {
                            for (w = v - C, E = f[T] < m ? (k = 0, f[T]) : f[T] > m ? (k = D[U + f[T]], N[B + f[T]]) : (k = 96, 0), d = 1 << v - C, A = b = 1 << R; c[y + (L >> C) + (b -= d)] = w << 24 | k << 16 | E | 0, 0 !== b;);
                            for (d = 1 << v - 1; L & d;) d >>= 1;
                            if (0 !== d ? (L &= d - 1, L += d) : L = 0, T++, 0 == --F[v]) {
                                if (v === S) break;
                                v = t[n + f[T]]
                            }
                            if (O < v && (L & p) !== _) {
                                for (0 === C && (C = O), y += A, x = 1 << (R = v - C); R + C < S && !((x -= F[R + C]) <= 0);) R++, x <<= 1;
                                if (I += 1 << R, 1 === e && 852 < I || 2 === e && 592 < I) return 1;
                                c[_ = L & p] = O << 24 | R << 16 | y - l | 0
                            }
                        }
                        return 0 !== L && (c[y + L] = v - C << 24 | 64 << 16 | 0), h.bits = O, 0
                    }
                }, {
                    "../utils/common": 1
                }],
                10: [function(e, t, n) {
                    "use strict";
                    t.exports = {
                        2: "need dictionary",
                        1: "stream end",
                        0: "",
                        "-1": "file error",
                        "-2": "stream error",
                        "-3": "data error",
                        "-4": "insufficient memory",
                        "-5": "buffer error",
                        "-6": "incompatible version"
                    }
                }, {}],
                11: [function(e, t, n) {
                    "use strict";
                    t.exports = function() {
                        this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0
                    }
                }, {}],
                "/lib/inflate.js": [function(e, t, n) {
                    "use strict";

                    function i(e) {
                        if (!(this instanceof i)) return new i(e);
                        this.options = a.assign({
                            chunkSize: 16384,
                            windowBits: 0,
                            to: ""
                        }, e || {});
                        var t = this.options;
                        t.raw && 0 <= t.windowBits && t.windowBits < 16 && (t.windowBits = -t.windowBits, 0 === t.windowBits && (t.windowBits = -15)), !(0 <= t.windowBits && t.windowBits < 16) || e && e.windowBits || (t.windowBits += 32), 15 < t.windowBits && t.windowBits < 48 && 0 == (15 & t.windowBits) && (t.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new l, this.strm.avail_out = 0;
                        var n = r.inflateInit2(this.strm, t.windowBits);
                        if (n !== u.Z_OK) throw new Error(c[n]);
                        if (this.header = new f, r.inflateGetHeader(this.strm, this.header), t.dictionary && ("string" == typeof t.dictionary ? t.dictionary = s.string2buf(t.dictionary) : "[object ArrayBuffer]" === h.call(t.dictionary) && (t.dictionary = new Uint8Array(t.dictionary)), t.raw && (n = r.inflateSetDictionary(this.strm, t.dictionary)) !== u.Z_OK)) throw new Error(c[n])
                    }

                    function o(e, t) {
                        var n = new i(t);
                        if (n.push(e, !0), n.err) throw n.msg || c[n.err];
                        return n.result
                    }
                    var r = e("./zlib/inflate"),
                        a = e("./utils/common"),
                        s = e("./utils/strings"),
                        u = e("./zlib/constants"),
                        c = e("./zlib/messages"),
                        l = e("./zlib/zstream"),
                        f = e("./zlib/gzheader"),
                        h = Object.prototype.toString;
                    i.prototype.push = function(e, t) {
                        var n, i, o, c, l, f = this.strm,
                            d = this.options.chunkSize,
                            b = this.options.dictionary,
                            _ = !1;
                        if (this.ended) return !1;
                        i = t === ~~t ? t : !0 === t ? u.Z_FINISH : u.Z_NO_FLUSH, "string" == typeof e ? f.input = s.binstring2buf(e) : "[object ArrayBuffer]" === h.call(e) ? f.input = new Uint8Array(e) : f.input = e, f.next_in = 0, f.avail_in = f.input.length;
                        do {
                            if (0 === f.avail_out && (f.output = new a.Buf8(d), f.next_out = 0, f.avail_out = d), (n = r.inflate(f, u.Z_NO_FLUSH)) === u.Z_NEED_DICT && b && (n = r.inflateSetDictionary(this.strm, b)), n === u.Z_BUF_ERROR && !0 === _ && (n = u.Z_OK, _ = !1), n !== u.Z_STREAM_END && n !== u.Z_OK) return this.onEnd(n), !(this.ended = !0);
                            f.next_out && (0 !== f.avail_out && n !== u.Z_STREAM_END && (0 !== f.avail_in || i !== u.Z_FINISH && i !== u.Z_SYNC_FLUSH) || ("string" === this.options.to ? (o = s.utf8border(f.output, f.next_out), c = f.next_out - o, l = s.buf2string(f.output, o), f.next_out = c, f.avail_out = d - c, c && a.arraySet(f.output, f.output, o, c, 0), this.onData(l)) : this.onData(a.shrinkBuf(f.output, f.next_out)))), 0 === f.avail_in && 0 === f.avail_out && (_ = !0)
                        } while ((0 < f.avail_in || 0 === f.avail_out) && n !== u.Z_STREAM_END);
                        return n === u.Z_STREAM_END && (i = u.Z_FINISH), i === u.Z_FINISH ? (n = r.inflateEnd(this.strm), this.onEnd(n), this.ended = !0, n === u.Z_OK) : i !== u.Z_SYNC_FLUSH || (this.onEnd(u.Z_OK), !(f.avail_out = 0))
                    }, i.prototype.onData = function(e) {
                        this.chunks.push(e)
                    }, i.prototype.onEnd = function(e) {
                        e === u.Z_OK && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = a.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg
                    }, n.Inflate = i, n.inflate = o, n.inflateRaw = function(e, t) {
                        return (t = t || {}).raw = !0, o(e, t)
                    }, n.ungzip = o
                }, {
                    "./utils/common": 1,
                    "./utils/strings": 2,
                    "./zlib/constants": 4,
                    "./zlib/gzheader": 6,
                    "./zlib/inflate": 8,
                    "./zlib/messages": 10,
                    "./zlib/zstream": 11
                }]
            }, {}, [])("/lib/inflate.js")
        })
    }])
});