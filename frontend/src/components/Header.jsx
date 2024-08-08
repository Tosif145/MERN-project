import React from "react";
import { useGetTopProductQuery } from "../redux/Api/productApiSlice";
import Loader from "./Loader";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h1>ERROR</h1>;
  }
  return (
    <>
      <div className="flex justify-aroun">
        <div className="xl:block lg:hidden md:hidden sm:hidden">
          <div className="grid grid-cols-2">
            {data.map((product) => (
              <div key={product._id}>
                {" "}
                {/* <SmallProduct product={product} />{" "} */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
