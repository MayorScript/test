import React from 'react'

export default function DeleteUser(props) {
    return (
        <div className="icon-mod">
            <p className="icon-p">Are you sure you want to <br/> delete  <strong>User?</strong></p> 
            
            {/* {props.modalId} */}
            <div className="d-flex justify-content-center">
                <button className="btn btn-main" >
                    Confirm
                </button>
                <button className="btn btn-tertiary" onClick={()=>props.setShowModal(!props.showModal)}>
                    Cancel
                </button>
            </div>
        </div>
    )
}
