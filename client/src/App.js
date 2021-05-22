/* eslint-disable jsx-a11y/anchor-is-valid */

import React,{useEffect,useState} from 'react';

import { BrowserRouter as Router,Link, Route} from "react-router-dom";
import CertificateAbi from './contracts/DigitalCertificate.json';
import Web3 from 'web3'
import './App.css';
import UniversityAdd from './UniversityAdd';
import CreateCertificate from './CreateCertificate';
import GetCertificate from './GetCertificate';
import Home from './Home';
import GetListCertificate from './GetListCertificate';


function App() {

  useEffect(() => {
   loadBlockchainData();
   setisLogin("0");
  }, [])
  const [isLogin,setisLogin]=useState();
  const[Certificate,setCertificate]=useState();
  
  const[UniversityName,SetUniversityName]=useState();
  
  
  const loadWeb3= async ()=>{
    if(window.ethereum){
      window.web3=new Web3(window.ethereum);
      
      try{
      await window.ethereum.request({method:'eth_requestAccounts'}).then().catch(async (err)=>{

        if(err.code===4001){
          console.log("İşlem İptal Edildi.");
          return false;
        }
        else{
          console.error(err);
        }
        
      });
      }
    
      catch(e){
             window.web=new Web3(new Web3.providers.WebsocketProvider('ws://localhost:7545'));
             return false;
      }

      return true;
    }
    else {
      console.error("hata");
      window.web=new Web3(new Web3.providers.WebsocketProvider('ws://localhost:7545'));
    }
  }

  const loadBlockchainData =async ()=>{
    
    const web3=new Web3(new Web3.providers.WebsocketProvider('ws://localhost:7545'));
    const networkId= await web3.eth.net.getId();
    const networkData= CertificateAbi.networks[networkId];
     if(networkData){
       const certificate=new web3.eth.Contract(CertificateAbi.abi,networkData.address);
       setCertificate(certificate);
     }else{
       console.error("no network Data");
     }
     
  }

  const getLogin=async ()=>{
    const isLoad=await loadWeb3();
    
    if(isLoad===true){
       const web3=window.web3;
        const accounts=await web3.eth.getAccounts();
        const account =accounts[0];
        
          if(typeof(account)!='undefined'){
             const login=await Certificate.methods.Login(account).call();
             return login;
             }
           else{
             return "0";
             
            }
  }
  else{
    console.log("Kullanıcı Girişi Olmadı");
  }
  }

const getUniversity=async ()=>{
   
    const web3t=window.web3;
        const accounts=await web3t.eth.getAccounts();
        const account =accounts[0];
       
    if(typeof(account)!='undefined'){
     
     try {
        const universityname= await Certificate.methods.getUniversity(account).call();
        SetUniversityName(universityname);
     }
     catch(e){
       console.error(e);
     }
  }
}

  const AddUniversity=async (address,name)=>{
        
        loadWeb3();
        const web3t=window.web3;
        const accounts=await web3t.eth.getAccounts();
        const account =accounts[0];
       
    if(typeof(address)!='undefined' && typeof(name)!='undefined' && typeof(account)!='undefined'){
      try{
        await Certificate.methods.addUniversity(address,name).send({from:account});
      }
      catch(e){
        const data = e.data;
    const txHash = Object.keys(data)[0]; // TODO improve
    const reason = data[txHash].reason;
    return reason
      }
    
   
      
      return "Add Successful.";
  }
    else{
      
      return "Error";

    }
    
    
  }

  const createCertificate= async(name,department,startingtime,graduationtime,average)=>{
    
        loadWeb3();
        const web3t=window.web3;
        const accounts=await web3t.eth.getAccounts();
        const account =accounts[0];
        if(typeof(name)!='undefined' &&typeof(name)==='string' && typeof(department)!='undefined' && typeof(department)==='string' &&typeof(startingtime)!='undefined' 
        && typeof(startingtime)==='string' && typeof(graduationtime)!='undefined' && typeof(graduationtime)==='string' && typeof(average)!='undefined'
        && typeof(average)==='string' && typeof(account)!='undefined'){
          try{
              await Certificate.methods.generateCertificate(name,department,startingtime,graduationtime,average).send({from:account,gas:'3000000',gasPrice:'30000000'});
          }
          catch(e){
            const data = e.data;
            const txHash = Object.keys(data)[0]; // TODO improve
            const reason = data[txHash].reason;
            return reason;
          }
              const events=await Certificate.getPastEvents('GenerateCertificate');
         
            return events[0].raw.data
            
        }
  }
 const StringToInt=(int)=>{
    return parseInt(int);
  }
  const getCertificateCount=async ()=>{
    
    let stringcount=null;
    try{
     stringcount=await Certificate.methods.getTotalCertificate().call();
    }catch(e){
        return e;
    }
     return StringToInt(stringcount);
  }
  const getListCertificate=async(count)=>{
     
    
      let web3t=window.web3;
      let accounts=await web3t.eth.getAccounts();
      
    const account =accounts[0];
      let values=null;
        
        
        try{
       values=await Certificate.methods.getCertificateList(count,account).call();
       
      }
      catch(e){
        
      }  
      return values;
  }
  // eslint-disable-next-line no-unused-vars
    const getCertificate=async(address)=>{
      if(typeof(address)!='undefined' && typeof(address)=='string'){
         let certificate;
        try{
            certificate= await Certificate.methods.getData(address).call().catch(revertReason=>{return null;});;
        }catch(e){
            return null;
        }
        if(certificate[0]!==""){
          
          return certificate;
        }
        return null;
        
      }
      else{
        return null;
      }
    }

  const Login=()=>{
    return(
     
     <button  className='btn btn-color btn-primary' onClick={async(e)=>{
         const log=await getLogin();
         if(log==="2"){
            getUniversity();
          }
          setisLogin(log);
         console.log(log);
          
      }}>Sign In</button>
    );
  }
  const AdminMenu=()=>{
    return(
       <li class="nav-item">
           <Link to="/AddUniversity" className="nav-link">Add University</Link>
        </li>
      
    );
  }
  const UniversityMenu=()=>{
    return(
     <li class="nav-item">
           <Link to="/CreateCertificate" className="nav-link">Create Certificate</Link>
        </li>
    ) 
  }
 const UniversityMenu2=()=>{
    return(
     <li class="nav-item">
           <Link to="/GetListCertificate" className="nav-link">Get Certificate List</Link>
        </li>
        
    ) 
  }
  
  return (
    <div className="App">
     <Router>
    <nav class="navbar navbar-expand-lg navbar-dark navbar-color">
  <div class="container-fluid">
    <Link to="/" className="navbar-brand">Digital Certificate</Link>
    
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <Link to="/GetCertificate" className="nav-link">Search Certificate</Link>
        </li>
       {isLogin==="1" && AdminMenu()}
       {isLogin==="2" && UniversityMenu()}
       {isLogin==="2" && UniversityMenu2()}
      </ul>
      <div className="d-flex">
        {isLogin==="0"&&Login()}
        
        <a className="nav-link text-light">  {isLogin==="1" && "Super Admin"} </a>
      <a className="nav-link text-light">  {isLogin==="2" && UniversityName} </a>
      </div>
      </div>

  </div>
</nav>

<Route exact path="/" ><Home/></Route>
<Route path="/GetCertificate"><GetCertificate contract={getCertificate}></GetCertificate></Route>
<Route path="/AddUniversity"><UniversityAdd universityadd={AddUniversity}></UniversityAdd></Route>
<Route path="/CreateCertificate"><CreateCertificate createcert={createCertificate}></CreateCertificate></Route>
<Route path="/GetListCertificate"><GetListCertificate contract={getListCertificate} contract2={getCertificateCount}></GetListCertificate></Route>
</Router>

    </div>
  );
  }

export default App;

//0x13ae563133546c357705daadb7d9951909886eedf23767c213695af76a4e0e14
/* <nav className="navbar navbar-dark bg-dark shadow ">
      <p className="navbar-brand my-auto"> Digital Certificate </p>
        <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
      
      </li>
      {isLogin==="1" &&<AdminMenu></AdminMenu>}
    </ul>
      
      
      <ul  className="navbar-nav is-active">
        {isLogin==="0" &&<Login></Login>}
        
        
          
       
        <li className="nav-item text-white"></li>
      </ul>

      </nav>  */