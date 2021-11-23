import React from 'react'
import ReactTooltip from 'react-tooltip'
import './Popup.css'

function Popup(props) {
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <button data-tip="Fermer" className="close-btn" onClick={() => props.setTrigger(false)}>
                    <i className="fas fa-times"></i>
                </button>
                {props.children}
            </div>
            <ReactTooltip
                place="bottom"
                type="info"
                effect="solid"
            />
        </div>
    ) : ""
}

export default Popup
