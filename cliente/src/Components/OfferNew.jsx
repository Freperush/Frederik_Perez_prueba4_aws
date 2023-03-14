
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';


const OfferNew = () => {
    const [job, setJob] = useState({position:'', languages:[], salary: null});
    let navigation = useNavigate();
    const [positionError, setPositionError] = useState("");
    const [salaryError, setSalaryError] = useState("");


    const createJobOfferHandler = (e) => {
        //Función para realizar una petición PUT y actualizar un usuario
        e.preventDefault();
        axios.post('http://localhost:8001/api/offer/new', {
            jobName: job.position,
            earn: job.salary,
            languages: job.languages
        })
            .then(res => {
                console.log(res);
              
            })
            .catch(err => {

                console.log(err.response.data);
                const errorResponse = err.response.data.errors;
                if(Object.keys(errorResponse).includes('jobName')){
                    setPositionError(errorResponse['jobName'].message);
                  }
                  
                  if(Object.keys(errorResponse).includes('earn')){
                    setSalaryError(errorResponse['earn'].message)
                  }
                  
                })
    }
    const handleCheckboxChange = (e) => {
        const newLanguages = [...job.languages];
        if (e.target.checked) {
            newLanguages.push(e.target.value);
        } else {
            newLanguages.splice(newLanguages.indexOf(e.target.value), 1);
        }
        setJob({...job, 'languages':newLanguages});
        console.log(job.languages)
    }

    return(
          <div>
        <h1>Nueva Oferta de Trabajo:</h1>
        <Link to={'/api/offers'}><button> Job offers</button></Link>
      

        <form onSubmit={createJobOfferHandler}>
            <div>
            <p>{positionError}</p>

                <label htmlFor="position" >Puesto Requerido:</label>
                <select id="position" onChange={(e) => setJob({...job, 'position':e.target.value})} >
                <option ></option>

                    <option value="Frontend developer">Frontend developer</option>
                    <option value="Backend developer">Backend developer</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Fullstack developer">Fullstack developer</option>
                </select>
            </div>
            <div>
                <label htmlFor="languages" >Lenguajes Requeridos:</label>
                <input type="checkbox" name="languages" value="JS" onChange={handleCheckboxChange} /> JS
                <input type="checkbox" name="languages" value="CSS" onChange={handleCheckboxChange} /> CSS
            </div>
            <div>
                <label htmlFor="salary" >Salario:</label>
                <input type="number" id="salary" onChange={(e) => setJob({...job, 'salary':e.target.value})} />
                <p>{salaryError}</p>

            </div>
            <input type="submit" value="Añadir"/>        </form>
    </div>
    );
}
export default OfferNew;
