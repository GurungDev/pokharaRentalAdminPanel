"use client";
import React, { useState } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { FaBars } from "react-icons/fa6";
import { RiDashboard3Fill } from "react-icons/ri";
import { HiUsers } from "react-icons/hi2";
import { MdPayments } from "react-icons/md";
import { LiaStoreSolid } from "react-icons/lia";
import { CiLogout } from "react-icons/ci";
import { resetLogin } from "../../redux/slices/userSlice";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useStore } from "react-redux";

const Navbar = () => {
  const links = [
    { path: "/admin/dashboard", name: "DashBoard", logo: <RiDashboard3Fill /> },
    { path: "/admin/users", name: "Users", logo: <HiUsers /> },
    { path: "/admin/stores", name: "Stores", logo: <LiaStoreSolid /> },
   ];
  const [isOpen, setIsOpen] = useState(false);
  const { push } = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const store = useStore();

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <div className="bg-secondary h-[100vh]">
      {" "}
      <div className="lg:hidden my-5 mx-6">
        {" "}
        <button
          onClick={toggleDrawer}
          className="hover:rotate-180 duration-300"
        >
          <FaBars className="text-white text-2xl" />
        </button>
        <Drawer open={isOpen} direction="left" size={300} className="">
          <div className=" h-[100vh] bg-[#333] shadow ">
            <div className="w-[90%] m-auto text-neutral-200 py-8     text-center">
              <h1 className="text-[1.5rem]  border-b-[2px] rounded border-blue-600 flex items-center gap-5 ">
                <Image
                  src={"/logo.png"}
                  alt="logo"
                  width={50}
                  height={50}
                  className=""
                ></Image>
                <span>Pokhara Rentals</span>
              </h1>

              <div className="grid gap-3 w-full mt-10">
                {links.map((e, index) => {
                  return (
                    <Link
                      onClick={() => {
                        toggleDrawer();
                      }}
                      className={`${
                        pathname === e.path
                          ? "bg-neutral-700"
                          : "bg-neutral-600"
                      }  px-5 w-full text-left rounded-md py-[.6em] shadow-md hover:bg-neutral-700 duration-300 flex items-center gap-2`}
                      key={index}
                      href={e.path}
                    >
                      <div className="w-[10%] text-[1.5rem] ">{e.logo}</div>
                      <div className="w-[85%] text-[.9rem] ">{e.name}</div>
                    </Link>
                  );
                })}
              </div>

              <div className="absolute bottom-8  w-full">
                <button
                  onClick={() => {
                    dispatch(resetLogin());
                    push("/");
                  }}
                  className="hover:border-blue-600 duration-500 hover:text-blue-600 border-[#333] border-b-[2px]  flex w-[45%]  gap-2 items-center justify-center  "
                >
                  {/* <RiLogoutCircleLine className="text-[1.5rem]" /> */}
                  <p>Log Out</p>
                </button>
              </div>
            </div>
          </div>
        </Drawer>
      </div>
      <div className="hidden nav my-auto mx-auto lg:block h-[100vh] bg-[#333] shadow w-[20vw] min-w-[250px] relative left-0">
        <div className="w-[90%] m-auto text-neutral-200 py-8     text-center">
          <h1 className="text-[1.5rem]  border-b-[2px] rounded border-blue-600 flex items-center gap-5 ">
            <Image
              src={"/logo.png"}
              alt="logo"
              width={50}
              height={50}
              className=""
            ></Image>
            <span>Pokhara Rentals</span>
          </h1>

          <div className="grid gap-3 w-full mt-10">
            {links.map((e, index) => {
              return (
                <Link
                  className={`${
                    pathname === e.path ? "bg-neutral-700" : "bg-neutral-600"
                  }  px-5 w-full text-left rounded-md py-[.6em] shadow-md hover:bg-neutral-700 duration-300 flex items-center gap-2`}
                  key={index}
                  href={e.path}
                >
                  <div className="w-[10%] text-[1.5rem] ">{e.logo}</div>
                  <div className="w-[85%] text-[.9rem] ">{e.name}</div>
                </Link>
              );
            })}
          </div>
          <div className="absolute bottom-8  w-full">
            <button
              onClick={() => {
                dispatch(resetLogin());
                push("/");
              }}
              className="hover:border-blue-600 duration-500 hover:text-blue-600 border-[#333] border-b-[2px]  flex w-[35%]  gap-2 items-center justify-center  "
            >
              <CiLogout className="text-[1.5rem]" />
              <p>Log Out</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
