ptth
====

Angular $http service wrapper.

# Basic usage

```javascript
var app = angular.module('myApp', ['ptth']);

app.config(function(ptthProvider) {
    ptthProvider.setBaseUrl('http://example.com')
});

app.controller('MyCtrl', function($scope, ptth) {
    ptth.get('/some-url').success(function(data) { 
        // Get some data from http://example.com/some-url 
    });
});
```


