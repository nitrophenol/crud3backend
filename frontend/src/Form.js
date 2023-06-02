import './App.css';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Axios, * as others from 'axios';
import validator from 'validator' 
function Form() {

  const [formData, setFormData] = useState({
    name: 'default',
    email: 'default@gmail.com',
   hobbies:'defaulthobbies',
   phonenumber:'0000000'
  })
 

  const onChangeHandler = (event) => {

    console.log(event)
    if (event.target.name === 'languages') {

      let copy = { ...formData }

      if (event.target.checked) {
        copy.languages.push(event.target.value)
      } else {
        copy.languages = copy.languages.filter(el => el !== event.target.value)
      }

      setFormData(copy)

    } else {
      setFormData(() => ({
        ...formData,
        [event.target.name]: event.target.value
      }))
    }
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
     const b = validator.isEmail(formData.email)
   const a =  validator.isMobilePhone(formData.phonenumber)
    if(!a)
    {
      alert("Please enter a valid phone number");
      return false;
    }
    if(!b)
    {
      alert("Please enter a valid email address");
      return false;
    }

    console.log(formData)
   await Axios.post('http://localhost:3001/register',{
      name:formData.name,
      email:formData.email,
      hobbies: formData.hobbies,
      phonenumber:formData.phonenumber
    })
  
    
    
  }
  return (
    <div className="Form">
    
  
      <form onSubmit={onSubmitHandler} >
        <div className="form-group">
          <label htmlFor="name" className="form-label">Name</label>
          <input className="form-control" name="name" onChange={onChangeHandler} value={formData.name} />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input className="form-control" name="email" onChange={onChangeHandler} value={formData.email} />
        </div>
        <div className="form-group">
          <label htmlFor="hobbies" className="form-label">Hobbies</label>
          <input className="form-control" name="hobbies" onChange={onChangeHandler} value={formData.hobbies} />
        </div>
        <div className="form-group">
          <label htmlFor="hobbies" className="form-label">Phone Number</label>
          <input className="form-control" name="phonenumber" onChange={onChangeHandler} value={formData.phonenumber} />
        </div>
        <div className="form-group">
          {/* <button className="btn" type="submit" >Submit</button> */}
          <Button variant="primary" className="btn" type='submit'>Submit</Button>{' '}
        </div>
      </form>
    </div>
    
  

  );
}

export default Form;

