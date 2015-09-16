'use strict';
define('padawan/filter/padawanFilter', [], function () {
    return function () {
        var operations = {
            '<': function (x, y) { return x < y; },
            '<=': function (x, y) { return x <= y; },
            '==': function (x, y) { return x == y },
            '>=': function (x, y) { return x >= y },
            '>': function (x, y) { return x > y }
        };
        return function (items, field, operator, value) {
            var filteredValues = [];
            if (!items)
                return [];
            angular.forEach(items, function (item) {
                var tempItem, tempValue;
                tempItem = item[field] instanceof String ? Number(item[field]) : item[field];
                tempValue = value instanceof String ? Number(value) : value;
                if (operations[operator](item[field], value)) {
                    filteredValues.push(item)
                }
            });
            return filteredValues;
        }
    }
});