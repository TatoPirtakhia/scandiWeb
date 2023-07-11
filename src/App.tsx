import Routing from "./Routing";
import { useEffect, useState } from "react";
import getData from "./requests/getdata";
import { Product } from "./types";
import deleteIds from "./requests/deleteIds";

function App() {
  const [data, setData] = useState<Product[]>([]);
  const [ids, setIds] = useState<string[]>([]);
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

  const deleteIDS = async () => {
    const status = await deleteIds(ids);
    if (status === 200) {
      setData((prevData) => prevData.filter((item) => !ids.includes(item.id)));
      setIds([]);
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-center">
     
      <div className="flex flex-wrap justify-center  w-[90%] pb-[100px]">
        <Routing data={data} setIds={setIds} setData={setData} ids={ids} deleteIDS={deleteIDS}/>
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
