import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Male");
  const [singleFile, setSingleFile] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const getUserById = async () => {
    const response = await axios.get(`http://localhost:5000/users/${id}`);
    setName(response.data.name);
    setEmail(response.data.email);
    setGender(response.data.gender);
  };

  useEffect(() => {
    getUserById();
  }, []);

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      if (singleFile) {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("gender", gender);
        formData.append("file", singleFile);
        await axios.patch(`http://localhost:5000/users/${id}`, formData);
      } else {
        await axios.patch(`http://localhost:5000/users/empty/${id}`, {
          name,
          email,
          gender,
        });
      }
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const SingleFileChange = (e) => {
    setSingleFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  return (
    <div className="columns">
      <div className="column is-full">
        <form action="" onSubmit={updateUser}>
          <div className="field">
            <label htmlFor="" className="label">
              Name
            </label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="" className="label">
              Email
            </label>
            <div className="control">
              <input
                type="text"
                className="input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="" className="label">
              Gender
            </label>
            <div className="control">
              <div className="select is-fullwidth">
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
          </div>
          {/* file start */}
          <div className="field">
            <div className="file">
              <label className="file-label">
                <input
                  className="file-input"
                  type="file"
                  onChange={(e) => SingleFileChange(e)}
                />
                <span className="file-cta">
                  <span className="file-label">Choose a file…</span>
                </span>
              </label>
            </div>
          </div>
          {/* file end */}
          <div className="field">
            <div className="control">
              <button type="submit" className="button is-success">
                Update
              </button>
              <Link to="/" className="button is-danger ml-3">
                Batal
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
