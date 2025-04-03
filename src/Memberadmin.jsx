import Addingmember from './Addingmember'
import './memadmin.css'
import React from 'react'
import Seemember from './Seemember'

const Memberadmin = () => {
  return (
    <div className='adminpage'>
      <div className="navigation">
        <center><p>Vachadandi Hookgadu!!</p></center>
      </div>
      <div className="main">
        <Addingmember />
        <Seemember />
      </div>
    </div>
  )
}

export default Memberadmin