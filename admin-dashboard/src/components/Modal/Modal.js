import React from 'react'

const Modal = (props) => {
    return (
        <div class={props.size ? props.size : "modal fade"} id={props.modalId ? props.modalId : "exampleModalCenter"} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id={props.modalId ? props.modalId :"exampleModalLongTitle"}>{props.modaltitle}</h5>
                        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body form-control">
                        {/* modal body passed as props */}
                        {props.children}
                    </div>
                    <div class="modal-footer">
                        {/* if there are buttons in props for delete category then show them else show normal buttons */}
                        {
                            props.buttons ? props.buttons.map((btn, index) => 
                                <button 
                                key={index}
                                type="button" 
                                class={`btn btn-${btn.color}`} 
                                data-bs-dismiss="modal" 
                                onClick={btn.onClick}
                                >
                                    {btn.label}
                                </button>
                            ) :
                            <>
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={props.handleSubmit}>{props.add}</button>
                            </>
                        }
                        {/* <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button> */}
                        {/* <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={props.handleSubmit}>{props.add}</button> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal