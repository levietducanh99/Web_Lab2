import { useState, useEffect } from 'react';

function ResultTable({ keyword, user, onAdded }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  // Tải dữ liệu 1 lần khi component mount
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading users:", err);
        setLoading(false);
      });
  }, []);

  // Thêm người dùng mới
  useEffect(() => {
    if (user) {
      setUsers((prev) => [...prev, { ...user, id: prev.length + 1 }]);
      onAdded();
    }
  }, [user, onAdded]);

  // Lọc danh sách theo keyword
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(keyword.toLowerCase()) ||
      u.username.toLowerCase().includes(keyword.toLowerCase())
  );

  // Sửa người dùng
  function editUser(user) {
    setEditing({ ...user, address: { ...user.address } });
  }

  // Cập nhật giá trị khi chỉnh sửa
  const handleEditChange = (field, value) => {
    if (["street", "suite", "city"].includes(field)) {
      setEditing({
        ...editing,
        address: { ...editing.address, [field]: value }
      });
    } else {
      setEditing({ ...editing, [field]: value });
    }
  };

  // Lưu sau khi chỉnh sửa
  function saveUser() {
    if (editing.name === "" || editing.username === "") {
      alert("Vui lòng nhập Name và Username!");
      return;
    }
    setUsers(prev => prev.map(u => (u.id === editing.id ? editing : u)));
    setEditing(null);
  }

  // Xóa người dùng
  function removeUser(id) {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }

  if (loading) {
    return <div className="loading">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>City</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.address.city}</td>
              <td>
                <button className="btn-edit" onClick={() => editUser(u)}>
                  Sửa
                </button>
                <button className="btn-delete" onClick={() => removeUser(u.id)}>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredUsers.length === 0 && (
        <div className="no-results">Không tìm thấy kết quả</div>
      )}

      {/* Modal chỉnh sửa */}
      {editing && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>✏️ Chỉnh sửa người dùng</h4>

            {/* Thông tin cơ bản - 2 cột */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="edit-name">Họ và tên *</label>
                <input
                  id="edit-name"
                  type="text"
                  placeholder="Nhập họ tên"
                  value={editing.name}
                  onChange={(e) => handleEditChange("name", e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit-username">Username *</label>
                <input
                  id="edit-username"
                  type="text"
                  placeholder="Nhập username"
                  value={editing.username}
                  onChange={(e) => handleEditChange("username", e.target.value)}
                />
              </div>
            </div>

            {/* Email - Full width */}
            <div className="form-row">
              <div className="form-group full-width">
                <label htmlFor="edit-email">📧 Email</label>
                <input
                  id="edit-email"
                  type="email"
                  placeholder="example@email.com"
                  value={editing.email}
                  onChange={(e) => handleEditChange("email", e.target.value)}
                />
              </div>
            </div>

            {/* Địa chỉ - 2 cột */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="edit-street">🏠 Đường</label>
                <input
                  id="edit-street"
                  type="text"
                  placeholder="Số nhà, tên đường"
                  value={editing.address.street}
                  onChange={(e) => handleEditChange("street", e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit-suite">🏢 Phòng/Tầng</label>
                <input
                  id="edit-suite"
                  type="text"
                  placeholder="Apt. 123"
                  value={editing.address.suite}
                  onChange={(e) => handleEditChange("suite", e.target.value)}
                />
              </div>
            </div>

            {/* Thành phố - Full width */}
            <div className="form-row">
              <div className="form-group full-width">
                <label htmlFor="edit-city">🌆 Thành phố</label>
                <input
                  id="edit-city"
                  type="text"
                  placeholder="Tên thành phố"
                  value={editing.address.city}
                  onChange={(e) => handleEditChange("city", e.target.value)}
                />
              </div>
            </div>

            {/* Liên hệ - 2 cột */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="edit-phone">📱 Số điện thoại</label>
                <input
                  id="edit-phone"
                  type="text"
                  placeholder="0123456789"
                  value={editing.phone}
                  onChange={(e) => handleEditChange("phone", e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit-website">🌐 Website</label>
                <input
                  id="edit-website"
                  type="text"
                  placeholder="www.example.com"
                  value={editing.website}
                  onChange={(e) => handleEditChange("website", e.target.value)}
                />
              </div>
            </div>

            <div className="modal-buttons">
              <button className="btn-save" onClick={saveUser}>
                ✓ Lưu
              </button>
              <button className="btn-cancel" onClick={() => setEditing(null)}>
                ✕ Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResultTable;

