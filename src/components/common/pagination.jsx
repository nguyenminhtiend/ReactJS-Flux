var React = require('react');
var Page = require('./page.jsx');


var Pagination = React.createClass({
    render: function () {
        var pageItems = [];
        for (var i = 1; i <= this.props.totalPage; i++) {
            if (i == this.props.currentPage) {
                pageItems.push(<Page key={i} isActive={true} page={i} />)
            } else {
                pageItems.push(<Page key={i} page={i} pageChange={this.pageChange} />)
            }
        }
        return (<ul className="pagination">
                    {this.props.currentPage == 1 ?
                    <li className="disabled"><a><i className="fa fa-step-backward"></i></a></li> :
                    <li><a onClick={this.previousPage}><i className="fa fa-step-backward"></i></a></li>}
                    {pageItems}
                    {this.props.currentPage == this.props.totalPage ?
                    <li className="disabled"><a><i className="fa fa-step-forward"></i></a></li> :
                    <li><a onClick={this.nextPage}><i className="fa fa-step-forward"></i></a></li>}
                </ul>);
    },
    pageChange: function (page) {
        this.props.pageChange(page);
    },
    nextPage: function () {
        this.props.pageChange(this.props.currentPage + 1);
    },
    previousPage: function () {
        this.props.pageChange(this.props.currentPage - 1);
    }
});

module.exports = Pagination;