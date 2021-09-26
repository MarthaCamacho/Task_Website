import React, { useState, useEffect } from 'react';
import axios from 'axios'
import '../styles/index.scss';
import { Link} from "react-router-dom";


export const SignIn = () => {
  const [datos, setData] = useState([]);

  // useEffect(() => {
  //   axios.get('http://localhost:5000/api/task')
  //     .then(res => res.data)
  //     .then(data => { setData(data) })
  // }, []);

  const urlImage = 'https://images.pexels.com/photos/3724816/pexels-photo-3724816.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260';

  const [valuesData, setValuesData] = useState({
    title: '',
    description: ''
  })

  const handleChangeData = (e) => {
    const { name, value } = e.target;
    setValuesData({ ...valuesData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (valuesData.title === '' || valuesData.description === '') {
      alert("FALTA UN CAMPO")
    } else {
      axios.post('http://localhost:5000/api/user', {
        title: valuesData.title,
        description: valuesData.description
      })
        .then(res => console.log("REspuesta", res))
        .catch(error => console.log(error))
    }
  }

  console.log("arreglo", valuesData)


  return (
    <div className='signIn'>
      <div className='signIn-imageContent' style={{ backgroundImage: `url(${urlImage})`, backgroundSize: 'cover' }}>
        <div className='signIn-imageText'>Hello, Friend</div>
        <div className='signIn-imageText_subtitle'>Please sign to enter</div>
      </div>
      <div className='signIn-formContent'>
        <form className='form' onSubmit={handleSubmit}>
          <span className= 'form-title'>Sign In</span>
          <input className='form-input' type="text" name="title" value={valuesData.title} onChange={handleChangeData} placeholder='Email' />
          <input className='form-input' type="text" name="description" value={valuesData.description} onChange={handleChangeData} placeholder='Password'/>
          <button className='form-button' type="submit">Send</button>
          <span className='form-text'>First time here? <Link to="/register" className='form-text_Secondary' >Log In</Link></span>
        </form>
      </div>
    </div>
  )
};
