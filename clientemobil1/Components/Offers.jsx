import React, { useEffect, useState } from 'react';
import { Button,View, Text, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Offers = () => {
const [offerList, setOfferList] = useState([]);
const navigation = useNavigation();

useEffect(() => {
axios.get('http://172.29.38.90:8001/api/offers')
.then((offers) => setOfferList(offers.data))
.catch((err) => console.log(err));
}, []);

const updateOfferDom = (offerId) => {
setOfferList(offerList.filter((offer) => offer._id !== offerId));
};

const deleteHandler = (offerId) => {
axios.delete("http://172.29.38.90:8001/api/offer/${offerId}")
.then((res) => {
console.log(res);
updateOfferDom(offerId);
})
.catch((err) => console.log(err));
};

const renderItem = ({ item }) => (
<View>
<Text>{item.jobName} - {item.earn}</Text>
<TouchableOpacity onPress={() => navigation.navigate("UpdateOffer", { id: item._id })}>
<Text>View Offer+{  item._id }</Text>
</TouchableOpacity>
<TouchableOpacity onPress={() => deleteHandler(item._id)}>
<Text>Delete Offer</Text>
<Text>................................</Text>
<Text> </Text>

</TouchableOpacity>
</View>
);

return (
<View>

<Button title="New Offer" onPress={() => navigation.navigate('OfferNew')} />

<FlatList
data={offerList}
renderItem={renderItem}
keyExtractor={(item) => item._id}
/>
</View>
);
};

export default Offers;