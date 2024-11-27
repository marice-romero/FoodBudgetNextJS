"use client";
import { StoreContext } from "@/store";
import React, { useContext, Suspense, useEffect, useState } from "react";

const ClientTest = (props) => {
  const { data } = props;
  const [date, setDate] = useState("");
  console.log("client data: ", data);

  const { state } = useContext(StoreContext);
  const { selectedDateRange } = state;

  useEffect(() => {
    setDate(selectedDateRange);
  }, [selectedDateRange]);
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        {selectedDateRange ? (
          <div className="blurCard flex h-full w-full flex-col items-center justify-center sm:m-2 sm:p-2 md:m-12 md:p-12">
            <select>
              {data.map((item) => {
                return <option key={item._id}>{item._id}</option>;
              })}
            </select>
          </div>
        ) : (
          <p>loading...</p>
        )}
      </Suspense>
    </>
  );
};

export default ClientTest;
