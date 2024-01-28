'use client'
 

export default function GlobalError({ error, reset }) {
  return (
     
    <div className="   ">
      <div className="flex flex-col justify-center items-center">
        <div className="w-[30%] m-auto mt-40">
          <img src="/public/error.png" className="w-full  " alt="" />
        </div>
        <div className="w-[50%] text-justify m-auto">
          <h1 className=" text-center font-extrabold text-[1.5rem] mb-5">
            Page Not Found
          </h1>
          <p className="text-center text-[.9rem] ">
            {" "}
            Oops! It seems youve stumbled upon uncharted digital territory.
            Our apologies for the detour. Please bear with us as we navigate you
            back to the right path.
          </p>
        </div>
        <div>
          {" "}
          <button
            onClick={() => {
            //   push("/");
            }}
            className="flex shadow-md items-center gap-2 rounded-md mt-3 text-[.9rem] text-red-600 btn border-2 border-red-600 hover:text-white py-2 px-10 "
          >
            {/* <AiOutlineChrome className="text-[1.2rem]" /> Home */}
          </button>
        </div>
      </div>
    </div>
 
  );
};

 