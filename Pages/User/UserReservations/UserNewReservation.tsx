import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import { useRoute } from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import axios from 'axios';
import { useAppContext } from '../../../AppContext';

const UserNewReservation: React.FC = ({ navigation }) => {

  const { appData, setAppData } = useAppContext();

  // formdan seçilen veriler için
  const [bolge, setBolge] = useState("");
  const [sehir, setSehir] = useState("");
  const [bayi, setBayi] = useState("");
  // Veritabanından gelen veriler için
  const [regions, setRegions] = useState("");
  const [cities, setCities] = useState("");
  const [branches, setBranches] = useState("");

  //form için filtrelenmiş veriler
  const [Formregions, setFormRegions] = useState(['']);
  const [Formcities, setFormCities] = useState(['']);
  const [Formbranches, setFormBranches] = useState(['']);


  useEffect(() => { // API isteği tek defalık olmak üzere
    if (!regions) {
      fetchData();
    }
  }, [regions]);

  const fetchData = async () => { // API fonksiyonu
    axios.get(`${appData.apiUrl}/api/getBranchs`, {
      headers: {
        'Authorization': `Bearer ${appData.token}`,
      }
    })
      .then(response => {
        setFormRegions(response.data.message[2]);
        setCities(response.data.message[1]);
        setBranches(response.data.message[0]);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const filterCity =  () => {
    const tempcity = cities.filter(item => item.region == "Akdeniz");
    const tempcities=[];
    tempcity.forEach(item => {
      tempcities.push(item.city);
    });
    setFormCities(tempcities);
  }
  
  const filterBranch =  (itemx) => {
    const tempbranch = branches.filter(item => item.city == itemx);
    const tempbranches=[];
    tempbranch.forEach(item => {
      tempbranches.push(item.branch);
    })
    setFormBranches(tempbranches);
  }


  const mainX =  () => {
    if(bayi == ""){
      Alert.alert("Lütfen Bayi Seçin");
    }
    else{
      branches.forEach(item =>{
        if(item.branch == bayi){
          navigation.navigate('UserNewReservationDate',item.id);
        }
      })  
    }
  }
  return (
    <View style={styles.container}>
        <Text style={styles.text} >Bayi Seçiniz</Text>

        <SelectDropdown
            data={Formregions}
            onSelect={(selectedItem, index) => {
                setBolge(selectedItem);
                filterCity(bolge);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem
            }}
            rowTextForSelection={(item, index) => {
                return item
            }}
            defaultButtonText="Bölge Seçiniz"
            buttonStyle={styles.picker}
        />
        <SelectDropdown
            data={Formcities}
            onSelect={(selectedItem, index) => {
              setSehir(selectedItem);
              filterBranch(selectedItem);

            }}
            buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem
            }}
            rowTextForSelection={(item, index) => {
                return item
            }}
            defaultButtonText="Şehir Seçiniz"
            buttonStyle={styles.picker}
        />
        <SelectDropdown
            data={Formbranches}
            onSelect={(selectedItem, index) => {
                setBayi(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem
            }}
            rowTextForSelection={(item, index) => {
                return item
            }}
            defaultButtonText="Bayi Seçiniz"
            buttonStyle={styles.picker}
        />

        <TouchableOpacity style={styles.button} onPress={mainX}  >
            <Text style={styles.buttonText}><Icon name="calendar" color="#fff" size={25} /> Tarih Seç</Text>
        </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#fafbfb',
    },
    text: { 
        padding:20,
        color:"#09435a",
        fontSize:30,
    },
    picker: {
      marginTop:40,
      width:"80%",
      height: 50,
      borderWidth: 1,
      borderRadius: 5,
      borderColor:"#09435a"
    },
    button: {
        backgroundColor: "#09435a", 
        padding: 10,
        borderRadius: 5,
        width:"80%",
        marginTop:40,
        height: 50,


      },
      buttonText: { 
        color: 'white', 
        textAlign: 'center',
        fontSize: 20,
      },


  });

export default UserNewReservation;
