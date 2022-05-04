import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-nextjs-toast';
import ClassModal from '../../components/modals/classModal';
import { backend } from '../../libs/configuration';
import Layout from '../layout';

const index = () => {

  const [isShown, setModalStatus] = useState(false);
  const [classes, setClasses] = useState();
  const [editClassKey, setEditClassKey] = useState(null);

  // Λεκτικά που αλλάζουν ανάλογα με τον ρόλο του χρήστη στην εφαρμογή
  const [role, setRole] = useState();
  const [introText, setIntroText] = useState(`Οι διδασκαλίες αναπαριστούν ολοκληρωμένες τάξεις μαθημάτων. Οι διδασκαλίες περιέχουν το μάθημα που πρόκειται να διδαχθεί, τον καθηγητή που το διδάσκει
  καθώς και δεδομένα που αφορούν το μάθημα όπως το εξάμηνο κ.τ.λ.`);

  const showModal = () => { setModalStatus(true); }
  const closeModal = () => { setModalStatus(false); }

  const prepareEditModal = (id) => {
    setEditClassKey(id);
    showModal();
  }

  useEffect(() => {
    let userId = (window.localStorage.getItem('role') == 'admin')
      ? 0
      : window.localStorage.getItem('userId');
    backend.get(`/class/get?userId=${userId}`).then((response) => {
      let tempClasses = [];
      response.data.forEach((element) => {
        tempClasses.push(
          <div class="col-sm-6 mt-2">
            <div class="card">
              <div class="card-body">
                <div className="d-flex justify-content-between">
                  <h5 className='align-self-start'>{element.lesson.name}</h5>
                  <button onClick={() => prepareEditModal(element.id)} className="btn bg-transparent btn-sm align-self-end ">
                    <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>
                  </button>
                </div>
                <p class="card-text">{element.teacher.firstName} {element.teacher.lastname}</p>
                {element.year != 0 &&
                  <span class="badge bg-primary">{element.year}</span>

                }
                &nbsp;
                {element.semester != 0 &&
                  <span class="badge bg-success">{element.semester}o Εξάμηνο</span>
                }
              </div>
            </div>
          </div>
        )
      });
      setClasses(tempClasses);

      if (window.localStorage.getItem('role') == 'teacher') {
        setIntroText("Παρακάτω εμφανίζονται οι διδασκαλίες σας έχουν ανατεθεί");
        setRole("teacher");
      } else {
        setRole("admin");
      }
    })

  }, [isShown])

  const newClass = async (
    flag,
    lesson,
    teacher,
    semester,
    year,
    examMandatory,
    examWeight,
    labMandatory,
    labWeight,
    id
  ) => {
    let teachClass = null;
    if (flag == "update") {
      teachClass = {
        year: year,
        semester: semester,
        examMandatory: examMandatory,
        examWeight: examWeight,
        labMandatory: labMandatory,
        labWeight: labWeight,
        Id: id
      }
    }
    backend.post(`/class/new?teacherId=${teacher}&lessonId=${lesson}`, teachClass).then((response) => {
      closeModal();
      toast.notify("Η νέα τάξη θα εμφανιστεί στον λογαριασμό του καθηγητή για την συμπλήρωση των στοιχείων της", { duration: 5, type: "info", title: "Lesson Application" })
    })
  }

  const removeClass = (id) => {
    backend.post(`/class/delete?id=${id}`).then((response) => {
      closeModal();
    })
  }

  return (
    <Layout>
      <section className="vh-100 mt-2">
        <ToastContainer align={"left"} position={"bottom"} ></ToastContainer>
        <ClassModal
          isShown={isShown}
          closeModal={closeModal}
          action={newClass}
          delete={removeClass}
          data={editClassKey}
          role={role} />
        <div className="row">
          <div className="d-flex justify-content-between">
            <h2 className='align-self-start'>Ενεργές Διδασκαλιες</h2>
            {role == "admin" &&
              <button onClick={() => { setEditClassKey(null); showModal() }} className="btn btn-primary align-self-end ">Νέα Διδασκαλία</button>
            }
          </div>
          <small className='mt-2'>{introText}</small>
        </div>
        <div class="row">
          {classes}
        </div>
      </section>
    </Layout>

  )
}

export default index;