import React,{Component} from 'react';
import {
  View,
  Text,TextInput,Button
} from 'react-native';
import {localDb} from '../res/constants/constants';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase("UserDatabase.db")
export default class AddUser extends Component{

    constructor(props){
        super(props)
        state={
            id:"",
            name:"",
            age:"",
        }
    }

    

     addUser(){
        const id=this.state.id;
        const name=this.state.name;
        const age=this.state.age;
        console.log(id,name,age)
        const query='INSERT INTO UserData (id,name,age) VALUES (?,?, ?)'
        const params=[
          id,name,age
      ]
        db.transaction((txn)=>{ 
          txn.executeSql(query,params,(txn,results)=>{
            console.log(results)
          }
          );
          this.props.navigation.goBack() 
        
      })
     
      
    }

    render(){
      
        return(<View>
            <Text>Add User</Text>
            <TextInput placeholder="Id" onChangeText={(text)=>this.setState({id:text})}/>
            <TextInput placeholder="Name" onChangeText={(text)=>this.setState({name:text})}/>
            <TextInput placeholder="Age" onChangeText={(text)=>this.setState({age:text})}/>
            <Button title="Submit" onPress={()=> 
                  this.addUser() 
            }/>
        </View>)
    }
}