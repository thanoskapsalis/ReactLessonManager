import { faAdd, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { toast, ToastContainer } from 'react-nextjs-toast';
import { backend } from "../../libs/configuration";
import PersonModal from "../modals/personModal";
const studentManager = () => {

  const [students, setStudents] = useState();
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
      name: 'Έτος εισαγωγής',
      cell: (record) => {
        return (
          <input
            id="yearEntered"
            onChange={(event) => updateValues(record, event)}
            type="number"
            className="form-control"
            value={record.yearEntered} />
        )
      },
      sortable: true
    },
    {
      cell: (record) => {
        return (
          <button type="button" className="btn bg-transparent no-b btn-small p-2" onClick={() => deleteStudent(record.id)}>
            <FontAwesomeIcon className="text-danger" icon={faTrash} />
          </button>
        )
      }
    },
  ]

  /**
   * Updates the student data
   * @param {*} record 
   * @param {*} event 
   */
  const updateValues = (record, event) => {
    const updatedData = students.map(obj => {
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

      if (obj.id == record.id && event.target.id == "yearEntered") {
        return {
          ...obj,
          yearEntered: event.target.value
        }
      }

      return obj;
    })

    setStudents(updatedData);
  }

  useEffect(() => {
    backend.get('/user/students').then((response) => {
      setStudents(response.data.results);
    })
  }, [isShown, deleteConfirm])

  const saveStudents = () => {
    backend.post('/students/set', students).then((response) => {
      toast.notify('Οι αλλαγές αποθηκεύτηκαν', { duration: 5, type: "success", title: "Lesson Application" });

    })
  }

  const newStudent = (id, firstName, lastName, yearEntered) => {
    const item = {
      firstName: firstName,
      lastname: lastName,
      yearEntered: yearEntered,
      id: id
    }

    backend.post('/user/newStudent', item).then((response) => {
      console.log(response.data);
      closeModal();
      toast.notify("Προστέθηκε επιτυχώς", { duration: 5, type: "success", title: "Lesson Application" })

    })
  }

  const deleteStudent = (id) => {
    backend.post(`/student/delete?id=${id}`).then((response) => {
      setDeleteConfirm(!deleteConfirm);
      toast.notify("Διαγράφηκε επιτυχώς", { duration: 5, type: "success", title: "Lesson Application" })

    })
  }


  return (
    <>
      <ToastContainer align={"left"} position={"bottom"}></ToastContainer>
      <div className="d-flex float-end">
        <button onClick={saveStudents} className="btn btn-success mt-auto align-self-end">
          <FontAwesomeIcon icon={faSave}></FontAwesomeIcon>
        </button>
        &nbsp;
        <button onClick={() => showModal()} className="btn btn-primary mt-auto align-self-end">
          <FontAwesomeIcon icon={faAdd}></FontAwesomeIcon>
        </button>
      </div>
      <DataTable
        columns={columns}
        data={students}
      />
      <PersonModal
        modalTitle="Προσθήκη νεου φοιτητή"
        isShown={isShown}
        action={newStudent}
        closeModal={closeModal}
        confirmText="Προσθήκη"
      />
    </>

  )
}

export default studentManager;