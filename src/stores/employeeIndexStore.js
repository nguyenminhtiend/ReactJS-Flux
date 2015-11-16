var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EmployeeConstant = require('../constants/employeeConstant');
var http = require('../services/http');

var state = {
    dataRequest: {
        searchTerm: '',
        currentPage: 1,
        itemPerPage: 10,
        sortColumn: 'FirstName',
        sortAscending: true
    },
    totalPage: 0,
    totalItems: 0,
    dataGrid: [],
    isOpen: false
};

var EmployeeIndexStore = objectAssign({}, EventEmitter.prototype, {
    getState: function () {
        return state;
    },
    init: function() {
        searchEmployee();
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
            state.dataRequest.searchTerm = action.searchTerm;
            searchEmployee();
            break;
        case EmployeeConstant.EMPLOYEE_PAGING:
            state.dataRequest.currentPage = action.page;
            searchEmployee();
            break;
        case EmployeeConstant.EMPLOYEE_SORTING:
            state.dataRequest.sortColumn = action.sortColumn;
            state.dataRequest.sortAscending = action.isAscending;
            searchEmployee();
            break;
        case EmployeeConstant.EMPLOYEE_CHANGE_ITEM_PER_PAGE:
            state.dataRequest.itemPerPage = action.itemPerPage;
            searchEmployee();
            break;
        case EmployeeConstant.EMPLOYEE_CONFIRM_DELETE:
            state.isOpen = action.isOpen;
            EmployeeIndexStore.emitChange();
            break;
    }
    return true;
});

var searchEmployee = function () {
    var url = EmployeeConstant.URL + 'api/employee/';
    http.getWithParam(url, state.dataRequest)
        .then(function (data) {
            state.dataGrid = data.listEmployee;
            state.totalPage = Math.floor(data.totalItems / state.dataRequest.itemPerPage) + 1;
            state.totalItems = data.totalItems;
            EmployeeIndexStore.emitChange();
        });
};

module.exports = EmployeeIndexStore;
