import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:3000/api";

function App() {
  // State for restaurants
  const [restaurants, setRestaurants] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  // State for menu items
  const [menuItems, setMenuItems] = useState([]);
  const [menuName, setMenuName] = useState("");
  const [menuPrice, setMenuPrice] = useState("");

  // Fetch all restaurants on mount
  useEffect(() => {
    fetchRestaurants();
  }, []);

  // Fetch restaurants
  const fetchRestaurants = async () => {
    const res = await axios.get(`${API_BASE}/restaurants`);
    setRestaurants(res.data);
  };

  // Add restaurant
  const addRestaurant = async () => {
    if (!name || !address) return;
    await axios.post(`${API_BASE}/restaurants`, { name, address });
    setName("");
    setAddress("");
    fetchRestaurants();
  };

  // Select a restaurant and fetch its menu
  const selectRestaurant = async (restaurant) => {
    setSelectedRestaurant(restaurant);
    const res = await axios.get(`${API_BASE}/menu/${restaurant._id}`);
    setMenuItems(res.data);
  };

  // Add menu item
  const addMenuItem = async () => {
    if (!menuName || !menuPrice || !selectedRestaurant) return;
    await axios.post(`${API_BASE}/menu`, {
      restaurantId: selectedRestaurant._id,
      name: menuName,
      price: Number(menuPrice),
    });
    setMenuName("");
    setMenuPrice("");
    selectRestaurant(selectedRestaurant); // Refresh menu
  };

  return (
    <div style={{ padding: 24, fontFamily: "Arial" }}>
      <h2>Restaurants</h2>
      <ul>
        {restaurants.map((r) => (
          <li key={r._id}>
            <button onClick={() => selectRestaurant(r)} style={{ marginRight: 8 }}>
              View Menu
            </button>
            {r.name} - {r.address} - {r.isOpen ? "Open" : "Closed"}
          </li>
        ))}
      </ul>
      <h3>Add Restaurant</h3>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        style={{ marginRight: 8 }}
      />
      <input
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Address"
        style={{ marginRight: 8 }}
      />
      <button onClick={addRestaurant}>Add</button>

      {selectedRestaurant && (
        <div style={{ marginTop: 32 }}>
          <h2>
            Menu for {selectedRestaurant.name}
            <button
              onClick={() => setSelectedRestaurant(null)}
              style={{ marginLeft: 16 }}
            >
              Close
            </button>
          </h2>
          <ul>
            {menuItems.map((item) => (
              <li key={item._id}>
                {item.name} - Rs. {item.price}
              </li>
            ))}
          </ul>
          <h3>Add Menu Item</h3>
          <input
            value={menuName}
            onChange={(e) => setMenuName(e.target.value)}
            placeholder="Item Name"
            style={{ marginRight: 8 }}
          />
          <input
            value={menuPrice}
            onChange={(e) => setMenuPrice(e.target.value)}
            placeholder="Price"
            type="number"
            style={{ marginRight: 8 }}
          />
          <button onClick={addMenuItem}>Add</button>
        </div>
      )}
    </div>
  );
}

export default App;
