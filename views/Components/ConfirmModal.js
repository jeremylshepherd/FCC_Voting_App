import React from 'react';

export default class ConfirmModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="modal fade" role="dialog" id={this.props.pollId}>
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                      <h4 className="modal-title">Confirm Delete</h4>
                    </div>
                    <div className="modal-body">
                      <p>Are you certain you want to delete this poll? This change cannot be be undone.</p>
                    </div>
                    <div className="modal-footer">              
                      <button type="button" className="btn btn-danger" onClick={this.props.delete} data-dismiss="modal">Delete</button>
                    </div>
                  </div>
                </div>
            </div>
        );
    }
}