import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,Alert,Linking} from 'react-native';
import *as React from 'react'
import {Header} from 'react-native-elements'
import database from "./database"

export default class App extends React.Component {

  constructor(){
    super();
    this.state={
      text: "",
      word: "",
      definition: "",
      lexicalCategory: "",
      totalDefs: 0,
      defNumber: 0,
      searched: false
    }
  
  }

  searchImages=()=>{
    var url = 'https://www.google.com/search?q=' + this.state.text + '&tbm=isch'
    console.log(url)
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + this.props.url);
      }
    });
  }

  
  setWord=(word,position)=>{
    var searchword = word.toLowerCase()

    var wordData = database[searchword]

    var definition = wordData["definition"]
    var lexicalCategory = wordData['lexicalCategory']
    var givenWord = this.state.text
    var firstLetter = givenWord.slice(0,1)
    var capitalLetter = firstLetter.toUpperCase()
    var remainingWord = givenWord.substring(1,givenWord.length)
    var finalWord = capitalLetter + remainingWord

        this.setState({
          word: "Word: " + finalWord,
          definition: "Definition: " + definition,
          lexicalCategory: "Word Type: " + lexicalCategory,
          searched: true
        })
  }
  
render(){
  return (
    <View style={styles.container}>
        <Header
  centerComponent={{ text: 'Dictionary App', style: { color: '#fff', fontSize: 25} }}
  containerStyle={{backgroundColor: '#548752',justifyContent: 'space-around',}}
    />
      <TextInput style={styles.input} onChangeText={(text)=>{this.setState({text: text})}} placeholder = "Enter Your Word..."/>
      <TouchableOpacity style={styles.button}
      onPress={()=>{
        this.setWord(this.state.text,0)
      }}
      ><Text style={styles.buttonText}>Find It!</Text></TouchableOpacity>
      <View style={styles.wordView}>
      <Text style={styles.wordText}>{this.state.word}</Text>
      <Text style={styles.wordText}>{this.state.lexicalCategory}</Text>
      <Text style={styles.wordText}>{this.state.definition}</Text>
      </View>
      {this.state.searched ?
        <TouchableOpacity style={styles.button2} onPress={()=>{this.searchImages()}}><Text style={styles.buttonText}>See Images of {this.state.word}</Text></TouchableOpacity>
      :null}
      
      
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  button: {
    borderRadius: 25,
    width: '50%',
    alignItems: "center",
    backgroundColor: "#dff7b5",
    height: 40,
    justifyContent: "center",
    margin: 20,
  },
  button2: {
    borderRadius: 25,
    width: '90%',
    alignItems: "center",
    backgroundColor: "#dff7b5",
    height: 40,
    justifyContent: "center",
    margin: 20,
  },
  buttonText: {
    fontSize: 20,
  },
  input:{
    borderWidth: 2,
    width: '70%',
    paddingLeft: 10,
    height: 50,
    fontSize: 18,
    marginTop: '20%',
  },
  wordText:{
    fontSize: 20,
    padding: 20,
    textAlign: "left"
  },

});
