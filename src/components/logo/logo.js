// import react from 'react';
import Tilt from 'react-tilt'
import './logo.css'
import logo from './logo.png'
const Logo=()=>{
	return(		
		<div className='ma4 mt0 '>
			<Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 100, width: 100 }} >
 			<div className="Tilt-inner boom"> <img src={logo} alt=""/> </div>
			</Tilt>
		</div>
		)
}
export default Logo;