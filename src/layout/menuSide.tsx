import { useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { TbCategoryFilled } from 'react-icons/tb';
import { FaUser } from 'react-icons/fa';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { GrPowerShutdown } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';

const MenuBar = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [navOpen, setNavOpen] = useState(false); // Para controle de toggle de menu em telas menores
  const navigate = useNavigate();

  const handleNavigate = (route: string | undefined) => {
    if (!route) return;
    navigate(route);
  };

  const menuItems = [
    {
      icon: <MdOutlineProductionQuantityLimits size={25} className="mr-4" />,
      text: 'Produto',
      submenu: [
        { name: 'Criar', route: '/products/create' },
        { name: 'Listar', route: '/products' },
      ],
    },
    {
      icon: <TbCategoryFilled size={30} className="mr-4" />,
      text: 'Categoria',
      submenu: [
        { name: 'Criar', route: '/categories/create' },
        { name: 'Listar', route: '/categories' },
      ],
    },
    {
      icon: <FaUser size={25} className="mr-4" />,
      text: 'Usuario',
      submenu: [
        { name: 'Criar', route: '/users/create' },
        { name: 'Listar', route: '/users' },
      ],
    },
  ];

  const handleDropdownToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="fixed top-0 left-0 h-full w-[320px] md:w-[250px] lg:w-[300px] bg-black duration-300">
      {/* Botão para abrir/fechar menu em dispositivos menores */}
      <div className="block md:hidden p-4">
        <button onClick={() => setNavOpen(!navOpen)} className="text-white">
          {navOpen ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
        </button>
      </div>

      {/* Navegação do menu */}
      <nav className={`${navOpen ? 'block' : 'hidden'} md:block`}>
        <ul className="flex flex-col p-4 text-gray-300">
          {menuItems.map(({ icon, text, submenu }, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={index} className="py-2">
                <div
                  className="flex items-center text-lg w-full cursor-pointer hover:bg-gray-700 p-2 rounded"
                  onClick={() => handleDropdownToggle(index)}
                >
                  {icon} {text}
                </div>

                {isOpen && (
                  <ul className="pl-6 mt-2 space-y-2">
                    {submenu?.map((subItem, subIndex) => (
                      <li key={subIndex} className="text-sm hover:bg-gray-600 p-2 rounded">
                        <button
                          onClick={() => handleNavigate(subItem.route)}
                          className="w-full text-left text-gray-200"
                        >
                          {subItem.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
          <div className="py-2">
            <div
              className="flex items-center text-lg w-full cursor-pointer hover:bg-gray-700 p-2 rounded"
              onClick={() => navigate('/logout')}
            >
              <GrPowerShutdown size={30} className="mr-4" /> Logout
            </div>
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default MenuBar;
