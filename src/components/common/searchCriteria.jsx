var React = require('react');

var SearchCriteria = React.createClass({
    render: function () {
        return (
                <div className="input-group">
                    <input type="text" className="form-control" ref="searchTerm" onKeyDown={this.search} placeholder="Searching for First Name and Last Name" />
                    <span className="input-group-btn" onClick={this.clickSearch}>
                	    <button className="btn btn-default" type="button"><i className="fa fa-search"></i></button>
                    </span>
		        </div>
            );
    },
    search: function (e) {
        if (e.keyCode == 13) {
            this.props.search(e.target.value);
        }
    },
    clickSearch: function () {
        this.props.search(this.refs.searchTerm.getDOMNode().value);
    }
});

module.exports = SearchCriteria;