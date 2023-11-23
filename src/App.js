
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import NoteState from './context/NoteState';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';
import Emailverify from './components/Emailverify';
import LoadingBar from 'react-top-loading-bar'
function App() {
  const [alert, setalert] = useState(null);
  const [progress,setProgress] = useState(null);
  const showalert = (message,type)=>{
    setalert({
      message:message,
      type:type
    });
    setTimeout(()=>{
      setalert(null)
    },1500)
  }
  
  return (
    <>
    <NoteState>
    <BrowserRouter>
    <Navbar showalert={showalert}/>
    <LoadingBar color='#f11946'
        height={5}
        progress={progress}
        onLaderFinished={()=>setProgress(0)}/>
    <Alert alert={alert}/>
    <Routes>
       <Route path='/' element={<Home setProgress={setProgress}  showalert={showalert}/>}/>
       <Route path='/about' element={<About setProgress={setProgress} showalert={showalert}/>}/>
       <Route path='/login' element={<Login setProgress={setProgress}  showalert={showalert}/>}/>
       <Route path='/signup' element={<Signup setProgress={setProgress} showalert={showalert}/>}/>
       <Route path='/emailverify' element={<Emailverify setProgress={setProgress} showalert={showalert}/>}/>
    </Routes>
    
    
    </BrowserRouter>
    </NoteState>
    </>
  );
}

export default App;
