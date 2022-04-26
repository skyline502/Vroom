import { useHistory } from "react-router-dom";
import './Error.css'

const NotFound = () => {
  let history = useHistory();
  return (
    <div className="error-page">
      <h1>404 Not Found</h1>
      <img src='/r32.jpg' alt='404' style={{height: 300}}/>
      <button onClick={() => history.push('/')} className='back-btn'>Go home</button>
    </div>
  )
}

export default NotFound;
