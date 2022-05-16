import Router from "next/router";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Select from 'react-select';
import { backend } from "../../libs/configuration";
import Layout from "../layout";

/**
 * Κατασκευάζεται μια νέα δήλωση μαθημάτων απο τον φοιτητή. 
 * Ο φοιτητής μπορεί να επιλέξει τα μαθήματα που επιθυμεί να δηλώσει 
 * καθώς και να τα φιλτράρει ανα εξάμηνο
 */
const newDiliosi = () => {

  const [studentInfo, setUserInfo] = useState({});
  const [classesAvaliable, setClassesAvaliable] = useState([]);
  const [filteredClassesAvaliable, setFilteredClassesAvaliable] = useState([]);
  const [selectedLessonsDilosi, setSelectedLessonDilosi] = useState();

  useEffect(() => {
    // Φόρτωση των δεδομένων του φοιτητή για την κατακστευή των δηλώσεων
    backend.get(`/user/students?id=${window.localStorage.getItem('userId')}`).then((response) => {
      setUserInfo(response.data);
    })

    // Φ΄όρτωση των διδασκαιών που υπάρχουν ώστε να μπορεί ο φοιτητης να δηλώσει τα μαθήματα που επιθυμεί
    backend.get('/class/get').then((response) => {
      let tempData = [];
      response.data.filter(element => element.year != 0).forEach(element => {
        tempData.push({
          id: element.id,
          name: element.lesson.name,
          teacher: `${element.teacher.firstName} ${element.teacher.lastname}`,
          semester: element.semester
        });
      });
      setClassesAvaliable(tempData);
      setFilteredClassesAvaliable(tempData);
    })

  }, [])

  /**
   * Κατα την αλλαγή του επιλεγμένου εξαμήνου καθορίζεται ποιό είναι το εξάμηνο
   * που επιλέχθηκε και φιλτράρονται τα μαθήματα που προσφέρονται.
   * 
   * @param {int} key 
   */
  const setSelectedSemester = (key) => {
    setSelectedLessonDilosi([]);
    if (key == 0) { setFilteredClassesAvaliable(classesAvaliable) }
    const filtered = classesAvaliable.filter(element => element.semester == key);
    setFilteredClassesAvaliable(filtered);
  }

  /**
   * Αποθήκευση των μαθημάτων που επέλεξε ο φοιτητής
   * @param {*} selectedRows 
   */
  const setDilosiLessons = ({ selectedRows }) => {
    setSelectedLessonDilosi(selectedRows);
  }

  /**
   * Φιλτράρει και αποστ΄έλλει τα μαθήματα που επέλεξε ο χρήστης 
   * ώστε να κατασκευαστεί η δήλωση μαθημάτων
   */
  const sendDilosiData = () => {
    let items = [];
    selectedLessonsDilosi.forEach(element => items.push(element.id));

    backend.post(`/dilosi/new?studentId=${window.localStorage.getItem('userId')}`, items).then((response) => {
      if (response.data) {
        Router.push('/dilosi');
      }
    })
  }

  /**
   * Καθορισμός στηλών table διαθέσιμων μαθημάτων
   */
  const columns = [
    { name: "Κωδικός Διδασκαλίας", selector: row => row.id },
    { name: "Όνομα", selector: row => row.name },
    { name: "Διδάσκων", selector: row => row.teacher },
    { name: "Εξάμηνο", selector: row => row.semester }
  ]

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
    <Layout>
      <section className="vh-100">
        <div className="row">
          <div className="d-flex justify-content-between">
            <div className='align-self-start'>
              <h4 className="row">Νεα δήλωση μαθημάτων</h4>
              <small className="row">Όνομα Φοιτητή: {studentInfo.firstName} {studentInfo.lastname} </small>
              <small className="row">Αριθμός Μητρόου: {studentInfo.id} </small>
              <small className="row">Έτος εισαγωγής: {studentInfo.year}</small>
            </div>
            <button
              className=" btn btn-primary d-flex align-self-end"
              onClick={sendDilosiData}
            >Υποβολή
            </button>
          </div>
        </div>
        <div className="row mb-4 mt-4" >
          <div className="col-3">
            <label>Εξάμηνο</label>
            <Select
              options={semester}
              onChange={(selectedSemester) => setSelectedSemester(selectedSemester.value)}
            />
          </div>

        </div>
        <div className="row">
          <DataTable
            selectableRows
            columns={columns}
            title="Δήλωση μαθημάτων"
            data={filteredClassesAvaliable}
            onSelectedRowsChange={setDilosiLessons}
          />
        </div>
      </section>
    </Layout>
  )

}

export default newDiliosi;