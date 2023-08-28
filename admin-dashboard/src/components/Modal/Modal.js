import React from 'react'

const Modal = (props) => {
    return (
        <div className={props.size ? props.size : "modal fade"} id={props.modalId ? props.modalId : "exampleModalCenter"} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id={props.modalId ? props.modalId :"exampleModalLongTitle"}>{props.modaltitle}</h5>
                        <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body form-control">
                        {/* modal body passed as props */}
                        {props.children}
                    </div>
                    <div className="modal-footer">
                        {/* if there are buttons in props for delete category then show them else show normal buttons */}
                        {
                            props.buttons ? props.buttons.map((btn, index) => 
                                <button 
                                key={index}
                                type="button" 
                                className={`btn btn-${btn.color}`} 
                                data-bs-dismiss="modal" 
                                onClick={btn.onClick}
                                >
                                    {btn.label}
                                </button>
                            ) :
                            <>
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={props.handleSubmit}>{props.add}</button>
                            </>
                        }
                        {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button> */}
                        {/* <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={props.handleSubmit}>{props.add}</button> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal