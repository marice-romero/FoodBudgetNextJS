"use client";
import React from "react";
import { MutatingDots } from "react-loader-spinner";

const loading = () => {
  return (
    <section className="flex items-center w-screen h-screen p-16 dark:bg-gray-50">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-3xl dark:text-gray-400">
            <span>Loading ... </span>
          </h2>
          <MutatingDots
            visible={true}
            height="100"
            width="100"
            color="#4fa94d"
            secondaryColor="#4fa94d"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      </div>
    </section>
  );
};

export default loading;
