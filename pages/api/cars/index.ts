import { supabase } from "../../../lib/initSupabase";

const getCar = async (req, res) => {
  const brand = req?.query?.brand;
  let response;
  if(brand && brand !== "All"){
    response = await supabase
    .from("cars")
    .select("*")
    .eq("brand",brand)
    .order("price", { ascending: true });
  }else{
    response = await supabase
    .from("cars")
    .select("*")
    .order("price", { ascending: true });
  }
  const { data: cars, error } = response;

  if (error) return res.status(401).json({ error: error.message });
  return res.status(200).json(cars);
};

export default getCar;
