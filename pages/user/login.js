import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-nextjs-toast';
import { backend } from '../../libs/configuration';



const login = () => {

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  let container;


  const setElement = (event) => {
    // We save on state the values that user entered on the form 
    // The values are identified by the id provided
    switch (event.target.id) {
      case 'username':
        setUsername(event.target.value);
        break;
      case 'password':
        setPassword(event.target.value);
        break;
    }
  }

  const login = async () => {
    const data = {
      "username": username,
      "password": password
    }

    backend.post('/user/login', data)
      .then((response) => {
        window.localStorage.setItem('role', response.data.role);
        if (response.data.role != "admin") {
          window.localStorage.setItem('userId', response.data.info.id);
        }
        window.localStorage.setItem('username', username);
        Router.push('/home');
        return;
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status == 403) {
          toast.notify('Ο συνδιασμός Email και κωδικού πρόσβασης δεν είναι σωστός', { duration: 5, type: "error", title: "Lesson Application" });
        }
      });
  }

  return (
    <section class="vh-100">
      <ToastContainer align={"left"} position={"bottom"} />
      <div class="container h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-lg-12 col-xl-11">
            <div class="card text-black" >
              <div class="card-body p-md-5">
                <div class="row justify-content-center">
                  <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                    <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Σύνδεση στη πλατφόρμα</p>

                    <form>
                      <div className='mb-4'>
                        <p className="text-center fw-bold mx-3 mb-2">Καλως Ορίσατε στην πλατφόρμα</p>
                        <small className="mx-3 mb-0">Εισάγεται τα προσωπικά σας στοιχεία για να συνδεθείτε</small>
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" for="form3Example3">Όνομα χρήστη</label>
                        <input
                          type="text"
                          id="username"
                          className="form-control form-control-lg"
                          onChange={(event) => setElement(event)}
                          placeholder="username"
                          value={username} />
                      </div>

                      <div className="form-outline mb-3">
                        <label className="form-label" for="form3Example4">Κωδικός Πρόσβασης</label>
                        <input
                          type="password"
                          id="password"
                          className="form-control form-control-lg"
                          onChange={(event) => setElement(event)}
                          placeholder="password"
                          value={password} />

                      </div>

                      <div className="text-center text-lg-start mt-4 pt-2">
                        <button type="button" className="btn btn-primary btn-lg" onClick={login}
                        >Σύνδεση</button>
                        <p className="small fw-bold mt-2 pt-1 mb-0">Δεν έχετε λογαριασμό; <Link href={'/user/register'} >Εγγραφείτε</Link></p>
                      </div>

                    </form>

                  </div>
                  <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
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

export default login;