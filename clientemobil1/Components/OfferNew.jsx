import { Picker } from 'react-native';
import { useState } from 'react';
import axios from "axios";
import { Switch,View, Text, TextInput,TouchableOpacity,CheckBox,Button } from 'react-native';

const OfferNew = ({navigation}) => {
    const [job, setJob] = useState({ position: "", languages: [], salary: null });
    const [positionError, setPositionError] = useState("");
    const [salaryError, setSalaryError] = useState("");
  
    const createJobOfferHandler = (e) => {
      //Función para realizar una petición PUT y actualizar un usuario
      e.preventDefault();
      axios
        .post("http://172.29.38.90:8001/api/offer/new", {
          jobName: job.position,
          earn: job.salary,
          languages: job.languages,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err.response.data);
          const errorResponse = err.response.data.errors;
          if (Object.keys(errorResponse).includes("jobName")) {
            setPositionError(errorResponse["jobName"].message);
          }
  
          if (Object.keys(errorResponse).includes("earn")) {
            setSalaryError(errorResponse["earn"].message);
          }
        });
    };
  
    const handleCheckboxChange = (value) => {
      const newLanguages = [...job.languages];
      if (newLanguages.includes(value)) {
        newLanguages.splice(newLanguages.indexOf(value), 1);
      } else {
        newLanguages.push(value);
      }
      setJob({ ...job, languages: newLanguages });
      console.log(job.languages);
    };
  
    return (
      <View>
        <Text>Nueva Oferta de Trabajo:</Text>
        <Button title="Job offers" onPress={() => navigation.navigate("Offers")} />
  
        <View>
          <Text>{positionError}</Text>
  
          <Text htmlFor="position">Puesto Requerido:</Text>
          <Picker
            selectedValue={job.position}
            onValueChange={(value) => setJob({ ...job, position: value })}
          >
            <Picker.Item label="Seleccione una opción" value="" />
            <Picker.Item label="Frontend developer" value="Frontend developer" />
            <Picker.Item label="Backend developer" value="Backend developer" />
            <Picker.Item label="DevOps" value="DevOps" />
            <Picker.Item label="Fullstack developer" value="Fullstack developer" />
          </Picker>
        </View>
        <View>
          <Text>Lenguajes Requeridos:</Text>
          <CheckBox
            value={job.languages.includes("JS")}
            onChange={() => handleCheckboxChange("JS")}
          />
          <Text>JS</Text>
          <CheckBox
            value={job.languages.includes("CSS")}
            onChange={() => handleCheckboxChange("CSS")}
          />
          <Text>CSS</Text>
        </View>
        <View>
          <Text htmlFor="salary">Salario:</Text>
          <TextInput
            value={job.salary}
            onChangeText={(value) => setJob({ ...job, salary: value })}
            keyboardType="numeric"
          />
          <Text>{salaryError}</Text>

        </View>   
          <TouchableOpacity onPress={createJobOfferHandler}>
                <Text>Añadir</Text>
            </TouchableOpacity>
        </View>
    );
};

export default OfferNew;
