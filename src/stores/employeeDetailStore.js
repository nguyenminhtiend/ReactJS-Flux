var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EmployeeConstant = require('../constants/employeeConstant');
var http = require('../services/http');
var moment = require('moment');

var state = {
    employeeDetail: {
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        birthday: new moment(),
        departmentId: 1
    },
    errors: {},
    saveCompleted: false
};

var EmployeeDetailStore = objectAssign({}, EventEmitter.prototype, {
    getState: function () {
        return state;
    },
    emitChange: function () {
        this.emit('change');
    },
    addChangeListener: function (callback) {
        this.on('change', callback);
    },
    removeChangeListener: function (callback) {
        this.removeListener('change', callback);
    }
});

AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case EmployeeConstant.EMPLOYEE_SAVE:
            saveEmployee();
            break;
    }
    return true;
});

var saveEmployee = function () {
    state.saveCompleted = true;
    EmployeeDetailStore.emitChange();
};

module.exports = EmployeeDetailStore;
