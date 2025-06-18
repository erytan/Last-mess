import './App.css';
import { Route, Routes } from "react-router-dom";
import {  Home,CrudLetter } from "./pages";
import path from "./ultils/path";
import "../src/css/base/base.css"
import "../src/css/base/font.css"
function App() {
  return (
   <>
   <Routes>
    <Route path={path.HOME} element={<Home/>}/>
    <Route path={path.CRUDL} element = {<CrudLetter/>}/>
   </Routes>
   </>
  );
}

export default App;
