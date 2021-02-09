import React , {useState, useEffect} from 'react';
import UserDetails from './UserDetails';
import AssignUserQuest from './AssignUserQuest';
import DeleteUser from './DeleteUser';

 const Modals = (props) => {
    const [page, setPage] = useState("");
    useEffect(()=>{
        setPage(props.page)
    },[])
    const { open, toggleModal, usersList, dropSelection } = props;
    return (
        <div className="modal-blur">
            <div class="modal-inner">
                {page === "user__details" && (
                <UserDetails 
                setShowModal={props.setShowModal} showModal={props.showModal}
                modalId={props.modalId} first_name={props.first_name}
                />
                )}
            
                {page === "assignQuest" && (
                <AssignUserQuest 
                setShowModal={props.setShowModal} showModal={props.showModal}
                modalId={props.modalId} usersList={usersList}
                />
                )}

                {page === "userDelete" && (
                <DeleteUser 
                setShowModal={props.setShowModal} showModal={props.showModal}
                modalId={props.modalId} 
                />
                )}
            </div>       
        </div>
    )
}
export default Modals;