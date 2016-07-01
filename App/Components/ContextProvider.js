const React = require('react')
const { contextTypes } = require('mobx-connect')

class ContextProvider extends React.Component {
    getChildContext() {
        return this.props.context;
    }
    render() {
        return this.props.children;
    }
}

ContextProvider.childContextTypes = contextTypes;

module.exports = ContextProvider;