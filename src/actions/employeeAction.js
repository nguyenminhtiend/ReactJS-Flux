var EmployeeConstant = require('../constants/employeeConstant');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constant = require('../constants/employeeConstant');
var http = require('../services/http');

var getEmployees = function (searchCriteria) {
    var url = Constant.URL + 'api/employee/';
    return http.getWithParam(url, searchCriteria);
};

var saveEmployee = function (employee) {
    var url = EmployeeConstant.URL + 'api/employee/';
    return http.post(url, employee);
};

var EmployeeActions = {
    search: function (searchCriteria) {
        getEmployees(searchCriteria)
        .then(function (result) {
            AppDispatcher.dispatch({
                actionType: EmployeeConstant.EMPLOYEE_SEARCH,
                searchCriteria: searchCriteria,
                result: result
            }); 
        });
    },
    save: function (employee) {
        saveEmployee(employee)
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
