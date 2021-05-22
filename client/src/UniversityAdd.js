import React,{useState} from 'react'

const UniversityAdd = ({universityadd}) => {
    
  
    const [UniversityAddress,setUniversityAddress]=useState();
    const [UniversityName,setUniversityName]=useState();
    const [isSuccessful,setSeccessful]=useState();
    return (
            <div className="row justify-content-center m-0 ">
                <div className="col-8 p-0 border border-black">
                <h1>Add University</h1>
                <form onSubmit={async (event)=>{
                    event.preventDefault();
                    const address=UniversityAddress.value;
                    const name=UniversityName.value;
                    console.log(address);
                    console.log(name)
                    const succ=await universityadd(address,name);
                    console.log(succ);
                    setSeccessful(succ);
                    console.log(isSuccessful);
                }

                }>
                    <div className="form-group p-2">
                     <label for="exampleFormControlInput1" className="form-label">Address</label>
                     <input id="universityAddress" type="text" className="form-control " ref={(input)=>{
                         setUniversityAddress(input);
                     }}   placeholder="0x.." required/></div>
                    <div className="form-group p-2">
                    <label for="exampleFormControlInput1" className="form-label">University Name</label>
                    <input id="universityName" type="text" className="form-control mr-1 ml-1" ref={(input)=>{
                        setUniversityName(input);
                    }}   placeholder="Trakya University" required/>
                    </div>
                    <button type="submit" className="btn btn-primary mb-3">Ekle</button>
                    <div><h4>{isSuccessful}</h4></div>
            </form>
            </div>
            </div>
    )
}

export default UniversityAdd;
