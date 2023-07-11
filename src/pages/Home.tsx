import { useState } from "react";
import { Product } from "../types";
import GetProduct from "./Products";
import { useNavigate } from "react-router-dom";

function Home(props: {
  data: Product[];
  setIds: React.Dispatch<React.SetStateAction<string[]>>;
  ids: string[];
  deleteIDS: () => Promise<void>
}) {
  const { data, setIds, ids } = props;
  const navigate= useNavigate()

  const [checkedProducts, setCheckedProducts] = useState<boolean[]>(
    Array(data.length).fill(false)
  );

  const handleCheckboxChange = (index: number) => {
    setCheckedProducts((prevCheckedProducts) => {
      const updatedCheckedProducts = [...prevCheckedProducts];
      updatedCheckedProducts[index] = !updatedCheckedProducts[index];
      return updatedCheckedProducts;
    });
    const id = data[index].id;
    if (ids.includes(id)) {
      setIds((prevIds) => prevIds.filter((prevId) => prevId !== id));
    } else {
      setIds((prevIds) => [...prevIds, id]);
    }
  };
    const massDelete = async ()  =>{
      await props.deleteIDS()
      setCheckedProducts(Array(data.length).fill(false))
    }
  return (
    <div className="h-full w-full flex flex-col items-start">
      <nav className="flex w-full items-center mb-10   justify-between pt-5 pb-5 border-b-black border-b-[1px] ">
        <h1 className="roboto font-bold text-[20px]">Product List</h1>
        <div className={`flex gap-4 `}>
          <button onClick={()=>{navigate('/NewProduct')}} className="roboto font-normal w-[40px] bg-slate-400 rounded-md text-white">
            ADD
          </button>
          <button onClick={massDelete} className="roboto font-normal text-white bg-red-500 p-1 rounded-md ">
            MASS DELETE
          </button>
        </div>
      </nav>
      <div className="w-full flex justify-center  xl:justify-start gap-6 flex-wrap ">
        {data.map((data: Product, index) => {
          return (
            <GetProduct
              data={data}
              checkedProducts={checkedProducts}
              key={index}
              index={index}
              handleCheckboxChange={handleCheckboxChange}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Home;
