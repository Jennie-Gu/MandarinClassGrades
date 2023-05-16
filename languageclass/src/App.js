import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import AddLanguageClassForm from './components/AddLanguageClassForm';
import RegistrationAndLoginForm from './components/RegistrationAndLoginForm';
import DashboardForm from './components/DashboardForm';
import EditLanguageClassForm from './components/EditLanguageClassForm';
import StudentGradesForm from './components/StudentGradesForm';
import AddStudentGradesForm from './components/AddStudentGradesForm';
import EditStudentGradesForm from './components/EditStudentGradesForm';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
          <Route element={<RegistrationAndLoginForm></RegistrationAndLoginForm>} path="/" />
          <Route element={<StudentGradesForm></StudentGradesForm>} path="/class/:id" />
          <Route element={<DashboardForm></DashboardForm>} path="/dashboard" />
          <Route element={<AddLanguageClassForm></AddLanguageClassForm>} path="/class/new" />
          <Route element={<EditLanguageClassForm></EditLanguageClassForm>} path="/class/edit/:id" />
          <Route element={<AddStudentGradesForm></AddStudentGradesForm>} path="/student/new/:id" />
          <Route element={<EditStudentGradesForm></EditStudentGradesForm>} path="/student/edit/:id" />
      </Routes>
    </BrowserRouter>                           
  </div>
  );
}

export default App;
