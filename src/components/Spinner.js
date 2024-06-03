import React from 'react'
import loading from './spinner.gif'

const Spinner = () => {
  return (
    <div className='text-center'>
      <img className='my-3' src={loading} alt="" width={30} height={30} />
    </div>
  ) 
}

export default Spinner
