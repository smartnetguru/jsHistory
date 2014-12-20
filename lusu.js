/*
 * This file is licensed and opensourced by Olivier Beg on github.
 * @source: https://github.com/smiegles/Javascript-history
 * @copyright: 2014
 */
var lusu = {
    /*
     * @function initialize
     * @desc constructor function, will be called when a history push is requested or the page is called for the first time,
     * @returns void
     */
    'initialize': function () {
        lusu.add.eventListeners('a');
    },
    /*
     * @desc get request
     * @param string page
     * @param function callback
     * @returns mixed
     */
    'get': function (page, callback) {
        request = new XMLHttpRequest();
        request.open('GET', page, true);

        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                if (typeof callback === 'function') {
                    callback(request.responseText);
                }
                else if (typeof callback === 'object') {
                    if (callback.success !== undefined && typeof callback.success === 'function') {
                        callback.success(request.responseText);
                    }
                } else {
                    return request.responseText;
                }
            } else {
                if (callback.error !== undefined && typeof callback.error === 'function') {
                    callback.error({
                        'error': 'request status was invalid.'
                    });
                }
            }
        };

        request.onerror = function (e) {
            if (callback.error !== undefined && typeof callback.error === 'function') {
                callback.error(e);
            }
        };

        request.send();
    },
    'doc': {
        /*
         * @desc Calls when document is ready
         * @param function callback
         * @returns void
         */
        'ready': function (callback) {
            if (document.addEventListener) {
                document.addEventListener('DOMContentLoaded', callback);
            } else {
                document.attachEvent('onreadystatechange', function () {
                    if (document.readyState === 'interactive') {
                        callback();
                    }
                });
            }
        }
    },
    'history': {
        /*
         * @var regex to explode the body.
         */
        'regex': /<body\s*[^>]*>([\S\s]*?)<\/body>/i,
        /*
         * @desc changes the history url if history.pushState exists.
         * @param string page
         * @returns void
         */
        'push': function (page) {
            if (page !== undefined) {
                if (history !== undefined && history.pushState !== undefined) {
                    history.pushState({ 'page': page }, '', page);
                    this.done(page);
                }
            }
        },
        /*
         * @desc set's the inner body to the returned value.
         * @param string page
         */
        'done': function (page) {
            lusu.get(page, function (response) {
                document.body.innerHTML = lusu.history.getBody(response);
                lusu.initialize();
            });
        },
        /*
         * returns the inner content of the body element if exists, otherwise returns the entire content.
         * @param string response
         * @returns {lusu.history@pro;regex@call;exec|lusu.history.getBody.body|@arr;body}
         */
        'getBody': function (response) {
            var body = this.regex.exec(response);
            var body = (body !== null ? body[1] : response);

            return body;
        },
        /*
         * @desc When the document changes this function will be called to change to url again.
         */
        'change': function () {
            window.addEventListener('popstate', function (e) {
              lusu.history.done(e.state.page);
            });
        }
    },
    'add': {
        /*
         * @desc Contains all the elements from the document.
         */
        'elements': {} || [],
        /*
         * @desc binds the push function to a certain selector
         * @param string selector
         * @returns void
         */
        'eventListeners': function (selector) {
            this.elements = document.querySelectorAll(selector);
            Array.prototype.forEach.call(this.elements, function (element) {
                element.addEventListener('click', function (event) {
                    if (element.getAttribute('href') !== undefined && history && history.pushState) {
                        event.preventDefault();
                        lusu.history.push(element.getAttribute('href'));
                    }
                }, false);
            });
        },
        /*
         * @desc unset the old selectors given by the elements variable.
         * @returns void
         */
        'unset': function () {
            for (var i = 0; i < this.elements.length; i++) {
                this.elements[i].removeEventListener('click');
            }
        }
    }
};
lusu.history.change();

lusu.doc.ready(function () {
    lusu.initialize();
});