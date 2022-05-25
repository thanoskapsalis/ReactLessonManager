import { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-nextjs-toast';
import Select from "react-select";
import { backend } from "../../libs/configuration";
import Layout from "../layout";



const profile = () => {

  const [isTeacher, setIsTeacher] = useState(false);

  // Save values from the form 
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [yearEntered, setYearEntered] = useState();
  const [id, setId] = useState();
  const [grade, setGrade] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [userData, setUserData] = useState();

  const gradeOptions = [
    { label: "Επίκουρος", value: "epikoyros" },
    { label: "Αναπλήρωτης", value: "anaplirvths" },
    { label: "Καθηγητής", value: "kauhghths" },
  ];



  useEffect(() => {
    const role = window.localStorage.getItem('role');
    setIsTeacher(role == "teacher");

    const userInfo = JSON.parse(window.localStorage.getItem('info'));
    setFirstName(userInfo.firstName);
    setLastName(userInfo.lastname);
    setGrade(userInfo.grade);
    setEmail(userInfo.user.email);
    setUsername(userInfo.user.username);
    setUserData(userInfo);
    setId(userInfo.id);
  }, [isTeacher]);


  const updateUser = () => {
    if (isTeacher) {
      const teacherItem = [
        {
          firstName: firstName,
          lastname: lastName,
          grade: grade,
          id: id
        }
      ]
      backend.post('/teachers/set', teacherItem).then((response) => {
        toast.notify('Οι αλλαγές αποθηκεύτηκαν', { duration: 5, type: "success", title: "Lesson Application" });
      })

      backend.get(`/user/teachers?id=${id}`).then((response) => {
        window.localStorage.setItem("info", JSON.stringify(response.data));
      })
    } else {
      const uesrItem = [
        {
          firstName: firstName,
          lastname: lastName,
          yearEntered: yearEntered,
          id: id
        }
      ]
      backend.post('/students/set', uesrItem).then((response) => {
        toast.notify('Οι αλλαγές αποθηκεύτηκαν', { duration: 5, type: "success", title: "Lesson Application" });
      })
      backend.get(`/user/students?id=${id}`).then((response) => {
        window.localStorage.setItem("info", JSON.stringify(response.data));
      })
    }


  }


  return (
    <Layout>
      <section className="vh-100">
        <ToastContainer align={"left"} position={"bottom"}></ToastContainer>
        <form className="mx-1 mx-md-4">

          <div className="d-flex flex-row align-items-center mb-4">
            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
          </div>
          <div className="d-flex flex-row align-items-center mb-4">
            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
            <div className="form-outline flex-fill mb-0">
              <label className="form-label" for="form3Example1c">Όνομα χρήστη</label>
              <input readOnly type="text" value={username} onChange={(event) => setUsername(event.target.value)} className="form-control" />
            </div>
          </div>

          <div className="d-flex flex-row align-items-center mb-4">
            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
            <div className="form-outline flex-fill mb-0">
              <label className="form-label" for="form3Example3c">Διεύθυνση Ηλ.Ταχυδρομιου</label>
              <input readOnly type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="form-control" />
            </div>
          </div>

          <div className="d-flex flex-row align-items-center mb-4">
            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
            <div className="form-outline flex-fill mb-0">
              <label className="form-label" for="form3Example1c">Όνομα</label>
              <input type="text" value={firstName} onChange={(event) => setFirstName(event.target.value)} className="form-control" />
            </div>
          </div>

          <div className="d-flex flex-row align-items-center mb-4">
            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
            <div className="form-outline flex-fill mb-0">
              <label className="form-label" for="form3Example3c">Επώνυμο</label>
              <input type="text" value={lastName} onChange={(event) => setLastName(event.target.value)} className="form-control" />
            </div>
          </div>
          {isTeacher &&
            <>
              <div className="d-flex flex-row align-items-center mb-4">
                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                <div className="form-outline flex-fill mb-0">
                  <label className="form-label" for="form3Example4c">Βαθμίδα Εκπαίδευσης</label>
                  <Select
                    value={gradeOptions.filter(sh => sh.value == grade)}
                    options={gradeOptions}
                    onChange={(selectedOption) => setGrade(selectedOption)}
                  />
                </div>
              </div>

            </>
          }
          {!isTeacher &&
            <>
              <div className="d-flex flex-row align-items-center mb-4">
                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                <div className="form-outline flex-fill mb-0">
                  <label className="form-label" for="form3Example4c">Έτος εισαγωγής</label>
                  <input type="text" value={yearEntered} onChange={(event) => setYearEntered(event.target.value)} className="form-control" />
                </div>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                <div className="form-outline flex-fill mb-0">
                  <label className="form-label" for="form3Example4cd">Αριθμος Μητρτώου</label>
                  <input type="number" onChange={(event) => setId(event.target.value)} placeholder='321201...' className="form-control" />
                </div>
              </div>
            </>

          }

          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
            <button onClick={updateUser} type="button" className="btn btn-primary btn-lg">Ενημέρωση Στοιχείων</button>
          </div>

        </form>
      </section>
    </Layout>
  )

}
export default profile;