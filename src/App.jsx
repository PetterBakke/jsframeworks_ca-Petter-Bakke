import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './components/layout/Layout';
import Home from './components/home/Home';
import Detail from './components/detail/Detail';
import { Route, Routes } from "react-router-dom";
import Contact from './components/contact/Contact';
import Login from './components/login/Login';
import "./sass/styles.scss";

function App() {
  return (
    <>
      <Layout />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="page/:id" element={<Detail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
        </Routes>
    </>
      
    
  );
}

export default App;
