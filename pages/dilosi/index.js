import Router from 'next/router';
import { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import { backend } from "../../libs/configuration";
import Layout from "../layout";


const index = () => {
  const [role, setRole] = useState("student");
  const [dilosis, setDilosis] = useState();
  const [formattedDilosis, setFormattedDilosis] = useState();
  const [filteredDilosis, setFilteredDilosis] = useState();

  const columns = [
    { name: 'Αναγνωριστικό', selector: row => row.id, sortable: true },
    { name: 'Ονομασία Μαθήματος', selector: row => row.name, sortable: true },
    { name: 'Εξάμηνο', selector: row => row.semester, sortable: true },
    { name: 'Βαθμός', selector: row => row.finalMark, sortable: true },
    { name: 'Κατάσταση', selector: row => row.status, sortable: true }
  ]

  useEffect(() => {
    let studentId =  (window.localStorage.getItem('role') != 'admin')
    ? window.localStorage.getItem('userId')
    : 0;
   
    backend.get(`/dilosi/get?studentId=${studentId}`)
      .then((response) => {
        let formattedDilosis = [];
        response.data.forEach(element => {
          console.log(element);
          formattedDilosis.push(
            {
              id: element.id,
              name: element.teachClass.lesson.name,
              semester: element.teachClass.semester,
              finalMark: element.finalMark,
              status: (element.finalMark > 5) ? 'Επιτυχία' : 'Αποτυχία'
            }
          )
        });
        setFormattedDilosis(formattedDilosis);
      })
  }, []);

  return (
    <Layout>
      <section className="vh-100">
        <div className="row">
          <div className="d-flex justify-content-between">
            <h2 className='align-self-start'>Δηλώσεις Μαθημάτων</h2>
            {role == "student" &&
              <button onClick={() => { Router.push('/dilosi/new') }} className="btn btn-primary align-self-end ">Νέα Δήλωση</button>
            }
          </div>
          <small className='mt-2'>Παρακάτω φαίνονται οι δηλώσεις μαθημάτων που έχετε πραγαμτοποιήσει</small>
          <DataTable
            columns={columns}
            data={formattedDilosis}
          />
        </div>
      </section>
    </Layout>
  )
}

export default index;