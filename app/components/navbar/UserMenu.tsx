"use client";
import { AiOutlineMenu } from "react-icons/ai";
import { BiGlobe } from "react-icons/bi";
import Avatar from "../Avatar";
import { useCallback, useState, useRef } from "react";
import MenuItem from "./MenuItem";
import useOutsideClick from "../../hooks/useOutsideClick";

const UserMenu = () => {
  const ref = useRef();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  useOutsideClick(ref, () => setIsOpen(false));

  return (
    <div className='relative'>
      <div className='flex flex-row items-center gap-3'>
        <div className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer'>
          Airbnb your home
        </div>

        <div className='flex justify-center items-center hover:bg-neutral-100 cursor-pointer w-[40px] h-[40px] rounded-full transition p-3'>
          <BiGlobe />
        </div>

        <div
          onClick={toggleOpen}
          className='p-4 md:py-1 md:px-2 border-[1px]  border-neutral-200  flex  flex-row  items-center  gap-3  rounded-full cursor-pointer hover:shadow-md transition'
        >
          <div className=''>
            <AiOutlineMenu />
          </div>

          <div className='hidden md:block'>
            <Avatar src='' />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          ref={ref}
          className='
          absolute 
          rounded-xl 
          shadow-md
          w-[40vw]
          md:w-3/4 
          bg-white 
          overflow-hidden 
          right-0 
          top-12 
          text-sm
          '
        >
          <div className='flex flex-col cursor-pointer'>
            <>
              <MenuItem onClick={() => {}} label='Sign up' />
              <MenuItem onClick={() => {}} label='Log in' />
              <hr className='h-px bg-gray-200 border-0'></hr>
              <MenuItem onClick={() => {}} label='Airbnb your home' />
              <MenuItem onClick={() => {}} label='Help' />
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;