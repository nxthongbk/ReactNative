import React, { Component } from 'react';
import {
 FlatList,Text,View,styleSheet,
} from 'react-native';
import { ListItem } from 'react-native-elements'

export default class _lis extends component{
  render(){
    return(
      <View style={styles.container}>
        <FlatList
        data={[{key:'a'},{key:'b'}]}
          renderItem={({item}) => <Text>{item.key}</Text>}>

        </FlatList>
      </View>
    );
  }
  
}
const styles= StyleSheet.create({
  container:{
    flex: 1,
    justifyContent:'center',
    alignItems:'center',

  }

}
)