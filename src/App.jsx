import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    dob: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ username: "", email: "", dob: "", phone: "" });
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    const { username, email, dob, phone } = formData;

    if (!username) newErrors.username = "Username is required.";
    if (!email) newErrors.email = "Email is required.";
    else if (!email.includes("@"))
      newErrors.email = "Invalid email. Please check your email address.";

    if (!phone) newErrors.phone = "Phone number is required.";
    else if (!/^\d{10}$/.test(phone))
      newErrors.phone = "Invalid phone number. Please enter a 10-digit phone number.";

    if (!dob) newErrors.dob = "Date of Birth is required.";
    else if (new Date(dob) > new Date())
      newErrors.dob = "Invalid date of birth. Please select a valid past date.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleCloseModal();
    }
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal")) {
      handleCloseModal();
    }
  };

  return (
    <div id="root">
      {isModalOpen?null:<button className="open-button" onClick={handleOpenModal}>Open Form</button>}
      {isModalOpen && (
        <div className="modal" onClick={handleOutsideClick}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Form Modal</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
                {errors.username && <p className="error">{errors.username}</p>}
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && <p className="error">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="dob">Date of Birth</label>
                <input
                  type="date"
                  id="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                />
                {errors.dob && <p className="error">{errors.dob}</p>}
              </div>
              <div>
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                {errors.phone && <p className="error">{errors.phone}</p>}
              </div>
              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
