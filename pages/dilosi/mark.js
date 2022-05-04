import { faCheck, faCross, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { backend } from '../../libs/configuration';
import Layout from '../layout';

const mark = () => {

  const [dilosisData, setDilosisData] = useState([]);
  useEffect(() => {
    let teacherId = (window.localStorage.getItem('role') == "admin")
      ? 0
      : window.localStorage.getItem('userId');
    backend.get(`/dilosi/get?teacherId=${teacherId}`).then((response) => {
      let tempData = [];
      response.data.forEach(element => {
        tempData.push({
          id: element.id,
          lesson: element.teachClass.lesson.name,
          student: element.student.firstName + " " + element.student.lastname,
          examMandatory: element.teachClass.examMandatory,
          labMandatory: element.teachClass.labMandatory,
          labWeight: element.teachClass.labWeight,
          examWeight: element.teachClass.examWeight,
          labMark: element.labMark,
          examMark: element.examMark,
          finalMark: element.finalMark
        })
      });
      setDilosisData(tempData);

    })
  }, [])

  /**
   * Updates the array with the dilosi data in order to calculate the final marks 
   * @param {*} record 
   * @param {*} event 
   */
  const updateMark = (record, event) => {
    const updatedData = dilosisData.map(obj => {
      if (obj.id === record.id && event.target.id == "exam") {
        return {
          ...obj,
          examMark: event.target.value,
          finalMark: (event.target.value * record.examWeight + record.labMark * record.labWeight).toFixed(1)
        }
      }

      if (obj.id === record.id && event.target.id == "lab") {
        return {
          ...obj,
          labMark: event.target.value,
          finalMark: (event.target.value * record.labWeight + record.examMark * record.examWeight).toFixed(1)
        }
      }
      return obj;
    })
    setDilosisData(updatedData);
  }

  const saveMarks = () => {
    let formattedData = [];
    dilosisData.forEach((element) => {
      formattedData.push({
        id: element.id,
        examMark: element.examMark,
        labMark: element.labMark,
        finalMark: element.finalMark
      })
    })

    backend.post('/dilosi/update', formattedData).then((response) => {
      console.log(response);
    })
  }

  const columns = [
    { name: 'Αναγνωριστικό', selector: row => row.id, sortable: false },
    { name: 'Μάθημα', selector: row => row.lesson, sortable: false },
    { name: 'Ονοματεπώνυμο Φοιτητή', selector: row => row.student, sortable: false },
    {
      name: 'Υποχρεωτική Θεωρία', key: 'edit', cell: (record) => {
        return (
          <>          {
            (record.examMandatory)
              ? <FontAwesomeIcon className='text-success' icon={faCheck}></FontAwesomeIcon>
              : <FontAwesomeIcon className='text-danger' icon={faCross}></FontAwesomeIcon>


          }
          </>
        )
      }
    },
    {
      name: 'Υποχρεωτικό Εργαστήριο', key: 'edit', cell: (record) => {
        return (
          <>
            {
              (record.labMandatory)
                ? <FontAwesomeIcon className='text-success' icon={faCheck}></FontAwesomeIcon>
                : <FontAwesomeIcon className='text-danger' icon={faX}></FontAwesomeIcon>

            }
          </>
        )
      }
    },
    {
      name: 'Βαθμός Θεωρίας', cell: (record) => {
        return (
          <>
            <input type="number" id="exam" onChange={(event) => updateMark(record, event)} value={record.examMark} className='form-control'></input>
          </>
        )
      }
    },
    {
      name: 'Βαθμός Εργαστηρίου', cell: (record) => {
        return (
          <>
            <input type="number" id="lab" onChange={(event) => updateMark(record, event)} value={record.labMark} className='form-control'></input>
          </>
        )
      }
    },
    {
      name: 'Τελικός Βαθμός', cell: (record) => {
        return (
          <>
            <input id={"final" + record.id} readonly type="number" value={record.finalMark} className='form-control'></input>
          </>
        )
      }
    },
  ]

  return (
    <Layout>
      <section className='vh-100'>
        <h3>Εισαγωγή Βαθμολογιών Μαθημάτων</h3>
        <div className="d-flex float-end">
          <button onClick={saveMarks} className="btn btn-success mt-auto align-self-end">Αποθήκευση Βαθμολογιών</button>
        </div>
        <small>Εμφανίζονται οι δηλώσεις στα μαθήματα που είναι στην κατοχή του διδάσκοντα </small>
        <DataTable
          columns={columns}
          data={dilosisData} />
      </section>
    </Layout>
  )
}
export default mark;