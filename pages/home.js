import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { toast, ToastContainer } from 'react-nextjs-toast';
import LessonModal from "../components/modals/lessonModal";
import { backend } from "../libs/configuration";
import Layout from "./layout";



const home = () => {

  // Lesson List
  const [lessonList, setLessonList] = useState([]);

  // Modal Settings Attributes and show/hide functions
  const [isShown, setModalStatus] = useState(false);
  const [isEditShown, setEditModalStatus] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  // Λεκτικά που αλλάζουν ανάλογα με τον ρόλο του χρ΄ήστη στην εφαρμογή
  const [role, setRole] = useState();
  const [introText, setIntroText] = useState("Παρακάτω εμφανίζονται όλα τα μαθήματα που υπάρχουν στην εφαρμογή");


  const [editModal, setEditModalContent] = useState();
  const showModal = () => { setModalStatus(true); }
  const closeModal = () => { setModalStatus(false); }
  const showEditModal = () => { setEditModalStatus(true); }
  const closeEditModal = () => { setEditModalStatus(false); }

  // Runs When Modal CHanges View and updates the list of lesssons 
  // avaliable in the database
  useEffect(() => {
    let userId = (window.localStorage.getItem('role') == 'admin')
      ? 0
      : window.localStorage.getItem('userId');
    backend.get(`lesson/get?userId=${userId}`).then((response) => {
      setLessonList(response.data)
    });

    if (window.localStorage.getItem('role') == 'teacher') {
      setIntroText("Παρακάτω εμφανίζονται τα μαθήματα που σας έχουν ανατεθεί");
      setRole("teacher");
    } else if (window.localStorage.getItem('role') == "student") {
      setIntroText("Παρακάτω εμφανίζονται τα μαθήματα που έχετε δηλώσει");
      setRole("student");
    } else {
      setRole("admin");
    }
  }, [isShown, isEditShown, deleteConfirm]);

  // DataTable Structure 
  const columns = [
    { name: "Αναγνωριστικό", selector: row => row.id, sortable: true },
    { name: "Ονομασία", selector: row => row.name, sortable: true },
    { name: "Περιγραφή", selector: row => row.description, sortable: false },
    {
      key: 'edit', text: 'edit', sortable: false, cell: (record) => {
        return (<>
          {role == "admin" &&
            <>
              <button type="button" className="btn bg-transparent no-b btn-small p-2" onClick={() => makeLessonEditModal(record.id)}>
                <FontAwesomeIcon className="text-info" icon={faEdit} />
              </button>
              <button type="button" className="btn bg-transparent no-b btn-small p-2" onClick={() => deleteLesson(record.id)}>
                <FontAwesomeIcon className="text-danger" icon={faTrash} />
              </button>
            </>
          }
        </>
        )
      }
    }
  ]

  /**
   * Creates a lesson object and send it on the databse for save
   * @param {String} name 
   * @param {String} description 
   */
  const saveLesson = (name, description) => {
    const information = {
      "name": name,
      "description": description
    }

    // POST the information tou our api in order to be saved on database
    backend.post('/lesson/add', information).then((response) => {
      toast.notify("Η προσθήκη ενός μαθήματος ήταν επιτυχής", { duration: 5, type: "success", title: "Lesson Application" });
      setModalStatus(false);
    }).catch((error) => {
      console.error(error);
    })
  }

  /**
    * Takes a lesson and loads it on modal in order to be updated on the database
    * @param {Array} id 
    */
  const makeLessonEditModal = (id) => {
    backend.get(`/lesson/get?id=${id}`).then((response) => {
      setEditModalContent(response.data[0]);
    });

    showEditModal()
  }

  const updateLesson = (name, description, id) => {
    const lesson = {
      name: name,
      description: description,
      id: id
    }

    backend.post(`/lesson/add`, lesson).then((response) => {
      toast.notify(`ΤΟ μάθημα ${name} ενημερώθηκε επιτυχώς`, { duration: 5, type: "success", title: "Lesson Application" });
    })
    setEditModalStatus(false);
  }

  const deleteLesson = (id) => {
    backend.post(`/lesson/delete?id=${id}`).then(() => {
      setDeleteConfirm(!deleteConfirm);
    })

  }


  return (
    <Layout>
      <section className="vh-100 mt-2">
        <ToastContainer align={"left"} position={"bottom"}></ToastContainer>
        {role == "admin" &&
          <div className="d-flex float-end">
            <button onClick={showModal} className="btn btn-primary mt-auto align-self-end">Προσθήκη Μαθήματος</button>
          </div>
        }
        <small>{introText}</small>
        <LessonModal
          modalTitle="Προσθήκη νεου μαθήματος"
          isShown={isShown}
          action={saveLesson}
          closeModal={closeModal}
          confirmText="Απαθήκευση"
        />
        <LessonModal
          modalTitle="Ενηνέρωση Υπάρχοντος Μαθήματος"
          isShown={isEditShown}
          closeModal={closeEditModal}
          action={updateLesson}
          data={editModal}
          confirmText="Ενημέρωση"
        />
        <DataTable
          title="Διαθέσιμα Μαθήματα"
          columns={columns}
          data={lessonList}
        />
      </section >
    </Layout >
  )

}

export default home;