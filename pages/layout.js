import { faBarChart, faBook, faBookReader, faGraduationCap, faListNumeric, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import { useEffect, useState } from 'react';

const layout = (props) => {

  const [activeUsername, setActiveUsername] = useState();
  const [role, setRole] = useState();
  const [fullName, setFullName] = useState('admin');

  useEffect(() => {
    setActiveUsername((window.localStorage.getItem('username'))
      ? window.localStorage.getItem('username')
      : ' ');

    const obj = JSON.parse(window.localStorage.getItem('info'));
    if ( obj != null) {
      setFullName(obj.firstName + ' ' + obj.lastname);
    }

    setRole(window.localStorage.getItem('role'));
  }, []);

  return (
    <section className="vh-100">
      <header className="navbar navbar-dark sticky-top bg-secondary flex-md-nowrap p-0 shadow">
        <Image className="navbar-brand col-md-3 col-lg-2 me-0 px-3" src="/uni.png" width={200} height={50}/>
        <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-nav navbar-dark">
          <div className="nav-item text-nowrap row">
            <a className="nav-link px-3" onClick={() => { window.localStorage.clear();Router.push('/user/login') }} >Αποσύνδεση χρήστη {activeUsername}</a>
          </div>
          <div className="text-nowrap row no-p">
            <small className="nav-link px-3" >Όνομα συνεδεμένου : { fullName}</small>
          </div>
        </div>
      </header><div className="container-fluid">
        <div className="row">
          <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-dark sidebar collapse">
            <div className="position-sticky pt-3">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a className="nav-link text-light" aria-current="page">
                    <FontAwesomeIcon icon={faGraduationCap} className="mr-2 text-light" />
                    <Link href={"/home"}>
                      <span className='text-light'>&nbsp; Μαθήματα</span>
                    </Link>
                  </a>
                </li>
                {(role == "teacher" || role == "admin") &&
                  <li className="nav-item">
                    <a className="nav-link text-light" aria-current="page">
                      <FontAwesomeIcon icon={faBookReader} className="mr-2 text-light" />
                      <Link href={"/class"}>
                        <span className='text-light'>&nbsp; Διδασκαλίες</span>
                      </Link>
                    </a>
                  </li>
                }

                {(role == "student" || role == "admin") &&
                  <li className="nav-item">
                    <a className="nav-link text-light" aria-current="page">
                      <FontAwesomeIcon icon={faBook} className="mr-2 text-light" />
                      <Link href={"/dilosi"}>
                        <span className='text-light'>&nbsp; Δηλώσεις Μαθημάτων</span>
                      </Link>
                    </a>
                  </li>
                }
                {(role == "teacher" || role == "admin") &&
                  <>
                    <li className="nav-item">
                      <a className="nav-link text-light" aria-current="page">
                        <FontAwesomeIcon icon={faListNumeric} className="mr-2 text-light" />
                        <Link href={"/dilosi/mark"}>
                          <span className='text-light'>&nbsp; Βαθμολογίες</span>
                        </Link>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link text-light" aria-current="page">
                        <FontAwesomeIcon icon={faBarChart} className="mr-2 text-light" />
                        <Link href={"/graphs"}>
                          <span className='text-light'>&nbsp; Στατιστικά στοιχεία</span>
                        </Link>
                      </a>
                    </li>
                  </>
                }
                {role == "admin" &&
                  <li className="nav-item">
                    <a className="nav-link text-light" aria-current="page">
                      <FontAwesomeIcon icon={faUser} className="mr-2 text-light" />
                      <Link href={"/user/manage"}>
                        <span className='text-light'>&nbsp; Χρήστες</span>
                      </Link>
                    </a>
                  </li>
                }
              </ul>
            </div>
          </nav>

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            {props.children}
          </main>
        </div>
      </div>
    </section>
  )
}

export default layout;