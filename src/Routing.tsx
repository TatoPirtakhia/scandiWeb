import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Product } from "./types";

const Home = lazy(() => import("./pages/Home"));
const New = lazy(() => import("./pages/AddNewProduct"));

const Routing = ({
  data,
  ids,
  setIds,
}: {
  data: Product[];
  setIds: React.Dispatch<React.SetStateAction<string[]>>;
  ids: string[];
}) => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route
        path="/Home"
        element={
          <Suspense>
            <Home data={data} setIds={setIds} ids={ids} />
          </Suspense>
        }
      />
      <Route
        path="/NewProduct"
        element={
          <Suspense>
            <New />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default Routing;