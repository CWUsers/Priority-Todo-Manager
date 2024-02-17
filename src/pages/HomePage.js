import { Link } from 'react-router-dom';
import crimsonImg from '../public/crimson.png';
import cwuImg from '../public/cwu.png';

function HomePage() {
  return (
    <div className="bg-light-mint min-h-screen flex flex-col">
      {/* Blue background wrapper */}
      <div className="bg-light-blue w-full flex justify-between p-4">
        <img src={crimsonImg} alt="Crimson Code Logo" className="w-1/12"/>
        <img src={cwuImg} alt="CWU School Logo" className="w-1/4"/>
      </div>
      
      {/* Content */}
      <div className="flex flex-col items-center mt-4 p-4">
        <h1 className="text-3xl font-bold underline">
          CWUsers Todo Application Home
        </h1>
        <b>Developed for MLP Crimson Code Hackathon 2024</b>
        <Link to="/todos" className="text-blue-500 hover:text-blue-800 mt-4">Go to Todo Page</Link>
      </div>
    </div>
  );
}

export default HomePage;

