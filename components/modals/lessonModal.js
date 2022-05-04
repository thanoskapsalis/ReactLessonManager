import { useEffect, useState } from 'react';
import Modal from 'react-modal';

const lessonModal = (props) => {
  // Lesson Attributes
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [id, setId] = useState();


  useEffect(() => {
    if (typeof props.data != "undefined") {
      setName(props.data.name);
      setDescription(props.data.description);
      setId(props.data.id);
    }
  }, [props]);


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
            <input type="text" readOnly="true" className="form-control" value={id} id="name"/>
          </div>
          <div className="mb-3">
            <label for="name" className="form-label">Ονομασία</label>
            <input type="text" className="form-control" value={name} id="name" onChange={(event) => setName(event.target.value)} />
          </div>
          <div className="mb-3">
            <label for="description" className="form-label">Περιγραφή</label>
            <input type="text" className="form-control" value={description} id="description" onChange={(event) => setDescription(event.target.value)} />
          </div>
          <div className="mb-3">
            <label for="required" className="form-label">Προαπαιτούμενα μαθήματα</label>
            <input type="text" className="form-control" id="required" />
          </div>
        </form>
      </div>
      <div className="d-flex float-end">
        <button onClick={() => props.action(name, description, id)} className=" mt-2 btn  btn-success">{props.confirmText}</button>
      </div>
    </Modal>

  )
}
export default lessonModal;