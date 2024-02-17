import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="bg-light-mint min-h-screen">
      <h1 className="text-3xl font-bold underline">
        Welcome to CWUsers MLP Crimson Code Hackathon 2024
      </h1>
      <Link to="/todos" className="text-blue-500 hover:text-blue-800">Go to Todo Page</Link>
    </div>
  );
}

export default HomePage;

