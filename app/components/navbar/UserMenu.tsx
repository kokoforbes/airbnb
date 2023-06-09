"use client";
import { useRouter } from "next/navigation";
import { AiOutlineMenu } from "react-icons/ai";
import { BiGlobe } from "react-icons/bi";
import Avatar from "../Avatar";
import { useCallback, useState, useRef } from "react";
import MenuItem from "./MenuItem";
import useOutsideClick from "../../hooks/useOutsideClick";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRentModal from "@/app/hooks/useRentModal";

import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const ref = useRef<HTMLHeadingElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  useOutsideClick(ref, () => setIsOpen(false));

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    //open rent modal
    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  return (
    <div className='relative'>
      <div className='flex flex-row items-center gap-3'>
        <div
          onClick={onRent}
          className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer'
        >
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
            <Avatar src={currentUser?.image} />
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
              {currentUser ? (
                <>
                  <MenuItem onClick={() => {}} label='Messages' />
                  <MenuItem onClick={() => {}} label='Notifications' />
                  <MenuItem
                    onClick={() => router.push("/trips")}
                    label='Trips'
                  />
                  <MenuItem
                    onClick={() => router.push("/properties")}
                    label='My properties'
                  />
                  <MenuItem
                    onClick={() => router.push("/reservations")}
                    label='Reservations'
                  />
                  <MenuItem
                    onClick={() => router.push("/favorites")}
                    label='Wishlists'
                  />
                  <hr className='h-px bg-gray-200 border-0'></hr>
                  <MenuItem
                    onClick={rentModal.onOpen}
                    label='Airbnb your home'
                  />
                  <MenuItem onClick={() => {}} label='Account' />

                  <hr className='h-px bg-gray-200 border-0'></hr>
                  <MenuItem onClick={() => {}} label='Help' />
                  <MenuItem onClick={() => signOut()} label='Log out' />
                </>
              ) : (
                <>
                  <MenuItem onClick={registerModal.onOpen} label='Sign up' />
                  <MenuItem onClick={loginModal.onOpen} label='Log in' />
                  <hr className='h-px bg-gray-200 border-0'></hr>
                  <MenuItem onClick={onRent} label='Airbnb your home' />
                  <MenuItem onClick={() => {}} label='Help' />
                </>
              )}
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
