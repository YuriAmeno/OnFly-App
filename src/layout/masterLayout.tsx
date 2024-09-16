import MenuBar from 'layout/menuSide';
import Navbar from 'layout/navBar';
import { Outlet } from 'react-router-dom';

const MasterLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-200">
      <div className="w-[285px] bg-gray-100 hidden md:block">
        <MenuBar />
      </div>
      <div className="flex-auto">
        <Navbar />
        <div className="p-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MasterLayout;

export { MasterLayout };
