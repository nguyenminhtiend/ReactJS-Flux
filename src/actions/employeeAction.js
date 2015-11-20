var EmployeeConstant = require('../constants/employeeConstant');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constant = require('../constants/employeeConstant');
var http = require('../services/http');
var url = Constant.URL + 'api/employee/';

var EmployeeActions = {
    getById: function (id) {
        http.get(url + id)
        .then(function (result) {
            AppDispatcher.dispatch({
                actionType: EmployeeConstant.EMPLOYEE_GET_BY_ID,
                employee: result
            });
        });
    },
    getDepartments: function () {
        http.get(url + 'getDepartments')
        .then(function (result) {
            AppDispatcher.dispatch({
                actionType: EmployeeConstant.EMPLOYEE_GET_ALL_DEPARTMENTS,
                departments: result
            });
        });
    },
    search: function (searchCriteria) {
        http.getWithParam(url, searchCriteria)
            .then(function (result) {
                AppDispatcher.dispatch({
                    actionType: EmployeeConstant.EMPLOYEE_SEARCH,
                    searchCriteria: searchCriteria,
                    result: result
                }); 
            });
    },
    save: function (employee) {
        http.post(url, employee)
        .then(function (result) {
            AppDispatcher.dispatch({
                actionType: EmployeeConstant.EMPLOYEE_SAVE
            });
        });
    },
    edit: function (employeeId) {
        AppDispatcher.dispatch({
            actionType: EmployeeConstant.EMPLOYEE_EDIT,
            employeeId: employeeId
        });
    },
    cancel: function () {
        AppDispatcher.dispatch({
            actionType: EmployeeConstant.EMPLOYEE_CANCEL
        });
    },
    confirmDelete: function (isOpen) {
        AppDispatcher.dispatch({
            actionType: EmployeeConstant.EMPLOYEE_CONFIRM_DELETE,
            isOpen: isOpen
        });
    },
    delete: function (employeeId) {
        AppDispatcher.dispatch({
            actionType: EmployeeConstant.EMPLOYEE_DELETE,
            employeeId: employeeId
        });
    }
};

module.exports = EmployeeActions;
