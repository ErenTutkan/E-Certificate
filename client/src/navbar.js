import React from 'react'

const navbar = ({account}) => {
    
    return (
         <nav className="navbar navbar-dark bg-dark shadow mb-5 ">
      <p className="navbar-brand my-auto"> Digital Certificate </p>
      <ul  className="navbar-nav is-active">
        <form onSubmit={async (e)=>{
          e.preventDefault();
          const loginvalue=await account();
           console.log(loginvalue);
        
        }}>
          
        <button className='btn btn-primary ' type="submit">Sign In</button>
        </form>
        <li className="nav-item text-white"></li>
      </ul>

      </nav>
    )
}

export default navbar
