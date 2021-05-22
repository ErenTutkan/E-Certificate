import React,{useState,useEffect} from 'react'

const GetListCertificate = ({contract,contract2}) => {
     function CertificateList(hash,studentname,department){return {hash,studentname,department}
      }
      function Studentname(studentname){
        if(studentname!==""){
            return studentname;
        }
        return null
      }
      const [isLoad,setLoad]=useState(true);
      
  const [Data,SetData]=useState([]);

     useEffect(() => {
   GetData();
   document.title="Certificate List"
  },[])
   const GetData=async()=>{
                    const count=await contract2();
                    let i=0;
                    let values;
                    do{ 
                        values=await contract(i);
                     i++;
                     
                     
                     if(values!==null){
                        if(Studentname(values[1])!==null){
                            Data.push(CertificateList(values[0],values[1],values[2]));  
                        }
                     }
                     else{  
                     }
                    }while(count>i)
                  
                     setLoad(false);
                } 

let listitem;
  listitem=Data.map((d)=>(
                            <tr>
                                 <th>{d.hash}</th>
                                 <th>{d.studentname}</th>
                                 <th>{d.department}</th>
                             </tr> 
                )) 
                
   if(isLoad){
      
      return(<div></div>);
  }
    return (
        <div className="content">
          <div className="row justify-content-center ">
              <div className="col-8 p-3 border border-black">
                  <h1>Certificate List</h1>
                    <h1>Search</h1>
                
                  <table className="table">
                      <thead>
                          <tr >
                              
                              <th scope="col">Hash</th>
                              <th scope="col">Student Name</th>
                              <th scope="col">Department </th>
                          </tr>
                      </thead>
                      <tbody>
                      {listitem}
                      </tbody>
                  </table>
              </div>
          </div>
        </div>
    );
}

export default GetListCertificate;
