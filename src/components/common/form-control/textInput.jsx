var React = require('react');
var FormInput = require('./formInput.jsx');

var TextInput = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired,
        placeholder: React.PropTypes.string,
        value: React.PropTypes.string,
        error: React.PropTypes.string,
    },
    render: function () {
        return (
            <FormInput name={this.props.name} label={this.props.label} error={this.props.error}>
                <input type="text" name={this.props.name} className="form-control" placeholder={this.props.placeholder} ref={this.props.name} value={this.props.value} onChange={this.props.onChange} />
            </FormInput>
        )
    }
});

module.exports = TextInput;