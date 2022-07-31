import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity , TextInput, ScrollView} from 'react-native';
import { theme } from './colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Fontisto } from '@expo/vector-icons'; 

const STORAGE_KEY = "@toDos";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});
  useEffect(()=>{
    loadToDos();
  },[])
  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (payload) => setText(payload);
  const saveToDos = async (toSave) => {
    const s = JSON.stringify(toSave) //JSON.stringify == object to string
    await AsyncStorage.setItem(STORAGE_KEY, s)
  };
  const loadToDos = async() =>{
    const s = await AsyncStorage.getItem(STORAGE_KEY)
    setToDos(JSON.parse(s)); //parse ==> string to Javascript object
  };
  const addToDo = async () => {
    if(text === ""){
      return
    }
    const newToDos = Object.assign({}, toDos, {[Date.now()]:{text, working}}) 
    //object.assing 자바스크립트 기능 이해하고넘어가기 형태 > { key : { key: value, key: value } }
    //const newToDos = {...toDos, [Date.now()]: {text, work: working},};이랑 같은뜻
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText("");
  };
  const deleteToDo = async(key) => {
    const newToDos = {...toDos}
    delete newToDos[key]
    setToDos(newToDos);
    await saveToDos(newToDos);
  }
  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <TouchableOpacity onPress={work}>
        <Text style={{...styles.btnText, color: working ? "white" : theme.grey}}>Work</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={travel}>
        <Text style={{...styles.btnText, color: !working ? "white" : theme.grey}}>Travel</Text>
      </TouchableOpacity>
    </View>
    <TextInput
      onSubmitEditing={addToDo}
      onChangeText={onChangeText}
      returnKeyType="done"
      value={text}
      placeholder={working ? "Add a To Do": "Where do you want to go"}
      style={styles.input}>
    </TextInput>
    <ScrollView>
      {
        Object.keys(toDos).map((key)=> (
        toDos[key].working === working ? <View style={styles.toDo} key={key}>
          <Text style={styles.toDoText}>{toDos[key].text}</Text>
          <TouchableOpacity onPress={()=> deleteToDo(key)}>
            <Fontisto name="trash" size={20} color="white" />
          </TouchableOpacity>
        </View> : null
        ))}
    </ScrollView>
    <StatusBar style="white" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20, //컨테이너를 가로방향으로 20
  },
  header :{
    justifyContent: "space-between",
    flexDirection:"row",
    marginTop:100,
  },
  btnText :{
    fontSize:38,
    fontWeight:"600",
  },
  input :{
    backgroundColor:"white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical : 20,
    fontSize : 18,
  },
  toDo: {
    backgroundColor:theme.toDoBg,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
  },
  toDoText :{
    color:"white",
    fontSize: 16,
    fontWeight: "500",
  },
});