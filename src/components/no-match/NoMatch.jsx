import {Link} from "react-router-dom";

export default function NoMatch(){
    return (
        <div style={{textAlign:"center"}}>
            <h1>
                There is nothing to display here
            </h1>
            <Link to="/home" style={{fontSize:20}}>Go home</Link>
        </div>
    )
}