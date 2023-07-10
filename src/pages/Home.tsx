import { useState } from "react";
import { Product } from "../types";
import GetProduct from "./Products";

function Home(props: {
  data: Product[];
  setIds: React.Dispatch<React.SetStateAction<string[]>>;
  ids: string[];
}) {
  const { data, setIds , ids } = props;

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

  return (
    <div className="w-full flex justify-center gap-6 flex-wrap ">
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
  );
}

export default Home;
