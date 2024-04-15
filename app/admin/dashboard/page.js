"use client";
import withAuth from "@/components/authMiddleware";
import { toast } from "@/components/ui/use-toast";
import { getCustomerCount } from "@/services/customer.service";
import {
  getStoreAnalysis,
  getStoreCount,
  getStoreSalesAnalysis,
} from "@/services/store.service";
import { useEffect, useState } from "react";
import Chart from "react-google-charts";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { HiUsers } from "react-icons/hi2";
import { LiaStoreSolid } from "react-icons/lia";

function Dashoard() {
  const [customerCount, setCustomerCount] = useState(0);
  const [storeCount, setStoreCount] = useState(0);
  const [StoreData, setStoreData] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [salesData, setsalesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerCountResult = await getCustomerCount();
        const storeCountResult = await getStoreCount();
        const storeAnalysis = await getStoreAnalysis();
        const salesAnalysis = await getStoreSalesAnalysis({
          month: month,
          year: year,
        });
        let groupedData = {};
        salesAnalysis?.data.forEach((item) => {
          let storeId = item.store_id_b || item.store_id_c;

          if (!groupedData[storeId]) {
            groupedData[storeId] = {
              store_id: storeId,
              store_name: item.store_name_b || item.store_name_c,
              sales: 0,
            };
          }

          groupedData[storeId].sales += parseInt(item.sales, 10);

        });
        let finalData = Object.values(groupedData);
       
        let paymentData = [["Store Name", "Sales"]];
        finalData?.forEach((element) => {
          console.log( element?.sales - (element?.sales / 10))
          paymentData.push([element?.store_name, element?.sales - (element?.sales / 10)]);
        });
        setsalesData(paymentData);
        let data = [["Date", "Store joined"]];

        storeAnalysis?.data.forEach((element) => {
          let date = new Date(element?.store_createdAt).toLocaleDateString();
          return data.push([date, parseInt(element?.StoreNummber, 10)]);
        });

        setStoreData(data);
        setCustomerCount(customerCountResult.data);
        setStoreCount(storeCountResult.data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: "Couldn't connect to the server",
        });
      }
    };

    fetchData();
  }, [month, year]);

  const handlePrevMonth = () => {
    if (month === 1) {
      setMonth(12);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };
  const getMonthName = (month) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[month - 1] || "";
  };
  const handleNextMonth = () => {
    if (month === 12) {
      setMonth(1);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  return (
    <div className="h-[100vh] overflow-scroll">
      <div className="grid grid-cols-2 m-auto layout py-5 pt-10 gap-10 ">
        <div className=" mt-10 aspect-video w-[70%] md:w-full h-[120px]  m-auto bg-[#333] rounded-md shadow-xl ">
          <div className="relative p-5 text-white h-full flex flex-col justify-end ">
            <div className="absolute top-0  shadow-xl bg-red-600 p-7 rounded-full   transform translate-y-[-50%]">
              <HiUsers className="text-[2.2rem]" />
            </div>
            <div className="text-right ">
              <p className=" text-green-300 text-[.8rem]">
                {" "}
                + {customerCount?.today ? customerCount?.today : 0}
              </p>
            </div>
            <div className=" items-center flex  justify-between">
              <div>
                <h1 className="text-[1.5rem] ">Customer Details</h1>
                <h2 className="text-[.8rem]">Total Customers in the system.</h2>
              </div>
              <div className="h-[1px] w-[20px] bg-white"></div>
              <p className="  text-[1.5rem]"> {customerCount?.count}</p>
            </div>
          </div>
        </div>

        <div className=" mt-10 aspect-video w-[70%] md:w-full  h-[120px] m-auto bg-[#333] rounded-md shadow-xl ">
          <div className="relative p-5 text-white h-full flex flex-col justify-end ">
            <div className="absolute top-0  shadow-xl bg-red-600 p-7 rounded-full   transform translate-y-[-50%]">
              <LiaStoreSolid className="text-[2.2rem]" />
            </div>
            <div className="text-right ">
              <p className=" text-green-300 text-[.8rem]">
                {" "}
                + {storeCount?.today ? storeCount?.today : 0}
              </p>
            </div>
            <div className=" items-center flex justify-between">
              <div>
                <h1 className="text-[1.5rem] ">Stores Details</h1>
                <h2 className="text-[.8rem]">Total Stores in the system.</h2>
              </div>

              <div className="h-[1px] w-[20px] bg-white"></div>
              <p className="  text-[1.5rem]"> {storeCount?.count}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="layout">
        <div className=""></div>
        {StoreData.length > 1 && (
          <div className="w-full py-5">
            <div className="flex justify-between">
              <div>
                <h1 className="text-[1.5rem] text-neutral-800">
                  Revenues Details
                </h1>
                <h2 className="text-[.8rem] pb-6 text-neutral-600">
                  Total Revenues of store in the month : {getMonthName(month)} /{" "}
                  {year}
                </h2>
              </div>

              <div className="flex items-center   ">
                <button
                  onClick={handlePrevMonth}
                  className="bg-primary flex group items-center gap-2 text-white mx-5 px-3 py-2 rounded-md shadow-md"
                >
                  {" "}
                  <GrLinkPrevious className="group-hover:translate-x-[-5px] duration-300" />
                  <span>Previous Month</span>
                </button>
                <button
                  onClick={handleNextMonth}
                  className="bg-primary flex group items-center gap-2 text-white px-3 py-2 rounded-md shadow-md"
                >
                  <span>Next Month</span>
                  <GrLinkNext className="group-hover:translate-x-[5px] duration-300" />
                </button>
              </div>
            </div>

            <div className="">
              <Chart
                chartType="Bar"
                width="100%"
                height="400px"
                data={salesData}
                options={{
                  hAxis: {
                    title: "Store Name",
                  },
                  vAxis: {
                    title: "Store sales per month",
                  },
                  animation: {
                    duration: 1000,
                    easing: "out",
                    startup: true,
                  },
                }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="layout">
        <div className=""></div>
        {StoreData.length > 1 && (
          <div className="w-full py-5">
            <div>
              <h1 className="text-[1.5rem] text-neutral-800">
                Store Joined Details
              </h1>
              <h2 className="text-[.8rem] pb-6 text-neutral-600">
                Store Connected to the system.
              </h2>
            </div>
            <div className="">
              <Chart
                chartType="LineChart"
                width="100%"
                height="400px"
                data={StoreData}
                options={{
                  curveType: "function",
                  animation: {
                    duration: 1000,
                    easing: "out",
                    startup: true,
                  },
                  hAxis: {
                    title: "Store Join Date",
                  },
                  vAxis: {
                    title: "Store Count",
                  },
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default withAuth(Dashoard);
