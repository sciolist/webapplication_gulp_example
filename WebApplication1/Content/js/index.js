var rivets = require('rivets');
var jquery = require('jquery');

rivets.formatters.reverse = function(value) {
    return (value || "").split('').reverse().join('');
}

jquery(function () {
    rivets.bind(document.body, {
    });
});

