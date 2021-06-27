import React from 'react'
class Register extends React.Component{
	constructor(props){
		super(props);
		this.state={
			email:'',
			password:'',
			name:''
		}
	}
	onEmailChange=(event)=>{
		this.setState({email:event.target.value})
	}
	onPasswordChange=(event)=>{
		this.setState({password:event.target.value})
	}
	onNameChange=(event)=>{
		this.setState({name:event.target.value})
	}
	onSubmit=()=>{
		fetch('http://still-falls-96128.herokuapp.com/register', {
    	  method: 'post',
    	  headers: {'Content-Type': 'application/json'},
    	  body: JSON.stringify({
    	    email: this.state.email,
    	    password: this.state.password,
    	    name:this.state.name
    	  })
    	})
    	.then(response=>response.json())
    	.then(user=>{
    		if(user.id){
    			this.props.loadUser(user)
    			this.props.onRouteChange('home'); 	 
    		}
    	})
		// .then(data=>{
		// 	console.log(data)
		// 	this.props.onRouteChange('home');
		// 	// if(data==="success"){

		// 	// }
		// })
    	
  }
	render(){
		return(
		<div>
			<div className="sans-serif w-90 white mw6 center relative cover bg-top mt2 shadow-5 pa4 black-80" >
      			<div id="overlay" className="absolute absolute--fill bg-navy o-70 z-unset"></div>
			
      			<div className="relative pa4 pa5-m">
      			  <h1 className="serif tracked ma0 mb4 pv3">Register</h1>
      			  
      			    <div className="mb3">
      			      <label htmFor="username" className="db f6 white-80 ttu ph2 mb2">Username</label>
      			      <input 
      			      type="text" 
      			      name="username" 
      			      className="input-reset db w-100 mw-100 white b pv2 ph3 bg-white-30 hover-bg-white-70 hover-gray outline-0 bn br-pill"
      			      onChange={this.onNameChange}
      			      />
      			    </div>
      			    <div className="mb3">
      			      <label htmlFor="username" className="db f6 white-80 ttu ph2 mb2">Email</label>
      			      <input 
      			      type="email" 
      			      name="email-address" 
      			      className="input-reset db w-100 mw-100 white b pv2 ph3 bg-white-30 hover-bg-white-70 hover-gray outline-0 bn br-pill"
      			      onChange={this.onEmailChange}
      			      />
      			    </div>
      			    <div className="mb4">
      			      <label htmlFor="password" className="db f6 white-80 ttu ph2 mb2">Password</label>
      			      <input 
      			      type="password" 
      			      name="password" 
      			      className="input-reset db w-100 mw-100 white b pv2 ph3 bg-white-30 hover-bg-white-70 hover-gray outline-0 bn br-pill"
      			      onChange={this.onPasswordChange}
      			      />
      			    </div>
      			    <div>
      			    	<input
		                onClick={this.onSubmit}
		                className="grow input-reset db w-100 light-gray f6 b ttu tracked pv3 ph3 pointer bg-dark-blue hover-bg-blue bn br-pill"
		                type="submit"
		                value="Register"
		              	/>
      			      
      			    </div>
      			 
      			  
      			  <div className="tc b f6 mt4 o-70 glow pa2 i">
      			    Have an account? <a onClick={()=>this.props.onRouteChange('signin')} className="white pointer" href="#">Sign in</a>
      			  </div>
      			</div>
    		</div>
  
		</div>
		);
	}
}
export default Register;