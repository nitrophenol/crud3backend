import './App.css';
import { useState } from 'react';
import BasicExample from './Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from './Form';
function App() {
const[show,setshow]=useState(false)



  return (
    <div className="App">
      <div className='btn1'>
       <Button variant="primary" className="btn" onClick={()=>setshow(!show)}>ADD ENTRY</Button>{' '}
       </div>
    {   show && 
     <Form/>
    }
    
      <BasicExample/>
    </div>
    
  

  );
}

export default App;
