const FilterByType = () => {
  return (
    <div className="flex gap-4 mx-auto w-3/4 place-content-center text-xl">
      <button className="rounded-lg py-1 px-2 place-content-evenly bg-amber-300 shadow-lg">
        Grocery
      </button>
      <button className="rounded-lg py-1 px-2 place-content-evenly bg-amber-300 shadow-lg">
        Dining Out
      </button>
      <button className="rounded-lg py-1 px-2 place-content-evenly bg-amber-300 shadow-lg">
        Special Event
      </button>
    </div>
  );
};
export default FilterByType;
