import React from 'react';
import home from './home.jpg';

console.log(home);

const HomePage = () => {
    return (<img src={home} alt="Logo" style={{alignItems:'center', width:"50%",height:"50%", marginLeft:350}}/>)
}
// const HomePage = (props) => {
//     const {userName} = props
//     return (<div>
        
//         <img src={home} alt="home" style={{width:100, height:100}}/> 
//     </div>)
// }
export default HomePage;

