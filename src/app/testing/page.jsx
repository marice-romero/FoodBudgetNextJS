import ClientTest from "@/components/ClientTest";
import dbConnect from "@/lib/dbConnect";
import Expense from "@/lib/models/Expense";

export default async function TestingPage() {
  const getProgramData = async () => {
    try {
      await dbConnect();
      const res = await Expense.find({ location: "Souvlas" })
        .select(["type", "spender"])
        .exec();
      const data = JSON.parse(JSON.stringify(res));
      return data;
    } catch (e) {
      console.log("Error in getting program data: ", e);
    }
  };

  const data = await getProgramData();
  console.log("server data: ", data);
  return (
    <>
      {data.length > 0 ? (
        <main>
          <ClientTest data={data} />
        </main>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
