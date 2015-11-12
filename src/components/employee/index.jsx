var React = require('react');
var Time = require('react-time');
var Router = require('react-router');
var Link = Router.Link;

var Pagination = require('../common/pagination.jsx');
var SearchCriteria = require('../common/searchCriteria.jsx');
var ItemPerPage = require('../common/itemPerPage.jsx');
var TableHeader = require('../common/tableHeader.jsx');
var DisplayInfo = require('../common/displayInfo.jsx');

var EmployeeConstant = require('../../constants/employeeConstant');
var EmployeeIndexStore = require('../../stores/employeeIndexStore');
var EmployeeAction = require('../../actions/employeeAction');


var selectItems = [10, 25, 50, 100];

var Table = React.createClass({
    getInitialState: function () {
        return EmployeeIndexStore.getState();
    },
    eachHeader: function (header, index) {
        return (<TableHeader key={index} data={header} sortColumn={this.state.dataRequest.sortColumn} sort={this.sort} isAscending={this.state.dataRequest.sortAscending} />);
    },
    eachRow: function (dataRow, index) {
        return (<tr key={index}>
                    <td><img className="cardImage" src={EmployeeConstant.URL_RESOURCE + dataRow.avatar} alt="Customer Image" /></td>
                    <td>{dataRow.firstName}</td>
                    <td>{dataRow.lastName}</td>
                    <td>{dataRow.email}</td>
                    <td>{dataRow.phone}</td>
                    <td><Time value={dataRow.birthday} format="DD/MM/YYYY" /></td>
                    <td>{dataRow.department}</td>
                    <td><Link to="employeeDetail" params={{id: dataRow.id}} className="btn btn-primary btn-xs"><i className="fa fa-pencil-square-o"></i> Edit</Link></td>
                </tr>);
    },
    sort: function (sortColumn, isAscending) {
        EmployeeAction.sorting(sortColumn, isAscending);
    },
    pageChange: function(page){
        EmployeeAction.paging(page);
    },
    search: function(searchTerm){
        EmployeeAction.search(searchTerm);
    },
    changeItemPerPage: function (selectedItemPerPage) {
        EmployeeAction.changeItemPerPage(selectedItemPerPage);
    },
    render: function () {
        var headers = [
                        { name: '', display: '', sortAble: false },
                        { name: 'FirstName', display: 'First Name', sortAble: true },
                        { name: 'LastName', display: 'Last Name', sortAble: true },
                        { name: 'Email', display: 'Email', sortAble: true },
                        { name: 'Phone', display: 'Phone', sortAble: true },
                        { name: 'Birthday', display: 'Birthday', sortAble: true },
                        { name: 'Department', display: 'Department', sortAble: true },
                        { name: '', display: '', sortAble: false }
        ];
        return (<div>
                    <div className="row">
	                    <div className="col-md-6">
		                    <SearchCriteria search={this.search} />
	                    </div>
	                    <div className="col-md-6">
		                   <ItemPerPage data={selectItems} selectedItem={this.state.itemPerPage} onChange={this.changeItemPerPage} />
	                    </div>
                    </div>
                    <div className="row">
	                    <div className="col-md-12">
		                    <table className="table table-striped table-hover table-bordered">
                        <tr>
                            {
                            headers.map(this.eachHeader)
                            }
                        </tr>
                        <tbody>
                            {
                            this.state.dataGrid.map(this.eachRow)
                            }
                        </tbody>
		                    </table>
	                    </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <DisplayInfo currentPage={this.state.dataRequest.currentPage} itemPerPage={this.state.dataRequest.itemPerPage} totalItems={this.state.totalItems} />
                        </div>
                        <div className="col-md-8 custom-right">
                            <Pagination totalPage={this.state.totalPage} currentPage={this.state.dataRequest.currentPage} pageChange={this.pageChange} />
                        </div>
                    </div>
                </div>
            );
    },
    componentWillMount: function(){
        EmployeeIndexStore.init();
    },
    componentWillUnmount: function () {
        EmployeeIndexStore.removeChangeListener(this._onChange);
    },
    componentDidMount: function () {
        EmployeeIndexStore.addChangeListener(this._onChange);
    },
    _onChange: function () {
        this.setState(EmployeeIndexStore.getState());
    },
});

module.exports = Table;