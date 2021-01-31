import React , {useState, useEffect} from 'react';
import UserDetails from './UserDetails';


 const Modals = (props) => {
    const [page, setPage] = useState("");
    useEffect(()=>{
        setPage(props.page)
    },[])
    return (
        <div className="modal-blur">
            <div class="modal-inner">
                {page === "user__details" && (
                <UserDetails 
                setShowModal={props.setShowModal} showModal={props.showModal}
                modalId={props.modalId}
                />
                )}
            
                {/* {page === "addquest" && (
                <AddQuest 
                setShowModal={props.setShowModal} showModal={props.showModal}
               
                />
                )} */}
            </div>       
        </div>
    )
}
export default Modals;