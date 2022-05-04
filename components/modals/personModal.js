import { useState } from "react";
import Modal from 'react-modal';

const personModal = (props) => {

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [yearEntered, setYearEntered] = useState();
  const [id, setId] = useState();

  const modalStyle = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      background: "#FFFFFF",
      width: "60%",
    },
  }

  return (
    <Modal isOpen={props.isShown} style={modalStyle} ariaHideApp={true}>
      <div className="container-fluid">
        <div className="row justify-content-end">
          <div className="col">
            <h5>{props.modalTitle}</h5>
          </div>
          <button className="btn-close" onClick={props.closeModal}></button>
        </div>
      </div>
      <div className="row p-2">
        <form>
          <div className="mb-3">
            <label for="name" className="form-label">Αναγνωριστικό</label>
            <input type="text" readOnly="true" className="form-control" value={id} id="name" />
          </div>
          <div className="mb-3">
            <label for="name" className="form-label">Όνομα</label>
            <input type="text" className="form-control" value={firstName} id="name" onChange={(event) => setFirstName(event.target.value)} />
          </div>
          <div className="mb-3">
            <label for="description" className="form-label">Επώνυμο</label>
            <input type="text" className="form-control" value={lastName} id="description" onChange={(event) => setLastName(event.target.value)} />
          </div>
          <div className="mb-3">
            <label for="required" className="form-label">Έτος εισαγωγής</label>
            <input type="text" value={yearEntered} className="form-control" id="required" onChange={(event) => setYearEntered(event.target.value)} />
          </div>
        </form>
      </div>
      <div className="d-flex float-end">
        <button onClick={() => props.action(id, firstName, lastName, yearEntered)} className=" mt-2 btn  btn-success">{props.confirmText}</button>
      </div>
    </Modal>

  )
}
export default personModal;