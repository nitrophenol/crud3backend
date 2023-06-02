import Table from 'react-bootstrap/Table';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Updateform from './update';
function BasicExample() {
  const [data, setData] = useState([]);
  let count=1;
  let arr=[];
  function inc()
  {
    count=count+1
  }
  
  const[bool,setbool]=useState(false)

  useEffect(() => {
    axios.get('http://localhost:3001/users/')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

const handlupdate = async (item) => {
  console.log(item)
   setbool(!bool)
  // const res = await axios.put(`http://localhost:3001/update/${item._id}`, { name: item.name, email: item.email, hobbies: item.hobbies })
  //   .then((res) => { console.log(res) })
  //   .catch((err) => { console.log(err) })

  // console.log(res)
  handldelete(item)
}
  const handldelete = async (item) => {
    console.log(item)
    const res = await axios.delete(`http://localhost:3001/delete/${item._id}`)
    .then((res) => { console.log(res) })
    .catch((err) => { console.log(err) })

    console.log(res)
  }

  const handleonchange = (item) => {
    console.log(arr)
    const Bruno = arr.find((i) => i._id === item._id)
    if (Bruno!==undefined) {
      arr=arr.filter((i) => i._id !== item._id)
      return
    }
     arr.push(item)
  };
  const postdata = async() => {
    console.log(arr)
    const res = await axios.post('http://localhost:3001/post/', { arr })
    console.log(res)
  }
  return (
    <div>

     


    <Table striped bordered hover>
    


      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>email</th>
          <th>phonenumber</th>
          <th>hobbies</th>
          <th>checkbox</th>
          <th>Delete/Update</th>

        </tr>
      </thead>
      <tbody>
       
        {
     data.map(item=>(
      <tr key={item._id}>
        
        <td>{count}</td>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.phonenumber}</td>
        <td>{item.hobbies}</td>
          <td>   <input type="checkbox" id={item._id} onChange={() => handleonchange(item)} /> </td>
          <td><Button variant="primary" className="btn" onClick={() => handldelete(item)} >Delete</Button>{' '} <Button variant="primary" className="btn" onClick={() => handlupdate(item)} >Update</Button>{' '}  </td>
          { bool===true && <Updateform item={item._id} />
            
          }
          
        {inc()}
      </tr>

     ))

        }
      </tbody>
    </Table>
    <div className='btn1'>
    <Button variant="primary" className="btn" onClick={postdata}>Send</Button>{' '}
    </div>
   </div>
  );
}

export default BasicExample;