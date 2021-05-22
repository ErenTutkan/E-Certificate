import React, { useState } from 'react'

const UniversityGet = ({ contract }) => {
    
    const[UniversityName,setUniversityName]=useState();
    const[UniversityAddress,setUniversityAddress]=useState();
   
    
   
 
  
    

    return (
         <div className="content">
                <h1>Get University</h1>
                <form onSubmit={async (event)=>{
                    event.preventDefault()
                    const address=UniversityAddress.value;
                    const name=await contract(address);
                    setUniversityName(name);
                }

                }>
                    <div className="form-group mb-3">
                     <label for="exampleFormControlInput1" className="form-label">Address</label>
                     <input id="universityAddress" type="text" className="form-control" ref={(input)=>{
                         setUniversityAddress(input);
                     }}   placeholder="0x.." required/></div>
                    <div className="form-group mb-3">
                    </div>
                    <button type="submit" className="btn btn-primary">Ara</button>
                    <div>{UniversityName}</div>
            </form>
            </div>
    )
}

export default UniversityGet
