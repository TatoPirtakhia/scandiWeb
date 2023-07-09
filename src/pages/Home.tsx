import { useState } from "react";
import { Product } from "../types";
import GetProduct from "./Products";

function Home(props: { data: Product[] }) {
  const { data } = props;

  const [checkedProducts, setCheckedProducts] = useState<boolean[]>(
    Array(data.length).fill(false)
  );

  const handleCheckboxChange = (index: number) => {
    setCheckedProducts((prevCheckedProducts) => {
      const updatedCheckedProducts = [...prevCheckedProducts];
      updatedCheckedProducts[index] = !updatedCheckedProducts[index];
      return updatedCheckedProducts;
    });
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
