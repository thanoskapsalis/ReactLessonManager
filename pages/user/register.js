import Image from 'next/image';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import Toggle from 'react-toggle';
import "react-toggle/style.css";
import { backend } from '../../libs/configuration';

const register = () => {


  // Save liquid elements when switching between teacher and student
  const [infoText, setInfoText] = useState("Εγγραφή Φοιτητή");
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

  const gradeOptions = [
    { label: "Επίκουρος", value: "epikoyros" },
    { label: "Αναπλήρωτης", value: "anaplirvths" },
    { label: "Καθηγητής", value: "kauhghths" },
  ];



  useEffect(() => {
    setInfoText((isTeacher ? "Εγγραφή Διδασκ." : "Εγγραφή Φοιτητή"));
  }, [isTeacher]);

  const changeToTeacherMode = () => {
    let val = isTeacher;
    setIsTeacher(!val);
  }

  const addNewUser = () => {
    const user = {
      username: username,
      password: password,
      role: (isTeacher) ? "teacher" : "student",
      email: email
    }

    // First we create a new User for the app
    backend.post('/user/register', user).then((response) => {
      let userId = response.data.userId;
      let callUrl = (isTeacher) ? "/user/newTeacher" : "/user/newStudent";
      let item;
      if (isTeacher) {
        item = {
          firstName: firstName,
          lastname: lastName,
          grade: grade.value
        }
      } else {
        item = {
          firstName: firstName,
          lastname: lastName,
          yearEntered: yearEntered
        }
      }
      backend.post(`${callUrl}?id=${userId}`, item).then((response) => {
        Router.push("/user/login");
      })

    })
  }

  return (
    <section className="vh-100" >
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black">
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">{infoText}</p>

                    <form className="mx-1 mx-md-4">

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <div className='d-flex align-self-lg-end'>
                            <span>Εγγραφή Διδάσκοντα &nbsp; </span>
                            <Toggle
                              defaultChecked={isTeacher}
                              onChange={changeToTeacherMode}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" for="form3Example1c">Όνομα χρήστη</label>
                          <input type="text" onChange={(event) => setUsername(event.target.value)} className="form-control" />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" for="form3Example3c">Κωδικός Πρόσβασης</label>
                          <input type="password" onChange={(event) => setPassword(event.target.value)} className="form-control" />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" for="form3Example3c">Διεύθυνση Ηλ.Ταχυδρομιου</label>
                          <input type="email" onChange={(event) => setEmail(event.target.value)} className="form-control" />
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" for="form3Example1c">Όνομα</label>
                          <input type="text" onChange={(event) => setFirstName(event.target.value)} className="form-control" />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" for="form3Example3c">Επώνυμο</label>
                          <input type="text" onChange={(event) => setLastName(event.target.value)} className="form-control" />
                        </div>
                      </div>
                      {isTeacher &&

                        <>
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <label className="form-label" for="form3Example4c">Βαθμίδα Εκπαίδευσης</label>
                              <Select
                                value={grade}
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
                              <input type="text" onChange={(event) => setYearEntered(event.target.value)} className="form-control" />
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
                        <button onClick={addNewUser} type="button" className="btn btn-primary btn-lg">Εγγραφή</button>
                      </div>

                    </form>

                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <Image
                      src="/wall.jpg"
                      width={2000}
                      height={2000}
                      alt="Sample image" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default register;