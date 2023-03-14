import axios from "axios";
import { useEffect, useState } from "react";
import { Switch,TouchableOpacity, View, Text,CheckBox } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

const UpdateOffer = () => {
const [job, setOffer] = useState({ position: "", languages: [], salary: 0 });
const [dirty, setDirty] = useState(false);
const navigation = useNavigation();
const route = useRoute();
const id = route.params.id;

useEffect(() => {
axios
.get("http://172.29.38.90:8001/api/offer/" + id)
.then((res) => setOffer(res.data))
.catch((err) => console.log(err));
}, [id]);

useEffect(() => {
if (dirty) {
OfferHandler();
setDirty(false);
}
}, [dirty]);

const handleCheckboxChange = (value) => {
setOffer((prevState) => {
const newLanguages = [...prevState.languages];
if (newLanguages.includes(value)) {
const index = newLanguages.indexOf(value);
if (index !== -1) {
newLanguages.splice(index, 1);
}
} else {
newLanguages.push(value);
}
setDirty(true);
return { ...prevState, languages: newLanguages };
});
};

const OfferHandler = () => {
console.log(id);
axios
.put("http://172.29.38.90:8001/api/offer/" + id, job)
.then((res) => {
console.log(res);
})
.catch((err) => console.log(err));
};

return (
<View>
<Text>Actualización de Oferta:{job.salary}</Text>
<TouchableOpacity onPress={() => navigation.navigate('Offers')}>
<Text>Offer</Text>
</TouchableOpacity>
<View>
<Text>Job: {job.jobName}</Text>
<Text>Salary: {job.earn}</Text>
<View>
  <Text>Lenguajes Requeridos:</Text>
  <Switch
    value={job.languages.includes("JS")}
    onValueChange={() => handleCheckboxChange("JS")}
  />
  <Text>JS</Text>
  <Switch
    value={job.languages.includes("CSS")}
    onValueChange={() => handleCheckboxChange("CSS")}
  />
  <Text>CSS</Text>
</View>

</View>
</View>
);
};

export default UpdateOffer;