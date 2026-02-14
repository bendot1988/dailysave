
import React from 'react';
import { LOGO_GRADIENT } from '../constants';

const Header: React.FC = () => {
  return (
    <header className="flex flex-col items-center text-center">
      <div className={`${LOGO_GRADIENT} px-6 py-2 rounded-full shadow-lg transform -rotate-2 hover:rotate-0 transition-all duration-300 cursor-default group`}>
        <h1 className="text-white text-3xl font-extrabold flex items-center gap-2">
          <span className="text-4xl group-hover:scale-125 transition-transform duration-300 inline-block">💰</span>
          DaySaver
        </h1>
      </div>
      <p className="text-white font-medium mt-4 text-xl tracking-wide opacity-90">
        Make big goals feel small
      </p>
    </header>
  );
};

export default Header;
