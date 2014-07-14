(function() {

var module = angular.module('ptth', []);

module.provider('ptth', function() {
    var baseUrl         = '',
        defaultParams   = {},
        dataMethods     = ['post', 'put', 'patch'],
        _$http;

    this.setBaseUrl = function(url) {
        baseUrl = url;
    }

    this.setDefaultParams = function(params) {
        defaultParams = params;
    }

    function prependUrl(url) {
        return baseUrl + url;
    }

    function createShortMethods(http, methods) {
        for (var i = 0; i < methods.length; i++) {
            (function (method) {
                http[method] = function() {
                    var config, 
                        url = arguments[0];

                    if (dataMethods.indexOf(method) > -1) {
                        config = arguments[2] || {};
                        config.data = arguments[1];
                    } else {
                        config = arguments[1] || {};
                    }

                    buildParams(config);

                    config.method = method;
                    config.url = prependUrl(url);

                    return _$http(config);
                }
            })(methods[i]);
        };
    }

    function buildParams(config) {
        config.params = config.params || {};

        for (var prop in defaultParams) {
            if (defaultParams.hasOwnProperty(prop)) {
                config.params[prop] = defaultParams[prop];
            }
        }
    }

    this.$get = ['$http', function($http) {
        _$http = $http;

        var http = function (config) {
            config.url = prependUrl(config.url);
            buildParams(config);

            return $http(config);
        };

        createShortMethods(http, ['get', 'delete', 'head', 'jsonp', 'post', 'put', 'patch']);

        http.pendingRequests = $http.pendingRequests;
        http.defaults = $http.defaults;

        return http;
    }];
});

})();
