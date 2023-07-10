import { useNavigate } from "react-router-dom";
import Routing from "./Routing";
import { useEffect, useState } from "react";
import getData from "./requests/getdata";
import { Product } from "./types";
import deleteIds from "./requests/deleteIds";

function App() {
  const [data, setData] = useState<Product[]>([]);
  const [ids,setIds] = useState<string[]>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getData();
        setData(products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const navigate = useNavigate();
  const [isNavigate, setNavigate] = useState<boolean>(false);

  const switchPageAdd = () => {
    setNavigate(!isNavigate);
    navigate("/NewProduct");
  };
  const switchPageHome = () => {
    setNavigate(!isNavigate);
    navigate("/Home");
  };

 
  const deleteIDS = async () =>{
      const status = await deleteIds(ids)

      if (status===200){
        setData((prevData) => prevData.filter((item) => !ids.includes(item.id)));
        setIds([])
      }
  }


  return (
    <div className="h-full w-full flex flex-col items-center">
      <nav className="flex w-[90%] items-center   justify-between pt-5 pb-5 border-b-black border-b-[1px] ">
        <h1 className="roboto font-bold text-[20px]">Product List</h1>
        <div className={`flex gap-4 ${isNavigate ? "hidden" : ""}`}>
          <button
            className="roboto font-normal w-[40px] bg-slate-400 rounded-md text-white"
            onClick={switchPageAdd}
          >
            ADD
          </button>
          <button onClick={deleteIDS} className="roboto font-normal text-white bg-red-500 p-1 rounded-md ">
            MASS DELETE
          </button>
        </div>
        <div className={`flex gap-4 ${isNavigate ? "" : "hidden"}`}>
          <button className="roboto font-normal w-[40px] bg-slate-400 rounded-md text-white">
            save
          </button>
          <button
            className="roboto font-normal text-white bg-red-500 p-1 rounded-md "
            onClick={switchPageHome}
          >
            cancel
          </button>
        </div>
      </nav>
      <div className="flex flex-wrap justify-center pt-10 w-[90%] pb-[100px]">
        <Routing data={data} setIds={setIds} ids={ids} />
      </div>
      <div className="fixed bottom-0 flex justify-center w-full bg-white z-10 ">
        <div className=" border-t-black border-t-[1px] w-[90%]  flex justify-center p-4 roboto font-normal z-20">
          <p className="text-black">ScandiWeb Test assignment</p>
        </div>
      </div>
    </div>
  );
}

export default App;
