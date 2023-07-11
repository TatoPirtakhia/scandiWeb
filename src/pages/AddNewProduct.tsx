import { SubmitHandler, useForm } from "react-hook-form";
import { Product } from "../types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import DVDSchema from "../schema/DVDSchema";
import BookSchema from "../schema/BookSchema";
import FurnitureSchema from "../schema/FurnitureSchema";
import { useNavigate } from "react-router-dom";
import sendData from "../requests/senddata";

function AddNewProduct(props: {
  setData: React.Dispatch<React.SetStateAction<Product[]>>;
  data: Product[];
}) {
  const navigate = useNavigate();
  const [objectType, setObjectType] = useState<string>("");
  const [schema, setSchema] = useState<any>();

  useEffect(() => {
    let selectedSchema =
      objectType === "DVD"
        ? DVDSchema
        : objectType === "Book"
        ? BookSchema
        : FurnitureSchema;
    setSchema(selectedSchema);
  }, [objectType]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<Product> = async (data) => {
    let status: number | undefined;
    if (objectType === "DVD") {
      const dvdData = {
        id: data.id,
        name: data.name,
        price: data.price,
        DVD: data.DVD,
      };
      status = await sendData(dvdData, "DVD");

      if (status === 201) {
        props.setData([
          ...props.data,
          {
            id: data.id,
            name: data.name,
            price: data.price,
            DVD: data.DVD,
          },
        ]);
      }
      navigate('/Home')
    } else if (objectType === "Book") {
      const BookData = {
        id: data.id,
        name: data.name,
        price: data.price,
        Book: data.Book,
      };
      status = await sendData(BookData, "Book");
      if (status === 201) {
        props.setData([
          ...props.data,
          {
            id: data.id,
            name: data.name,
            price: data.price,
            Book: data.Book,
          },
        ]);
      }
      navigate('/Home')
    } else {
      const furnitureData = {
        id: data.id,
        name: data.name,
        price: data.price,
        Furniture: data.Furniture,
      };
      status = await sendData(furnitureData, "furniture");
      if (status === 201) {
        props.setData([
          ...props.data,
          {
            id: data.id,
            name: data.name,
            price: data.price,
            Furniture: data.Furniture,
          },
        ]);
      }
      navigate('/Home')
    }
    
  };
  const Submit = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <div className="h-full w-full flex flex-col items-start">
      <nav className="flex w-full items-center   justify-between pt-5 pb-5 mb-10 border-b-black border-b-[1px] ">
        <h1 className="roboto font-bold text-[20px]">Product List</h1>
        <div className={`flex gap-4 `}>
          <button
            className="roboto font-normal w-[40px] bg-slate-400 rounded-md text-white"
            onClick={Submit}
          >
            Save
          </button>
          <button
            onClick={() => {
              navigate("/Home");
            }}
            className="roboto font-normal text-white bg-red-500 p-1 rounded-md "
          >
            Cancel
          </button>
        </div>
      </nav>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-start p-2 w-[350px]"
        id='product_form'
      >
        <div className="mb-4 w-full flex justify-between ">
          <label htmlFor="sku">sku: </label>
          <input
            type="text"
            id="sku"
            className={`outline-none ml-4  border-[1px] rounded-md pl-2 ${
              errors && errors.id ? "border-[red]" : "border-[#DFE3FA] "
            }`}
            placeholder="#sku"
            {...register("id", { required: true })}
          />
        </div>
        <div className="mb-4 w-full flex justify-between">
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            className={`outline-none ml-4  border-[1px] rounded-md pl-2 ${
              errors && errors.name ? "border-[red]" : "border-[#DFE3FA] "
            }`}
            placeholder="#name"
            {...register("name", { required: true })}
          />
        </div>
        <div className="mb-4 w-full flex justify-between">
          <label htmlFor="price">Price ($) </label>
          <input
            type="text"
            id="price"
            className={`outline-none ml-4  border-[1px] rounded-md pl-2 ${
              errors && errors.price ? "border-[red]" : "border-[#DFE3FA] "
            }`}
            placeholder="#price"
            {...register("price", { required: true })}
          />
        </div>
        <div>
          <label htmlFor="productType">Select Object Type: </label>
          <select
            id="productType"
            value={objectType}
            onChange={(e) => setObjectType(e.target.value)}
          >
            <option value="">-- Select Type --</option>
            <option value="DVD">DVD</option>
            <option value="Book">Book</option>
            <option value="Furniture">Furniture</option>
          </select>
        </div>
        {objectType === "DVD" && (
          <div>
            <label htmlFor="size">Size: </label>
            <input
              type="number"
              {...register("DVD.size")}
              id="size"
              className={`outline-none ml-4  border-[1px] rounded-md pl-2 ${
                errors && errors.name ? "border-[red]" : "border-[#DFE3FA] "
              }`}
            />
            {errors.DVD?.size && <p>{errors.DVD.size.message}</p>}
          </div>
        )}
        {objectType === "Book" && (
          <div>
            <label htmlFor="weight">Weight: </label>
            <input
              type="number"
              {...register("Book.Weight")}
              id="weight"
              className={`outline-none ml-4  border-[1px] rounded-md pl-2 ${
                errors && errors.name ? "border-[red]" : "border-[#DFE3FA] "
              }`}
            />
            {errors.Book?.Weight && <p>{errors.Book.Weight.message}</p>}
          </div>
        )}
        {objectType === "Furniture" && (
          <div>
            <label htmlFor="height">Height: </label>
            <input
              type="number"
              {...register("Furniture.Height")}
              id="height"
              className={`outline-none ml-4  border-[1px] rounded-md pl-2 ${
                errors && errors.name ? "border-[red]" : "border-[#DFE3FA] "
              }`}
            />
            {errors.Furniture?.Height && (
              <p>{errors.Furniture.Height.message}</p>
            )}
            <label htmlFor="width">Width: </label>
            <input
              type="number"
              {...register("Furniture.Width")}
              id="width"
              className={`outline-none ml-4  border-[1px] rounded-md pl-2 ${
                errors && errors.name ? "border-[red]" : "border-[#DFE3FA] "
              }`}
            />
            {errors.Furniture?.Width && <p>{errors.Furniture.Width.message}</p>}
            <label htmlFor="length">Length: </label>
            <input
              type="number"
              {...register("Furniture.Length")}
              id="length"
              className={`outline-none ml-4  border-[1px] rounded-md pl-2 ${
                errors && errors.name ? "border-[red]" : "border-[#DFE3FA] "
              }`}
            />
            {errors.Furniture?.Length && (
              <p>{errors.Furniture.Length.message}</p>
            )}
          </div>
        )}
      </form>
    </div>
  );
}

export default AddNewProduct;
