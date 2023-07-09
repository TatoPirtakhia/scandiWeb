import { Product,  } from "../types";

interface GetProductProps {
  data: Product;
  index: number;
  checkedProducts: boolean[];
  handleCheckboxChange: (index: number) => void;
}

function GetProduct(props: GetProductProps) {
  const { checkedProducts, index, handleCheckboxChange } = props;

  const checked = checkedProducts[index] ?? false;
  const { id, name, price  } = props.data;

  let hasDVD = false;
  let hasBook = false;
  let hasFurn = false;

  if ('DVD' in props.data) {
    hasDVD = true;
  } else if ('Book' in props.data) {
    hasBook = true;
  }else  if ('Furniture' in props.data){
     hasFurn = true;
  }
    


  return (
    <div className="w-[300px] flex flex-col shadow-box p-6 rounded-md">
      <div className=" w-[26px] h-[26px]">
        <label className="container">
          <input
            type="checkbox"
            checked={checked}
            onChange={() => handleCheckboxChange(index)}
          />
          <div className="checkmark"></div>
        </label>
      </div>
      <div className="w-full flex flex-col items-center">
        <p>{id}</p>
        <p>{name}</p>
        <p>{`${price} $`}</p>
        {hasDVD && <p>Contains DVD</p>}
        {hasBook && <p>Contains Book</p>}
        {hasDVD && <p>DVD Size: {props.data.DVD?.size}</p>}
        {hasFurn && <p>Book Weight: {props.data.Book?.Weight}</p>}
        {hasFurn && (
          <div className="flex gap-2">
            <p>Dimensions:</p>
            <p>{props.data.Furniture?.Height}x{props.data.Furniture?.Width}x{props.data.Furniture?.Length}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default GetProduct;
