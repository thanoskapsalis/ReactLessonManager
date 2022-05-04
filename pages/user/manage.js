import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import StudentManager from '../../components/managers/studentManager';
import TeacherManager from '../../components/managers/teacherManager';
import Layout from "../layout";
const manage = () => {

  return (
    <Layout>
      <section className="vh-100">
        <Tabs className="mt-2">
          <TabList>
            <Tab>Φοιτητές</Tab>
            <Tab>Διδάσκοντες</Tab>
          </TabList>

          <TabPanel>
            <h2>Φοιτητές</h2>
            <small>Εμφανίζονται οι Φοιτητές που είναι εγγεγραμμένοι στο σύστημα. Μπορούν να προστεθούν Φοιτητές και χωρίς να έχουν λογαριασμό στο σύστημα ώστε να τον δημιουργήσουν αργότερα</small>
            <StudentManager/>
          </TabPanel>
          <TabPanel>
            <h2>Διδάσκοντες</h2>
            <small>Εμφανίζονται οι Διδάσκοντες που είναι εγγεγραμμένοι στο σύστημα. Μπορούν να προστεθούν Διδάσκοντες και χωρίς να έχουν λογαριασμό στο σύστημα ώστε να τον δημιουργήσουν αργότερα</small>
            <TeacherManager/>
          </TabPanel>
        </Tabs>

      </section>
    </Layout>
  )
}

export default manage;