import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from "react-native";
import { Header, AirbnbRating, Icon } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";
import axios from "axios";

export default class PopularMoviesScreen extends Component{
constructor(props){
super(props);
this.state={
    data:[]
};

}

componentDidMount(){
    this.getData();
}

timeConvert(num){
    var hours = Math.floor(num/60);
    var min = num % 60;
    return `${hours} hrs ${min} mins`;
}

getData=()=>{
    const url = "http://localhost:5000/popular-movies";
    axios
    .get(url)
    .then(async res => {
        this.setState({data:res.data.data});
    })
    .catch(error => {
        console.log(`App Error : ${error}`)
    });
};

keyExtractor = (item,index) => index.toString();

renderItems = ({item,index}) => {
    return(
        <Card
        key={`card-${index}`}
        image={{uri:item.poster_link}}
        imageProps={{resizeMode:"cover"}}
        featuredTitled={item.title}
        containerStyle={styles.cardContainer}
        featuredTitledStyle={styles.title}
        featuredSubTitle={`${item.release_data.split("-")[0]} | ${item.timeConvert(item.duration)}`}
        featuredSubTitleStyle={styles.subtitle}
        >

        </Card>
    );
};

render(){
    const { data } = this.state;
    return(
        <View style={styles.container} >
<FlatList data={data} keyExtractor={this.keyExtractor} renderItem={this.renderItems}/>

        </View>

    );
}

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff"
    },
    title: {
      color: "#fff",
      alignSelf: "flex-start",
      paddingLeft: RFValue(15),
      fontSize: RFValue(25),
      marginTop: RFValue(65)
    },
    subtitle: {
      fontWeight: "bold",
      alignSelf: "flex-start",
      paddingLeft: RFValue(15),
      fontSize: RFValue(15)
    },
    cardContainer: {
      flex: 1,
      borderRadius: RFValue(10),
      justifyContent: "center",
      height: RFValue(110),
      marginBottom: RFValue(20)
    }
  });