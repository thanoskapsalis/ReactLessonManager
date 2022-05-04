import { useEffect, useState } from "react";
import Modal from "react-modal";
import Select from 'react-select';
import Toggle from 'react-toggle';
import "react-toggle/style.css";
import { backend } from "../../libs/configuration";



const classModal = (props) => {

  // ItemsSources for Selectors
  const [teachers, setTeachers] = useState();
  const [lessons, setLeassons] = useState();
  const [flag, setFlag] = useState("new");

  // Class attributes used to save the teacher and Lesson for creating a new Class
  const [lesson, setLesson] = useState();
  const [teacher, setTeacher] = useState();
  const [semesterVal, setSemester] = useState();
  const [year, setYear] = useState();
  const [examMandatory, setExamMandatory] = useState(false);
  const [labMandatory, setlabMandatory] = useState(false);
  const [examWeight, setExamWeight] = useState();
  const [labWeight, setlabWeight] = useState();
  const [id, setId] = useState();


  useEffect(() => {
    backend.get('/source/teachers').then((response) => {
      setTeachers(response.data);
    })

    backend.get('source/lessons').then((response) => {
      setLeassons(response.data);
    })

    setFlag("new");
    setSemester(0);
    setYear(0);

    if (props.data != null) {
      backend.get(`/class/get?id=${props.data}`).then((response) => {
        const lessonItem = response.data[0];
        if (lessonItem.semester != 0) {
          setSemester(lessonItem.semester);
        }
        if (lessonItem.year != 0) {
          setYear(lessonItem.year);
        }
        setExamMandatory(lessonItem.examMandatory);
        setlabMandatory(lessonItem.labMandatory);
        setlabWeight(lessonItem.labWeight)
        setExamWeight(lessonItem.examWeight)
        setLesson({ value: lessonItem.lesson.id, label: lessonItem.lesson.name });
        setTeacher({ value: lessonItem.teacher.id, label: `${lessonItem.teacher.firstName} ${lessonItem.teacher.lastname}` });
        setId(lessonItem.id);
        setFlag("update");
      })
    }

  }, [props.data]);

  const modalStyle = {
    content: {
      background: "#FFFFFF",
      overflow: "visible",
      margin: 'auto',
      minWidth: '50%',
      maxHeight: '45%'
    },
  }

  const semester = [
    { label: "1ο Εξάμηνο", value: 1 },
    { label: "2ο Εξάμηνο", value: 2 },
    { label: "3ο Εξάμηνο", value: 3 },
    { label: "4ο Εξάμηνο", value: 4 },
    { label: "5ο Εξάμηνο", value: 5 },
    { label: "6ο Εξάμηνο", value: 6 },
    { label: "7ο Εξάμηνο", value: 7 },
    { label: "8ο Εξάμηνο", value: 8 },
    { label: "9ο Εξάμηνο", value: 9 },
    { label: "10ο Εξάμηνο", value: 10 },
  ]

  return (
    <Modal isOpen={props.isShown} style={modalStyle} ariaHideApp={true}>
      <div className="container-fluid">
        <div className="row justify-content-end">
          <div className="col">
            <h5>Προσθήκη νέας Διδασκαλίας</h5>
          </div>
          <button className="btn-close" onClick={props.closeModal}></button>
        </div>
      </div>
      <div className="row p-2">
        <form>
          <div className="mb-3">
            <label for="name" className="form-label">Μάθημα προς Διδασκαλία</label>
            <Select
              isDisabled={props.role == "teacher"}
              value={lesson}
              options={lessons}
              onChange={(selectedOption) => setLesson(selectedOption)}
            />
          </div>
          <div className="mb-3">
            <label for="name" className="form-label">Καθηγητής</label>
            <Select
              isDisabled={props.role == "teacher"}
              value={teacher}
              options={teachers}
              onChange={(selectedOption) => setTeacher(selectedOption)} />
          </div>
          {props.role == "teacher" &&
            <>
              <div className="mb-3 row">
                <div className="col-6">
                  <label>Έτος Μαθήματος</label>
                  <input value={year} onChange={(event) => setYear(event.target.value)} className="form-control"></input>
                </div>
                <div className="col-6">
                  <label>Εξάμηνο</label>
                  <Select
                    value={{ value: semesterVal, label: `${semesterVal}o Εξάμηνο` }}
                    options={semester}
                    onChange={(selectedOption) => setSemester(selectedOption.value)}
                  />
                </div>
              </div>
              <div className="mb-3 d-flex align-items-center row">
                <div className="col-6">
                  <div className="row">
                    <div className="col-6">
                      <small>Υποχρεωτική Θεωρία</small> &nbsp;
                      <Toggle
                        defaultChecked={examMandatory}
                        onChange={(event) => setExamMandatory(event.target.checked)}
                      /> &nbsp;
                    </div>
                    <div className="col row d-flex align-items-center">
                      <div className="col-8">
                        <small>Βαρύτητα Θεωρίας</small> &nbsp;
                      </div>
                      <div className="col-4">
                        <input
                          onChange={(event) => setExamWeight(event.target.value)}
                          className="form-control"
                          value={examWeight}
                        >
                        </input>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="row">
                    <div className="col-6">
                      <small>Υποχρεωτικό Εργαστ.</small> &nbsp;
                      <Toggle
                        defaultChecked={labMandatory}
                        onChange={(event) => setlabMandatory(event.target.checked)}
                      /> &nbsp;
                    </div>
                    <div className="col row d-flex align-items-center">
                      <div className="col-8">
                        <small>Βαρύτητα Εργαστ.</small> &nbsp;
                      </div>
                      <div className="col-4">
                        <input
                          value={labWeight}
                          onChange={(event) => setlabWeight(event.target.value)}
                          className="form-control"
                        >
                        </input>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          }
        </form>
      </div>
      <div className="d-flex float-end">
        {props.role == "admin" &&
          <>
            <button
              className="mt-2 mr-2 btn  btn-danger"
              onClick={() => props.delete(id)}>
              Διαγραφη Διδασκαλίας
            </button>
          </>
        }

        <button
          className="mt-2 btn  btn-success"
          onClick={() => props.action(flag, lesson.value, teacher.value, semesterVal, year, examMandatory, examWeight, labMandatory, labWeight, id)}>
          Αποθήκευση
        </button>
      </div>
    </Modal>
  )

}

export default classModal;