import React from 'react';

export default React.createClass({
    propTypes: {
        heading: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired
    },

    getInitialState() {
        return {isFormOpen: false};
    },

    openForm() {
        this.setState({isFormOpen: true});
    },

    closeForm() {
        this.setState({isFormOpen: false});
    },

    submitForm() {
        this.closeForm();
        this.props.onChange(this.refs.input.value);
    },

    render() {
        const {heading} = this.props;
        if (this.state.isFormOpen) {
            return (
                <div className="kanban-section-edit-heading-form">
                    <textarea className="input" ref='input' defaultValue={heading} />
                    <div className="submit" onClick={this.submitForm}>Save</div>
                    <div className="cancel" onClick={this.closeForm}>Cancel</div>
                </div>
            );
        } else {
            return (
                <div className="heading" onClick={this.openForm}>
                    {heading}
                </div>
            );
        }
    }
});
