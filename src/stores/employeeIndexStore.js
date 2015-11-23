var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EmployeeConstant = require('../constants/employeeConstant');
var http = require('../services/http');

var defaultState = {
    dataRequest: {
        searchTerm: '',
        currentPage: 1,
        itemPerPage: 10,
        sortColumn: 'FirstName',
        sortAscending: true
    },
    totalPage: 0,
    totalItems: 0,
    dataGrid: []
};

var state = Object.assign({}, defaultState);
state.dataRequest = Object.assign({}, defaultState.dataRequest);

var EmployeeIndexStore = objectAssign({}, EventEmitter.prototype, {
    getState: function () {
        return state;
    },
    setDefaultState: function () {
        state = Object.assign({}, defaultState);
        state.dataRequest = Object.assign({}, defaultState.dataRequest);
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
        case EmployeeConstant.EMPLOYEE_SEARCH:
            searchEmployee(action);
            break;
        case EmployeeConstant.EMPLOYEE_CONFIRM_DELETE:
            state.isOpen = action.isOpen;
            EmployeeIndexStore.emitChange();
            break;
    }
    return true;
});

var searchEmployee = function (payload) {
    state.dataGrid = payload.result.listEmployee;
    state.totalPage = Math.floor(payload.result.totalItems / state.dataRequest.itemPerPage) + 1;
    state.totalItems = payload.result.totalItems;
    EmployeeIndexStore.emitChange();
};

module.exports = EmployeeIndexStore;
