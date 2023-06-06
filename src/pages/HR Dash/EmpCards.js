import React from 'react'

const EmpCards = ({name,email,emp_code,doj}) => {
  return (
    <div className='emp-cards-container'>
        <div className='card-block'>
            <div className='emp-name'>
                <h2>{name}</h2>
            </div>
            <div className='emp-email'>
                <span>{email}</span>
            </div>
            <div className='emp-emp_code'>
                <h3>{emp_code}</h3>
            </div>
            <div className='emp-doj'>
                <span>{doj}</span>
            </div>
        </div>
    </div>
  )
}

export default EmpCards