var EmployeeConstant = require('../constants/employeeConstant');
var AppDispatcher = require('../dispatcher/AppDispatcher');

var EmployeeActions = {
    search: function (searchTerm) {
        AppDispatcher.dispatch({
            actionType: EmployeeConstant.EMPLOYEE_SEARCH,
            searchTerm: searchTerm
        });
    },
    paging: function (page) {
        AppDispatcher.dispatch({
            actionType: EmployeeConstant.EMPLOYEE_PAGING,
            page: page
        });
    },
    sorting: function (sortColumn, isAscending) {
        AppDispatcher.dispatch({
            actionType: EmployeeConstant.EMPLOYEE_SORTING,
            sortColumn: sortColumn,
            isAscending: isAscending
        });
    },
    changeItemPerPage: function (itemPerPage) {
        AppDispatcher.dispatch({
            actionType: EmployeeConstant.EMPLOYEE_CHANGE_ITEM_PER_PAGE,
            itemPerPage: itemPerPage
        });
    },
    save: function (employee) {
        AppDispatcher.dispatch({
            actionType: EmployeeConstant.EMPLOYEE_SAVE,
            employee: employee
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
    delete: function (employeeId) {
        AppDispatcher.dispatch({
            actionType: EmployeeConstant.EMPLOYEE_DELETE,
            employeeId: employeeId
        });
    }
};

module.exports = EmployeeActions;
