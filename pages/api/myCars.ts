import { supabase } from '../../lib/initSupabase'

const getUserCars = async (req, res) => {
    const token = req.headers.token
    if (token) {
        const { data: user, error: errorGetUser } = await supabase.auth.api.getUser(token)
        if (errorGetUser)
            return res.status(401).json({ error: "NO User" })

        const brand = req?.query?.brand;
        let response;
        if(brand && brand !== "All"){
            response = await supabase
            .from("cars")
            .select("*")
            .eq("brand",brand)
            .eq("userId", user.id)
            .order("price", { ascending: true });
        }else{
            response = await supabase
            .from("cars")
            .select("*")
            .eq("userId", user.id)
            .order("price", { ascending: true });
        }
        const { data: cars, error } = response;
        
        if (error) return res.status(401).json({ error: error.message })
        return res.status(200).json(cars)

    }
    return res.status(401).json({ error: "NO TOKEN" })


}

export default getUserCars
