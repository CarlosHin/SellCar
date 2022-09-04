import { supabase } from "../../lib/initSupabase";
import { Car } from "../../types/car";

// Example of how to verify and get user data server-side.
const createCar = async (req, res) => {
  const token = req.headers.token;
  if (token) {
    const { data: user, error: errorGetUser } = await supabase.auth.api.getUser(
      token
    );
    if (errorGetUser) return res.status(401).json({ error: "NO User" });
    const newCar :Car = {
      brand: req.body.brand,
      model: req.body.model,
      price: req.body.price,
      description: req.body.description,
      image: req.body.image,
      userId: user.id,
      cv:req.body.cv, 
      year:req.body.year,
      fuelType:req.body.fuelType,
      km:req.body.km
    }
    const { data, error } = await supabase.from("cars").insert(newCar);
    if (error) return res.status(401).json({ error: error.message });
    return res.status(200).json(data);
  }
  return res.status(401).json({ error: "NO TOKEN" });
};

export default createCar;
