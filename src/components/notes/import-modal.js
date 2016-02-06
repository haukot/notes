import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Modal from 'react-modal';

// in server document not exist
if (typeof document !== 'undefined' && document) {
    document.addEventListener('DOMContentLoaded', () => Modal.setAppElement('body'));
}

const ImportModal = React.createClass({
    displayName: 'ImportModal',

    mixins: [PureRenderMixin],

    handleImport() {
        this.props.onImportOPML({data: this.refs.importInput.value});
        this.props.onRequestClose();
    },

    handleClose() {
        this.props.onRequestClose();
    },

    render() {
        return (
                <Modal
                isOpen={this.props.isOpen}
                onRequestClose={this.handleClose}
                closeTimeoutMS={150}>

                <h2>Import</h2>
                <button onClick={this.handleClose}>close</button>
                <div>Copy OPML from Workflowy in form:</div>
                <textarea ref='importInput' defaultValue='<?xml version="1.0"?>
<opml version="2.0">
  <head>
    <ownerEmail>haudvd@gmail.com</ownerEmail>
  </head>
  <body>
    <outline text="на завтра" >
      <outline text="wtw hui" >
        <outline text="123" /></outline>
      <outline text="nnn" /></outline>
  </body>
</opml>'/>
                <button onClick={this.handleImport}>Import</button>
                </Modal>
        )
    }
});
export default ImportModal;
