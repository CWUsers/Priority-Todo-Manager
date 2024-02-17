import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="bg-light-mint min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold underline">
        CWUsers Todo Application Home
      </h1>
      <b>Developed for MLP Crimson Code Hackathon 2024</b>
      <Link to="/todos" className="text-blue-500 hover:text-blue-800 mt-4">Go to Todo Page</Link>
    </div>
  );
}

export default HomePage;

