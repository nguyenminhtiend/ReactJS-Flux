var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EmployeeConstant = require('../constants/employeeConstant');
var moment = require('moment');

var defaultState = {
    employeeDetail: {
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        birthday: new moment(),
        departmentId: 1
    },
    departments: [],
    errors: {},
    saveCompleted: false
};

var state = Object.assign({}, defaultState);

var EmployeeDetailStore = objectAssign({}, EventEmitter.prototype, {
    getState: function () {
        return state;
    },
    setDefaultState: function(){
        state = Object.assign({}, defaultState);
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
            state.saveCompleted = true;
            break;
        case EmployeeConstant.EMPLOYEE_GET_BY_ID:
            var employee = action.employee;
            employee.birthday = new moment(employee.birthday);
            state.employeeDetail = employee;
            break;
        case EmployeeConstant.EMPLOYEE_GET_ALL_DEPARTMENTS:
            state.departments = action.departments;
            break;
    }
    EmployeeDetailStore.emitChange();
    return true;
});

module.exports = EmployeeDetailStore;
