var React = require('react');
var Pagination = require('../common/pagination.jsx');
var SearchCriteria = require('../common/searchCriteria.jsx');
var ItemPerPage = require('../common/itemPerPage.jsx');
//var classNames = require('classnames');
var selectItems = [10, 25, 50, 100];

var employees = [{ firstName: 'Lionel', lastName: 'Messi', email: 'messizip@gmail.com', phone: '12345498', department: 'Football', birthday: '02/03/1991' }];

var Button = React.createClass({
  render () {
    var btnClass = 'btn btn-success';
    return <button className={btnClass}>ABC</button>;
  }
});

var TableHeader = React.createClass({
    render: function () {
        var sort = '';
        if (this.props.data.sortAble == true) {
            if (this.props.sortColumn != this.props.data.name) {
                return (<th onClick={this.sort}>{this.props.data.display}<i className='fa fa-sort'></i></th>);
            } else {
                if (this.props.isAscending) {
                    return (<th onClick={this.sort}>{this.props.data.display}<i className='fa fa-sort-asc'></i></th>);
                } else {
                    return (<th onClick={this.sort}>{this.props.data.display}<i className='fa fa-sort-desc'></i></th>);
                }
            }
        } else {
            return <th>{this.props.data.display}</th>
        }
    },
    sort: function () {
        var isAscending = false;
        if (this.props.sortColumn == this.props.data.name) {
            isAscending = !this.props.isAscending;
        } else {
            isAscending = true;
        }
        this.props.sort(this.props.data.name, isAscending);
    }
});


var TableRow = React.createClass({
    render: function () {
        return (<tr>
                    <td></td>
                    <td>{this.props.data.firstName}</td>
                    <td>{this.props.data.lastName}</td>
                    <td>{this.props.data.email}</td>
                    <td>{this.props.data.phone}</td>
                    <td>{this.props.data.birthday}</td>
                    <td>{this.props.data.department}</td>
                    <td><button type="button" className="btn btn-success-outline btn-sm"><i className="fa fa-pencil-square-o"></i> Edit</button></td>
                </tr>);
    }
});

var Table = React.createClass({
    getInitialState: function () {
        return {
            sortColumn: 'FirstName',
            isAscending: true,
            pageInfo: {
                currentPage: 3,
                totalPage: 4
            }
        }
    },
    eachHeader: function (header, index) {
        return (<TableHeader key={index} data={header} sortColumn={this.state.sortColumn} sort={this.sort} isAscending={this.state.isAscending} />);
    },
    eachRow: function (dataRow, index) {
        return (<TableRow data={dataRow} key={index} />);
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
		                   <ItemPerPage data={selectItems} />
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
                                employees.map(this.eachRow)
                            }
                        </tbody>
                    </table>
                    <Button />
                    <Pagination totalPage={this.state.pageInfo.totalPage} currentPage={this.state.pageInfo.currentPage} pageChange={this.pageChange} />
                </div>
            );
    }
});

module.exports = Table;