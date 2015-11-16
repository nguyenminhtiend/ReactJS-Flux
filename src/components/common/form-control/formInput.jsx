var React = require('react');
var classNames = require('classnames');

var FormInput = React.createClass({
    render: function () {
        var wrapperClass = classNames({
            'form-group': true,
            'has-error': this.props.error && this.props.error.length > 0
        });

        return (
            <div className={wrapperClass}>
                <label htmlFor="this.props.name" className="control-label col-sm-2">{this.props.label}</label>
                <div className="col-sm-6">
                    {this.props.children}
                    <span className="help-block">{this.props.error}</span>
                </div>
            </div>
        )
    }
});

module.exports = FormInput;