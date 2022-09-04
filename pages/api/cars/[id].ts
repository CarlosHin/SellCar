import { supabase } from "../../../lib/initSupabase";

const getCar = async (req, res) => {
const { id } = req.query
  const { data: cars, error } = await supabase
    .from("cars")
    .select("*")
    .eq("id", id)
    .order("price", { ascending: true });

  if (error) return res.status(401).json({ error: error.message });
  if(cars.length <1 )return res.status(401).json({ error: "Not found" });
  return res.status(200).json(cars[0]);
};

export default getCar;
