import { useEffect, useState } from "react";

import PropTypes from "prop-types";

Form.propTypes = {
  addEntry: PropTypes.func.isRequired,
};

const defaultPicture =
  "https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg";

export default function Form({ addEntry }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    city: "",
    district: "",
    province: "",
    country: "Nepal",
    profilePicture: defaultPicture,
  });
  const [errors, setErrors] = useState({});

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onabort = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "profilePicture") {
      const file = e.target.files[0];
      getBase64(file).then((base64) => {
        if (base64.startsWith("data:image/png;base64")) {
          setFormData((prevData) => ({
            ...prevData,
            profilePicture: base64,
          }));
        } else {
          setFormData((prevData) => ({
            ...prevData,
          }));
        }
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateFormData(formData);
    if (Object.keys(validationErrors).length === 0) {
      addEntry({ ...formData, id: Math.floor(Math.random() * 1000) });
      setFormData({
        name: "",
        email: "",
        phone: "",
        dob: "",
        city: "",
        district: "",
        province: "",
        country: "Nepal",
        profilePicture: defaultPicture,
      });
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  const validateFormData = (data) => {
    const errors = {};
    if (!data.name) {
      errors.name = "Name is required";
    }
    if (!data.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Email is invalid";
    }
    if (!data.phone) {
      errors.phone = "Phone number is required";
    } else if (data.phone.length < 7) {
      errors.phone = "Phone number must be at least 7 digits";
    }

    return errors;
  };

  useEffect(() => {
    const validationErrors = validateFormData(formData);
    setErrors(validationErrors);
  }, [formData]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-1/2 mb-20">
      <label>
        Name <span>*</span>
        {errors.name && <span>{errors.name}</span>}
      </label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />

      <label>
        Email <span>*</span>
        {errors.email && <span>{errors.email}</span>}
      </label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <label>
        Mobile Number<span>*</span>
        {errors.phone && <span>{errors.phone}</span>}
      </label>
      <input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone"
      />
      <label>Date of Birth</label>
      <input
        type="date"
        name="dob"
        value={formData.dob}
        onChange={handleChange}
      />
      <label>City</label>
      <input
        type="text"
        name="city"
        value={formData.city}
        onChange={handleChange}
        placeholder="City"
      />
      <label>District</label>
      <input
        type="text"
        name="district"
        value={formData.district}
        onChange={handleChange}
        placeholder="District"
      />
      <label>Province</label>
      <select
        name="province"
        value={formData.province}
        onChange={handleChange}
        className="p-4 rounded-md"
      >
        <option value="">Select Province</option>
        <option value="Province 1">Province 1</option>
        <option value="Province 2">Province 2</option>
        <option value="Province 3">Province 3</option>
        <option value="Province 4">Province 4</option>
        <option value="Province 5">Province 5</option>
        <option value="Province 6">Province 6</option>
        <option value="Province 7">Province 7</option>
      </select>
      <label>Country</label>
      <input type="text" name="country" value={formData.country} disabled />
      <label>Profile Picture</label>

      <div className="flex items-center gap-3">
        <img
          src={formData.profilePicture}
          alt="default"
          className="w-1/3 object-contain"
        />
        <input
          type="file"
          name="profilePicture"
          onChange={handleChange}
          className="p-0 mb-4 "
          accept="image/png"
        />
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-[#843E71] text-white rounded-md py-3 px-7 text-lg"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
