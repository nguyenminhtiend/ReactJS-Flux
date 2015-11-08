var React = require('react');
var Pagination = require('../common/pagination.jsx');
var SearchCriteria = require('../common/searchCriteria.jsx');
var ItemPerPage = require('../common/itemPerPage.jsx');
var TableHeader = require('../common/tableHeader.jsx');
var http = require('../../services/http');

var selectItems = [10, 25, 50, 100];

var employees = [{ firstName: 'Lionel', lastName: 'Messi', email: 'messizip@gmail.com', phone: '12345498', department: 'Football', birthday: '02/03/1991' }];

var Table = React.createClass({
    getInitialState: function () {
        return {
            searchTerm: '',
            currentPage: 1,
            itemPerPage: 25,
            sortColumn: 'FirstName',
            sortAscending: true,
            totalPage: 4,
            dataGrid: []
        }
    },
    componentWillMount: function () {
        var data = [];
        var url = 'http://localhost:1234/api/employee/?currentPage=1&itemPerPage=10&searchTerm=&sortAscending=false&sortColumn=FirstName';
        http.get(url)
            .then(function (data) {
                this.setState({ dataGrid: data.listEmployee });
                this.setState({ dataGrid: employees });
            });

    },
    eachHeader: function (header, index) {
        return (<TableHeader key={index} data={header} sortColumn={this.state.sortColumn} sort={this.sort} isAscending={this.state.sortAscending} />);
    },
    eachRow: function (dataRow, index) {
        return (<tr key={index}>
                    <td></td>
                    <td>{dataRow.firstName}</td>
                    <td>{dataRow.lastName}</td>
                    <td>{dataRow.email}</td>
                    <td>{dataRow.phone}</td>
                    <td>{dataRow.birthday}</td>
                    <td>{dataRow.department}</td>
                    <td><button type="button" className="btn btn-success-outline btn-sm"><i className="fa fa-pencil-square-o"></i> Edit</button></td>
                </tr>);
    },
    sort: function (sortColumn, isAscending) {
        this.setState({ sortColumn: sortColumn, isAscending: isAscending });
    },
    pageChange: function(page){
        var pageInfo = this.state.pageInfo;
        pageInfo.currentPage = page;
        this.setState({ pageInfo: pageInfo });
    },
    search: function(){
        alert('gasgagag');
    },
    itemPerPageChange: function (selectedItemPerPage) {
        this.setState({ itemPerPage: selectedItemPerPage });
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
		                   <ItemPerPage data={selectItems} selectedItem={this.state.itemPerPage} />
	                    </div>
                    </div>
                    <table className="table table-striped table-hover">
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
                    <Pagination totalPage={this.state.totalPage} currentPage={this.state.currentPage} pageChange={this.pageChange} />
                </div>
            );
    }
});

module.exports = Table;