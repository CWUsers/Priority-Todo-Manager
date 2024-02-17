import { Link } from 'react-router-dom';
import crimsonImg from '../public/crimson.png';
import cwuImg from '../public/cwu.png';

function HomePage() {
  return (
    <div className="bg-light-mint min-h-screen flex flex-col justify-center items-center">
      <img src={crimsonImg} alt="Crimson Code Logo" className="absolute top-0 left-0 mb-4 w-1/6"/>
      <img src={cwuImg} alt="CWU School Logo" className="absolute top-0 right-0 mb-4 w-1/2"/>
      <h1 className="text-3xl font-bold underline">
        CWUsers Todo Application Home
      </h1>
      <b>Developed for MLP Crimson Code Hackathon 2024</b>
      <Link to="/todos" className="text-blue-500 hover:text-blue-800 mt-4">Go to Todo Page</Link>
    </div>
  );
}

export default HomePage;

