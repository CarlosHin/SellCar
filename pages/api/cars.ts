import { supabase } from "../../lib/initSupabase";

const getCar = async (req, res) => {
  const { data: cars, error } = await supabase
    .from("cars")
    .select("*")
    .order("price", { ascending: true });

  if (error) return res.status(401).json({ error: error.message });
  return res.status(200).json(cars);
};

export default getCar;
