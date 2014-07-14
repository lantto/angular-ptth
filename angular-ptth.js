(function() {

var module = angular.module('ptth', []);

module.provider('ptth', function() {
    var baseUrl     = '', 
        dataMethods = ['post', 'put', 'patch'],
        _$http;

    this.setBaseUrl = function(url) {
        baseUrl = url;
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

                    config.method = method;
                    config.url = prependUrl(url);

                    return _$http(config);
                }
            })(methods[i]);
        };
    }

    this.$get = ['$http', function($http) {
        _$http = $http;

        var http = function (config) {
            config.url = prependUrl(config.url);

            return $http(config);
        };

        createShortMethods(http, ['get', 'delete', 'head', 'jsonp', 'post', 'put', 'patch']);

        http.pendingRequests = $http.pendingRequests;
        http.defaults = $http.defaults;

        return http;
    }];
});

})();
