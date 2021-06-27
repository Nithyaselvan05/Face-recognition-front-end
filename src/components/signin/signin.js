import React from 'react'
class SignIn extends React.Component{
	constructor(props){
		super(props);
		this.state={
			signInEmail:'',
			signInPassword:''
		}
	}
	
	onEmailChange=(event)=>{
		this.setState({signInEmail:event.target.value})
	}
	onPasswordChange=(event)=>{
		this.setState({signInPassword:event.target.value})
	}
	onSubmitSignIn=()=>{
		fetch('http://still-falls-96128.herokuapp.com/signin', {
    	  method: 'post',
    	  headers: {'Content-Type': 'application/json'},
    	  body: JSON.stringify({
    	    email: this.state.signInEmail,
    	    password: this.state.signInPassword
    	  })
    	}).then(response=>response.json())
		.then(user=>{
			if(user.id){
				// console.log(user)
				this.props.loadUser(user)
				this.props.onRouteChange('home');
			}
		})
    	// this.props.onRouteChange('home');
    	  
    	  	
    	  
    	  	
    	 
  }
	render(){
		const {onRouteChange}=this.props
		return(
		
			
		<div >
			<div className="sans-serif w-90 white mw6 center relative cover bg-top mt2 shadow-5 pa4 black-80 " >
      			<div id="overlay" className="absolute absolute--fill bg-navy o-70 z-unset"></div>
			
      			<div className="relative pa4 pa5-m">
      			  <h1 className="serif tracked ma0 mb4 pv3">Sign In</h1>
      			  
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
		                className="grow input-reset db w-100 light-gray f6 b ttu tracked pv3 ph3 pointer bg-dark-blue hover-bg-blue bn br-pill"
		                type="submit"
		                value="Sign in"
		                onClick={this.onSubmitSignIn}
		              	/>
      			      
      			    </div>
      			
      			  
      			  <div className="tc b f6 mt4 o-70 glow pa2 i">
      			    New Member? <a onClick={()=>onRouteChange('register')} className="white" href="#">Register</a>
      			  </div>
      			</div>
    		</div>
  
		</div>
		);
	}
	
}
export default SignIn;
