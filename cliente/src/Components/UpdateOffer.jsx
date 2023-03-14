import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from 'react-router-dom';


const UpdateOffer = () => {
  const { id } = useParams();
  const [job, setOffer] = useState({ position: "", languages: [], salary: 0 });
  const [dirty, setDirty] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/offer/" + id)
      .then((res) => setOffer(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    if (dirty) {
      OfferHandler();
      setDirty(false);
    }
  }, [dirty]);

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    setOffer((prevState) => {
      const newLanguages = [...prevState.languages];
      if (e.target.checked) {
        newLanguages.push(value);
      } else {
        const index = newLanguages.indexOf(value);
        if (index !== -1) {
          newLanguages.splice(index, 1);
        }
      }
      setDirty(true);
      return { ...prevState, languages: newLanguages };
    });
  };

  const OfferHandler = () => {
    console.log(job);
    axios
      .put(`http://localhost:8000/api/offer/${id}`, job)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>Actualización de Oferta:</h1>
      <Link to={'/api/offers'}><button> Job offers</button></Link>

      <form>
        <p>Job: {job.jobName}</p>
        <p>Salary: {job.earn}</p>
        <div>
          <label htmlFor="languages">Lenguajes Requeridos:</label>
          <input
            type="checkbox"
            name="languages"
            value="JS"
            checked={job.languages.includes("JS")}
            onChange={handleCheckboxChange}
          />{" "}
          JS
          <p></p>
          <input
            type="checkbox"
            name="languages"
            value="CSS"
            checked={job.languages.includes("CSS")}
            onChange={handleCheckboxChange}
          />{" "}
          CSS
        </div>
      </form>
    </div>
  );
};

export default UpdateOffer;
