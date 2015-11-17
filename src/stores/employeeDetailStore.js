var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EmployeeConstant = require('../constants/employeeConstant');
var http = require('../services/http');

var state = {
    
};

var EmployeeDetailStore = objectAssign({}, EventEmitter.prototype, {
    getState: function() {
        return state;
    },
    emitChange: function() {
        this.emit('change');
    },
    addChangeListener: function(callback) {
        this.on('change', callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    }
});

AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case EmployeeConstant.EMPLOYEE_SAVE:
            saveEmployee(action.employee);
            break;
    }
    return true;
});

var saveEmployee = function (employee) {
    var url = EmployeeConstant.URL + 'api/employee/';
    http.post(url, employee)
        .then(function (res) {
            
        });
};

module.exports = EmployeeDetailStore;
