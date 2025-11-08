import { useState } from 'react';

/**
 * Component AddUser - Form thêm người dùng mới
 * @param {Function} onAdd - Hàm callback từ component cha (App) để truyền dữ liệu lên (State Lifting)
 */
function AddUser({ onAdd }) {
  // State quản lý việc hiển thị/ẩn form modal
  const [adding, setAdding] = useState(false);
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    address: { street: "", suite: "", city: "" }, // Đối tượng lồng nhau
    phone: "",
    website: ""
  });

  const handleChange = (e) => {
    const { id, value } = e.target;

    // Kiểm tra nếu trường đang sửa thuộc về address (nested object)
    if (["street", "suite", "city"].includes(id)) {
      setUser({ ...user, address: { ...user.address, [id]: value } });
    } else {
      // Với các trường thông thường, chỉ cần copy đối tượng user và cập nhật
      setUser({ ...user, [id]: value });
    }
  };

  const handleAdd = () => {
    // Validation: Kiểm tra các trường bắt buộc
    if (user.name === "" || user.username === "") {
      alert("Vui lòng nhập Name và Username!");
      return;
    }

    // Gửi dữ liệu lên component cha (App) - State Lifting Pattern
    onAdd(user);

    // Reset form về trạng thái ban đầu sau khi thêm thành công
    setUser({
      name: "",
      username: "",
      email: "",
      address: { street: "", suite: "", city: "" },
      phone: "",
      website: ""
    });

    // Đóng modal
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
            <h4>✨ Thêm người dùng mới</h4>

            {/* Thông tin cơ bản - 2 cột */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Họ và tên *</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Nhập họ tên"
                  value={user.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="username">Username *</label>
                <input
                  id="username"
                  type="text"
                  placeholder="Nhập username"
                  value={user.username}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Email - Full width */}
            <div className="form-row">
              <div className="form-group full-width">
                <label htmlFor="email">📧 Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={user.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Địa chỉ - 2 cột */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="street">🏠 Đường</label>
                <input
                  id="street"
                  type="text"
                  placeholder="Số nhà, tên đường"
                  value={user.address.street}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="suite">🏢 Phòng/Tầng</label>
                <input
                  id="suite"
                  type="text"
                  placeholder="Apt. 123"
                  value={user.address.suite}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Thành phố - Full width */}
            <div className="form-row">
              <div className="form-group full-width">
                <label htmlFor="city">🌆 Thành phố</label>
                <input
                  id="city"
                  type="text"
                  placeholder="Tên thành phố"
                  value={user.address.city}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Liên hệ - 2 cột */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">📱 Số điện thoại</label>
                <input
                  id="phone"
                  type="text"
                  placeholder="0123456789"
                  value={user.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="website">🌐 Website</label>
                <input
                  id="website"
                  type="text"
                  placeholder="www.example.com"
                  value={user.website}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="modal-buttons">
              <button className="btn-save" onClick={handleAdd}>
                ✓ Thêm
              </button>
              <button className="btn-cancel" onClick={() => setAdding(false)}>
                ✕ Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddUser;

