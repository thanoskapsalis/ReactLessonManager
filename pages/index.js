import { faBarChart, faHandMiddleFinger, faListNumeric, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (<>
    <div className="container-fluid">
      <header className="site-header sticky-top py-1">
        <nav className="d-flex flex-column flex-md-row bg-light justify-content-between">
          <Image className="navbar-brand col-md-3 col-lg-2 me-0 px-3" src="/uni.png" width={200} height={50} />
        </nav>
      </header>
      <main>
        <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light row">
          <div className="col-md-5 p-lg-5 mx-auto my-5">
            <h1 className="display-4 fw-normal">Lesson Manager</h1>
            <p className="lead fw-normal">Το ολοκληρωμένο σύστημα διαχείρισης και βαθμολόγησης μαθημάτων για εκπαιδευτικά ιδρήματα</p>
            <Link className="btn btn-outline-secondary" href="/user/login">Μετάβαση στην πλατφόρμα</Link>
          </div>
          <div className="product-device d-none d-md-block col">
            <Image className="navbar-brand col-md-3 col-lg-2 me-0 px-3" src="/study.png" width={400} height={400} />
          </div>
        </div>

        <div className="px-4 pt-5 my-5 text-center border-bottom">
          <h1 className="display-4 fw-bold">Ευκολία</h1>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">Το lesson Manager είναι το τέλειο εργαλείο βαθμολόγησης και παραγωγής Στατιστικών στοιχείων
             για ακαδιμαϊκά ιδρήματα</p>
          </div>
          <div className="overflow-hidden" style={{'max-height': '30vh'}}>
            <div className="container px-5">
              <Image src={'/screenshot.png'} width={700} height={500}></Image>
            </div>
          </div>
        </div>

        <div className="px-4 py-5" id="hanging-icons">
          <h2 className="pb-2 border-bottom">Γιατί να επιλέξει κανείς το Lesson Manager</h2>
          <div className="row g-4 py-5 row-cols-1 row-cols-lg-4">
            <div className="col d-flex align-items-start">
              <div className="icon-square bg-light text-dark flex-shrink-0 me-3">
                <FontAwesomeIcon className='d-flex justify-content-center bg-primary p-2 text-white rounded' size='xl' icon={faHandMiddleFinger}></FontAwesomeIcon>
              </div>
              <div>
                <h2>Ευκολία στην χρήση</h2>
                <p>Χαρακτηριστικό της εφαρμογής είναι η ευκολία στην χρήση, ώστε η εκμάθηση της να είναι εύκολη για το εκπαιδευτικό προσωπικό και η διαχείρισή της ξεκούραστη.</p>
              </div>
            </div>
            <div className="col d-flex align-items-start">
              <div className="icon-square bg-light text-dark flex-shrink-0 me-3">
                <FontAwesomeIcon className='d-flex justify-content-center bg-primary p-2 text-white rounded' size='xl' icon={faListNumeric}></FontAwesomeIcon>
              </div>
              <div>
                <h2>Ολοκληρωμένο σύστημα βαθμολόγησης</h2>
                <p>Πέρα απο την διαχείρισή μαθημάτων, στην εφαρμογή περιλαμβάνεται ένα ολοκληρωμένο σύστημα βαθμολόγησης.</p>
              </div>
            </div>
            <div className="col d-flex align-items-start">
              <div className="icon-square bg-light text-dark flex-shrink-0 me-3">
                <FontAwesomeIcon className='d-flex justify-content-center bg-primary p-2 text-white rounded' size='xl' icon={faPeopleGroup}></FontAwesomeIcon>
              </div>
              <div>
                <h2>Διαχείριση προσωπικού</h2>
                <p>Μέσα στην εφαρμογή προσφέρεται διαχείρισή προσωπικού πανεπιστημίου που αφορά την διαχείρισή φοιτητών καθώς και ακαδιμαϊκών.</p>
              </div>
            </div>
            <div className="col d-flex align-items-start">
              <div className="icon-square bg-light text-dark flex-shrink-0 me-3">
                <FontAwesomeIcon className='d-flex justify-content-center bg-primary p-2 text-white rounded' size='xl' icon={faBarChart}></FontAwesomeIcon>
              </div>
              <div>
                <h2>Εξαγωγή Στατιστικών στοιχείων</h2>
                <p>Υπάρχει η δυνατότητα Εξαγωγής Στατιστικών στοιχείων μέσα απο την εφαρμογή.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          University of the Aegean 2022
        </a>
      </footer>
    </div>
  </>
  )
}
