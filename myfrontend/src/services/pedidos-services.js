// In services/orderService.js
import axios from "axios";

export const fetchOrders = async () => {
  try {
    const response = await axios.get("http://164.90.136.35:8080/shipments");
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error fetching orders:", error);
    throw error; // Re-throw to handle it in the component
  }
};

export default fetchOrders;
