/* eslint-disable react/style-prop-object */
import React,{useState} from 'react'
import Pdf from "react-to-pdf";
import WebFont from 'webfontloader';
const GetCertificate = ({contract}) => {
    

    const[CertificateAddress,setCertificateAddress]=useState();
    const [Data,setData]=useState();
    const[Show,setShow]=useState(false);
    const[Name,setName]=useState();
    const[Department,setDepartment]=useState();
    const[University,setUniversity]=useState();
    const[Starting,setStarting]=useState();
    const[Granduation,setGranduation]=useState();
    const[Average,setAverage]=useState();
    const ref=React.createRef();
    WebFont.load({
        google:{
            families:['Raleway Sans','Raleway Serif']
        }
    })

    const Certificate =()=>{
        return( <div class="container-fluid" >
            <div class="row justify-content-center">
                <div ref={ref} class="col-7 position-relative border border-5 border-primary p-3 bg-color align-self-center rounded    ">
                    <div class="border border-4 border-success p-1 rounded bg-color-2">
                    <div class="border border-3 border-primary rounded bg-div-color p-2">
                        <h1 class="text-center mt-2 text-color-title font-loader">Certificate</h1>
                        <h3 class="text-center font-loader">Student Name: {Name}</h3>
                        <h4 class="text-center mt-2 font-loader">Department: {Department}</h4>
                        <h4 class="text-center mt-2 font-loader">Date: {Starting}/{Granduation}</h4>
                        <h4 class="text-center mt-2 mb-5 font-loader">University: {University}</h4>
                        <h4 class="text-center mt-2 mb-5  font-loader">Average: {Average}</h4>
                        <h4 class="text-end mr-1font-loader">Signed</h4><h6 class="text-end font-loader">{CertificateAddress.value}</h6>
                    </div>
                </div>
                </div>
            
            </div>
<Pdf targetRef={ref} filename={CertificateAddress.value}>
                {({toPdf})=> <button onClick={toPdf} className="btn btn-primary text-center mt-3">Generate Pdf</button>}

            </Pdf>
        </div>)
    }
     
  
    return (
        <div className="row justify-content-center w-100">
        <div className="col-8 content border border-black ">
            
                <h1>Search Certificate</h1>
                <form onSubmit={async (event)=>{
                    event.preventDefault()
                    const address=CertificateAddress.value;
                    setCertificateAddress(CertificateAddress.value);
                    const data=await contract(address);
                    if(data===null){
                        setData("Veri Bulunamadı")
                    }
                    else{
                   
                    setName(data[0]);
                    setDepartment(data[1]);
                    setUniversity(data[2]);
                    setStarting(data[3]);
                    setGranduation(data[4]);
                    setAverage(data[5]);
                   
                    setShow(true);
                    }
                    
                }
                

                }>
                    
                    <div className="form-group mb-3">
                     <label for="exampleFormControlInput1" className="form-label">Address</label>
                     <input id="universityAddress" type="text" className="form-control mr-1 ml-1" ref={(input)=>{
                        setCertificateAddress(input);
                     }}   placeholder="0x.." required/></div>
                    <div className="form-group mb-3">
                    </div>
                    <button type="submit" className="btn btn-primary mb-3">Ara</button>
                    <div>{Data}</div>
                    <div><h4>{Show&& <Certificate></Certificate>}</h4></div>
                    
            </form>
            
            </div>
            </div>
    )
}

export default GetCertificate
