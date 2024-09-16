import { useAuth } from 'Contexts';
import { useState } from 'react';
import { AiOutlineMenu, AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import { BsFillCartFill } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const { currentUser } = useAuth();

  return (
    <div className="w-full mx-6 flex justify-between items-center p-8 shadow-sm bg-gray-800 ">
      <div className="flex items-center md:hidden">
        <button onClick={() => setNavOpen(!navOpen)} className="text-black">
          {navOpen ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
        </button>
      </div>

      <h1 className="text-2xl sm:text-3xl lg:text-4xl px-2">
        <span className="font-bold text-cyan-600">YY</span> <span className="font-bold">Sales</span>
      </h1>
      <div className="bg-gray-100 text-black hidden md:flex items-center rounded-md py-2 border border-black px-4">
        <FaUserCircle size={30} className="mr-3" />
        <div className="text-left">
          <h1 className="font-bold text-lg">{currentUser?.name}</h1>
          <h6 className="text-sm">{currentUser?.email}</h6>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
