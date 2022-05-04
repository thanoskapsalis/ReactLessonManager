import { React, useEffect, useState } from 'react';
import Select from 'react-select';
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { backend } from '../libs/configuration';
import Layout from "./layout";

const graphs = () => {
  const [teachersToLessons, setTeachersToLesson] = useState();
  const [lessonData, setLessonData] = useState([]);
  const [lessons, setLeassons] = useState();
  const [lesson, setLesson] = useState(2);

  const colors = [
    '#198754', '	#dc3545'
  ]

  useEffect(() => {
    const formattedData = [];
    backend.get('source/lessons').then((response) => {
      setLeassons(response.data);
    });
    backend.get('/class/get').then((response) => {
      const teachClasses = response.data;
      backend.get('/user/teachers').then((response) => {
        const teachers = response.data.results;
        teachers.forEach(element => {
          const lessonNum = teachClasses.filter((sh) => { return sh.teacher.id === element.id }).length
          if (lessonNum != 0) {
            formattedData.push(
              {
                name: element.firstName + " " + element.lastname,
                lessonsAttached: lessonNum
              }
            )
          }

        });
        setTeachersToLesson(formattedData);
      })
    })
  }, []);

  useEffect(() => {
    backend.get(`/dilosi/get?lessonId=${lesson.value}`).then((response) => {
      setLessonData([
        {
          name: 'Επιτυχία',
          num: response.data.filter(sh => { return sh.finalMark >= 5 }).length
        },
        {
          name: 'Αποτυχία',
          num: response.data.filter(sh => { return sh.finalMark < 5 }).length
        },
      ]);
    })

  }, [lesson])

  return (
    <Layout>
      <section className="vh-100">
        <h2>Παρακάτω Φαίνονται διάφορα στατιστικά στοιχεία που αφορούν τα δεδομένα της εφαρμογής</h2>
        <div className='row'>
          <div className='col-md-6 col-12'>
            <label>Αριθμός μαθημάτων που έχουν κατανεμηθεί σε καθηγητές</label>
            <ResponsiveContainer width="100%" height="96%">
              <BarChart
                width={150}
                height={150}
                data={teachersToLessons}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" height={150} tick={{ angle: 40, textAnchor: 'start' }} />
                <YAxis />
                <Tooltip label="Μαθήματα" />
                <Bar dataKey="lessonsAttached" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className='col-md-6 col-12'>
            <label>Ποσοστό επιτυχίας/αποτυχίας Μαθημάτων</label>
            <div className="mb-3">
              <label for="name" className="form-label">Μάθημα </label>
              <Select
                value={lesson}
                options={lessons}
                onChange={(selectedOption) => setLesson(selectedOption)}
              />
            </div>
            <ResponsiveContainer width="100%" height="86%">
              <PieChart width={150} height={150}>
                <Tooltip />
                <Pie data={lessonData} dataKey="num" cx="50%" cy="50%" outerRadius={150} fill="#8884d8">
                  {
                    lessonData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index]} />
                    ))
                  }
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section >
    </Layout >
  )
}

export default graphs;