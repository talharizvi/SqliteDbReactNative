import React,{Component} from 'react';
import {
  View,
  Text,TouchableOpacity,FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SearchBar } from 'react-native-elements';
import SQLite from 'react-native-sqlite-storage';

let db = SQLite.openDatabase('UserDatabase.db')
let testArr=[]
export default class Home extends Component{

    constructor(){
        super()
        this.state={
            searchQuery:"",
            loading: true, 
            data: [],
        }
        db.transaction(tx=>{
            tx.executeSql('CREATE TABLE IF NOT EXISTS '+"UserData"+' (id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,age INTEGER)');
        });
    }

   componentDidMount(){
      this.props.navigation.addListener('willFocus',()=>{
            console.log(testArr)
            this.empty()
            this.fetchData()
            this.setState({data:testArr,loading:false},()=>console.log(this.state.data))
        })
    }


    empty() {
        //empty your array
        testArr = [];
    }

    deleteItem(name){
        console.log(name)
        db.transaction(tx=>{
            tx.executeSql('DELETE FROM UserData WHERE UserData.name = ?',[name],(tx,res)=>{
                console.log(res)
            });
        });
        this.empty()
        this.fetchData()
        this.setState({data:testArr,loading:false},()=>console.log(this.state.data))
    }

   fetchData(){
            var query='SELECT name FROM UserData'
            var params = [];
            db.transaction(function(tx) {
                tx.executeSql(query,params,(tx,res)=>{
                    console.log(res);
                    console.log(res.rows);
                    if(res.rows.length>0){
                        for(i=0;i<res.rows.length;i++>0){
                            testArr.push(res.rows.item(i).name)
                        }
                        console.log(testArr)
                    }
                });
            })
    }

    

    static navigationOptions=({navigation})=>({
        title:'Home',
        headerRight:<View style={{flexDirection:'row',}}>
             <TouchableOpacity onPress={()=>{navigation.navigate('AddUser'),{onBack:this.onBack}}}>               
             <Icon name="plus" size={20} style={{marginRight:20}}/>
             </TouchableOpacity>   
            <Icon name="edit" size={20}  />
            </View>
    })

    render(){
        console.log(this.state.data)
        console.log(testArr)
        return(<View style={{flex:1}}>
           <SearchBar
               placeholder="Search by name"
               onChangeText={(text)=>this.setState({searchQuery:text})}
               value={this.state.searchQuery}
           />
           <FlatList
                data={this.state.data}
                renderItem={({item})=><View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text>{item}</Text>
                    <TouchableOpacity onPress={()=>this.deleteItem(item)}>
                    <Icon name="trash" size={20}></Icon>
                    </TouchableOpacity>
                    </View>
                    }
            />
        </View>)
    }
}