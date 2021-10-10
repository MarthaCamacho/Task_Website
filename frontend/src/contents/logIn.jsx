import React, { useState, useEffect } from 'react';
import axios from 'axios'
import '../styles/index.scss';

export const LogIn = () => {

  const urlImage = 'https://images.pexels.com/photos/1076885/pexels-photo-1076885.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260';

  const [valuesData, setValuesData] = useState({
    name: '',
    email: '',
    password:''
  })

  const handleChangeData = (e) => {
    const { name, value } = e.target;
    setValuesData({ ...valuesData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (valuesData.name === '' || valuesData.email === '' || valuesData.password === '') {
      alert("Por favor diligencie todos los campos")
    } else {
      axios.post('http://localhost:5000/api/user', {
        name: valuesData.name,
        email: valuesData.email,
        password: valuesData.password
      })
        .then(res => console.log("Respuesta", res))
        .then(alert("Registro exitoso"))
        .then(() => setValuesData({
          name: '',
          email: '',
          password:''
        }))
        .catch(error => console.log(error))
    }
  }

  return (
    <div className='signIn'>
      <div className='signIn-formContent'>
        <form className='form' onSubmit={handleSubmit}>
          <span className='form-title'>Register</span>
          <input className='form-input' type="text" name="name" value={valuesData.name} onChange={handleChangeData} placeholder='Name' />
          <input className='form-input' type="text" name="email" value={valuesData.email} onChange={handleChangeData} placeholder='Email' />
          <input className='form-input' type="password" name="password" value={valuesData.password} onChange={handleChangeData} placeholder='Password' />
          <button className='form-button' type="submit">Send</button>
        </form>
      </div>
      <div className='signIn-imageContent' style={{ backgroundImage: `url(${urlImage})`, backgroundSize: 'cover' }}>
        <div className='signIn-imageText'>Welcome!!</div>
        <div className='signIn-imageText_subtitle'></div>
      </div>
    </div>
  )
};
