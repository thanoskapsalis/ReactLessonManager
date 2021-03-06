import { faAdd, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { toast, ToastContainer } from 'react-nextjs-toast';
import { backend } from "../../libs/configuration";
import PersonModal from "../modals/personModal";

const teacherManager = () => {

  const [teachers, setTeachers] = useState();
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const [isShown, setModalStatus] = useState(false);
  const showModal = () => { setModalStatus(true); }
  const closeModal = () => { setModalStatus(false); }

  const columns = [
    { name: 'ID', selector: row => row.id, sortable: true },
    { name: 'Username', selector: row => row.user.username, sortable: true },
    {
      name: 'Όνομα',
      cell: (record) => {
        return (
          <input
            id="firstName"
            onChange={(event) => updateValues(record, event)}
            className="form-control"
            value={record.firstName} />
        )
      },
      sortable: true
    },
    {
      name: 'Επώνυμο',
      cell: (record) => {
        return (
          <input
            id="lastName"
            onChange={(event) => updateValues(record, event)}
            className="form-control"
            value={record.lastname} />
        )
      },
      sortable: true
    },
    {
      cell: (record) => {
        return (
          <button type="button" className="btn bg-transparent no-b btn-small p-2" onClick={() => deleteTeacher(record.id)}>
            <FontAwesomeIcon className="text-danger" icon={faTrash} />
          </button>
        )
      }
    },
  ]

  /**
   * Updates the teacher data
   * @param {*} record 
   * @param {*} event 
   */
  const updateValues = (record, event) => {
    const updatedData = teachers.map(obj => {
      if (obj.id == record.id && event.target.id == "firstName") {
        return {
          ...obj,
          firstName: event.target.value
        }
      }

      if (obj.id == record.id && event.target.id == "lastName") {
        return {
          ...obj,
          lastname: event.target.value
        }
      }

      return obj;
    })

    setTeachers(updatedData);
  }

  useEffect(() => {
    backend.get('/user/teachers').then((response) => {
      setTeachers(response.data.results);
    })
  }, [isShown, deleteConfirm])

  const saveTeachers = () => {
    backend.post('/teachers/set', teachers).then((response) => {
      toast.notify('Οι αλλαγές αποθηκεύτηκαν', { duration: 5, type: "success", title: "Lesson Application" });

    })
  }

  const newTeacher = (id, firstName, lastName, yearEntered,grade) => {
    const item = {
      firstName: firstName,
      lastname: lastName,
      grade: grade,
      id: id
    }

    console.log(grade);
    backend.post('/user/newTeacher', item).then((response) => {
      closeModal();
      toast.notify("Προστέθηκε επιτυχώς", { duration: 5, type: "success", title: "Lesson Application" })

    })
  }

  const deleteTeacher = (id) => {
    backend.post(`/teacher/delete?id=${id}`).then((response) => {
      setDeleteConfirm(!deleteConfirm);
      toast.notify("Διαγράφηκε επιτυχώς", { duration: 5, type: "success", title: "Lesson Application" })
    })
  }

  return (
    <>
      <ToastContainer align={"left"} position={"bottom"}></ToastContainer>
      <div className="d-flex float-end">
        <button onClick={saveTeachers} className="btn btn-success mt-auto align-self-end">
          <FontAwesomeIcon icon={faSave}></FontAwesomeIcon>
        </button>
        &nbsp;
        <button onClick={() => showModal()} className="btn btn-primary mt-auto align-self-end">
          <FontAwesomeIcon icon={faAdd}></FontAwesomeIcon>
        </button>
      </div>
      <DataTable
        columns={columns}
        data={teachers}
      />
      <PersonModal
        modalTitle="Προσθήκη νεου Δασκάλου"
        isShown={isShown}
        action={newTeacher}
        closeModal={closeModal}
        confirmText="Προσθήκη"
        role="teacher"
      />
    </>

  )
}

export default teacherManager;