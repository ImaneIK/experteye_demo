import Vehicles from "../components/Vehicles";
import data from "../vehicle-prices.json";
export default function VehicleManagment() {
  return (
    <div class=" bg-gray-50 flex gap-3 ">
      <Vehicles vehicles={data.vehicles}></Vehicles>
    </div>
  );
}
