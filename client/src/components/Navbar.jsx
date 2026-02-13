import { Link } from "react-router-dom";

const Navbar = ({ searchBar, setSearchBar }) => {

  return (
    <nav className="bg-yellow-300/85 text-white">
      <div className=" flex flex-col gap-1">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-s font-bold">
            <Link to="/" className=" transition">
              Lista
            </Link>
          </div>

          <div className="w-max p-2">
            <input
              type='text'
              value={searchBar}
              onChange={(e) => setSearchBar(e.target.value)}
              placeholder='Pesquise seu produto...'
              className='text-s text-gray-700 pl-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 rounded-full '
            >
            </input>
          </div>    

          <div>
            <ul className="flex space-x-8">
              <li>
                <Link to="/manager" className=" transition duration-300">
                  Gerenciador
                </Link>
              </li>
              <li>
                <Link href="#servicos" className="">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="container mx-auto flex justify-between items-center pb-2">
          <div className="text-s font-bold">
            <Link to="/" className=" transition">
              Lista
            </Link>
          </div>

          <ul className="flex space-x-8">
            <li>
              <Link to="/manager" className=" transition duration-300">
                Gerenciador
              </Link>
            </li>
            <li>
              <Link href="#servicos" className="">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;