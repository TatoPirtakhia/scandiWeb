import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Product } from "./types";

const Home = lazy(() => import("./pages/Home"));
const New = lazy(() => import("./pages/AddNewProduct"));

const Routing = ({
  data,
  ids,
  setIds,
  deleteIDS,
  setData
}: {
  data: Product[];
  setIds: React.Dispatch<React.SetStateAction<string[]>>;
  ids: string[];
  deleteIDS: () => Promise<void>
  setData: React.Dispatch<React.SetStateAction<Product[]>>
}) => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route
        path="/Home"
        element={
          <Suspense>
            <Home data={data} setIds={setIds} ids={ids} deleteIDS={deleteIDS}/>
          </Suspense>
        }
      />
      <Route
        path="/NewProduct"
        element={
          <Suspense>
            <New setData={setData} data={data}/>
          </Suspense>
        }
      />
    </Routes>
  );
};

export default Routing;
