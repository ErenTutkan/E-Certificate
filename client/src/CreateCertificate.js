import React,{useState} from 'react'

const CreateCertificate = ({createcert}) => {
    const [Name,setName]=useState();
    const [Department,setDepartment]=useState();
    const [StartingTime,setStartingTime]=useState();
    const [GranduationTime,setGranduationTime]=useState();
    const [Average,setAverage]=useState();
    const [isSuccessful,setSeccessful]=useState();
    const ToDate=(date)=>{
        console.log(typeof(date));
        
        
       var parts=date.split("-");
        var day=parts[2];
        var mount=parts[1];
        var year=parts[0];

        var string=day+"-"+mount+"-"+year;
        return string;
    }
    return (
        <div>
            <div className="content">
                <div className="row justify-content-center m-0 ">
                <div className="col-8 p-0 border border-black">
                <h1>Add Certificate</h1>
                <form onSubmit={async (event)=>{
                    event.preventDefault();
                    console.log(ToDate(StartingTime.value))
                   // console.log(Name.value+ " type:" +typeof(Name.value) +"  "+ Department.value +"type:"+typeof(Department.value)+ "  "+ StartingTime.value+"type: "+typeof(StartingTime.value))
                  // await createcert('eren','btbs','01','01','01');
                   const succ= await createcert(Name.value,Department.value,ToDate(StartingTime.value),ToDate(GranduationTime.value),Average.value);
                  setSeccessful(succ);
                }

                }>
                    <div className="form-group mb-3 p-2">
                        <label className="form-label">Name</label>
                        <input id="name" type="text" className="form-control" ref={(input)=>{
                            setName(input);
                        }} placeholder="İsim Soyisim" required/> 
                         </div>
                    <div className="form-group mb-3 p-2">
                        <label className="form-label">Bölüm</label>
                        <input id="department" type="text" className="form-control" ref={(input)=>{
                            setDepartment(input);
                        }} placeholder="Bölüm" required/> 
                         </div>
                        <div className="form-group mb-3 p-2">
                       <label className="form-label">Başlangıç Tarihi</label>
                       <input id="starting-date" type="date" className="form-control" ref={
                           (input)=>{setStartingTime(input)}
                       } required/>
                       </div>

                       <div className="form-group mb-3 p-2">
                            <label className="form-label">Bitiriş Tarihi</label>
                       <input id="granduation-date" type="date" className="form-control" ref={
                           (input)=>{setGranduationTime(input)}
                       } required/>
                         </div>
                          <div className="form-group mb-3 p-2">
                        <label className="form-label">Ortalama</label>
                        <input id="department" type="text" className="form-control" ref={(input)=>{
                            setAverage(input);
                        }} placeholder="Ortalama:3.7 " required/> 
                         </div>

                    <button type="submit" className="btn btn-primary mb-3">Sertifika Ekle</button>
            </form>
            <div><h4>{isSuccessful}</h4></div>
            </div>
        </div>
        </div></div>
    )
}

export default CreateCertificate
