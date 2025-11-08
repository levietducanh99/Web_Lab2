import { useState } from 'react';

function AddUser({ onAdd }) {
  const [adding, setAdding] = useState(false);
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    address: { street: "", suite: "", city: "" },
    phone: "",
    website: ""
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (["street", "suite", "city"].includes(id)) {
      setUser({ ...user, address: { ...user.address, [id]: value } });
    } else {
      setUser({ ...user, [id]: value });
    }
  };

  const handleAdd = () => {
    if (user.name === "" || user.username === "") {
      alert("Vui lòng nhập Name và Username!");
      return;
    }
    onAdd(user);
    setUser({
      name: "",
      username: "",
      email: "",
      address: { street: "", suite: "", city: "" },
      phone: "",
      website: ""
    });
    setAdding(false);
  };

  return (
    <div className="add-user-container">
      <button className="btn-add" onClick={() => setAdding(true)}>
        Thêm Người Dùng
      </button>

      {adding && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Thêm người dùng</h4>

            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              value={user.name}
              onChange={handleChange}
            />

            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={user.username}
              onChange={handleChange}
            />

            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={user.email}
              onChange={handleChange}
            />

            <label htmlFor="street">Street:</label>
            <input
              id="street"
              type="text"
              value={user.address.street}
              onChange={handleChange}
            />

            <label htmlFor="suite">Suite:</label>
            <input
              id="suite"
              type="text"
              value={user.address.suite}
              onChange={handleChange}
            />

            <label htmlFor="city">City:</label>
            <input
              id="city"
              type="text"
              value={user.address.city}
              onChange={handleChange}
            />

            <label htmlFor="phone">Phone:</label>
            <input
              id="phone"
              type="text"
              value={user.phone}
              onChange={handleChange}
            />

            <label htmlFor="website">Website:</label>
            <input
              id="website"
              type="text"
              value={user.website}
              onChange={handleChange}
            />

            <div className="modal-buttons">
              <button className="btn-save" onClick={handleAdd}>
                Thêm
              </button>
              <button className="btn-cancel" onClick={() => setAdding(false)}>
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddUser;

