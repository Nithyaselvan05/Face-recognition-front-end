import Clarifai from 'clarifai';
import './App.css';
import React, {Component} from 'react';
import Navigation from './components/navigation/navigation'
import SignIn from './components/signin/signin'
import Logo from './components/logo/logo'
import ImageLinkForm from './components/imagelinkform/imagelinkform'
import FaceRecognition from './components/facerecognition/facerecognition'
import Rank from './components/Rank/Ranks'
import Particles from 'react-particles-js';
import Register from './components/register/register'
const app = new Clarifai.App({
 apiKey: '54af97c426854709bd4bc599c37da211'
});
const particleOptions={
                particles: {
                  number:{
                    value:100,
                    density:{
                      enable:true,
                      value_area:800
                    }
                  }
                }
              }
const initialState={
  input:'',
      imageUrl:'',
      box:{},
      route:'signin',
      isSignedIn:false,
      user:{
        email:'',
        id:'',
        name:'',
        entries:0,
        joined:''
      }
}
class App extends Component{
  constructor(){
    super();
    this.state=initialState;
  }
  loadUser=(data)=>{
    this.setState({user:{
      id:data.id,
      email:data.email,
      name:data.name,
      entries:data.entries,
      joined:data.joined
    }})
  }
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    // console.log(width,height)
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }
  displayFaceBox=(box)=>{
    // console.log(box)
    this.setState({box:box})
  }
  onInputChange=(event) =>{
    this.setState({input:event.target.value})
  }

  onButtonSubmit=()=>{

    this.setState({imageUrl:this.state.input})
    fetch('http://still-falls-96128.herokuapp.com/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
          })
        })
        .then(response=>response.json())
        .then(response=>{
          if(response){
            fetch('http://still-falls-96128.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
              })
            }).then(response=>response.json())
            .then(count=>{
              console.log(count)
              this.setState(Object.assign(this.state.user,{entries:count})
            )
            })
          }
       

        this.displayFaceBox(this.calculateFaceLocation(response))
            // console.log(response)
            // console.log("Hello")
            
        })
          // console.log(response.outputs[0].data.regions[0].region_info.bounding_box)

        
        .catch(err=>console.log(err))
        
       
      
  }
  onRouteChange=(route)=>{
    if(route==='signout'){
      this.setState(initialState)
    }
    else if(route==='home'){
      this.setState({isSignedIn:true})

    }
    this.setState({route:route})
  }
  render(){
    return(
      <div className="App">
        <Particles className="particles"
              params={particleOptions}
              
            /> 
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
        {this.state.route==='home'
        ?<div>
          
          
          <Logo/>
          <Rank name={this.state.user.name}
                entries={this.state.user.entries}/>
          <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
          <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
        </div>
        :(
          this.state.route==='signin'
          ?<SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
          :<Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
          )
      }
      </div>
      );
  }
}

export default App;
