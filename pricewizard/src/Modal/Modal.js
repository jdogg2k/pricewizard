import { bool, node, string, func } from "prop-types";
import React from "react";

const Modal = props => {
    if (!props.show) {
        return null
    }

    return (
        <div className="modal" onClick={props.onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h4 className="modal-title">{props.title}</h4>
                </div>
                <div className="modal-body">{props.children}</div>
                <div className="modal-footer">
                    <button onClick={props.onSubmit} className="btn btn-primary">Save</button>
                    <button onClick={props.onClose} className="btn btn-secondary">Close</button>
                </div>
            </div>
        </div>
    )
}

Modal.propTypes = {
    show: bool,
    title: string,
    onClose: func,
    children: node,
    onSubmit: func,
}
export default Modal