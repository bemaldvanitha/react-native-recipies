import React from 'react';
import {useSelector} from 'react-redux';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import MealItem from "../components/MealItem";
import {MEALS} from "../data/dummy-data";
import {Ionicons} from '@expo/vector-icons';

const Favoritescreen = (props) => {
    const favMeals = useSelector(state => state.meals.favoriteMeals);

    if(favMeals.length === 0|| !favMeals){
        return <View style={styles.content}>
            <Text>Favorite meal list is empty</Text>
        </View>
    }
    return(
        <View style={styles.screen}>
            <FlatList keyExtractor={(item,index) => item.id} style={{width: '100%'}} data={favMeals} renderItem={(itemData) => {
                return(
                    <MealItem meal={itemData.item} onSelectMeal={() => {
                        props.navigation.navigate({routeName: 'MealDetails',params:{mealId: itemData.item.id}})
                    }}/>
                )
            }}/>
        </View>
    )
};

Favoritescreen.navigationOptions = (NavData) => {
    return{
        headerLeft: () => (
            <Ionicons name="ios-menu" size={24} color="white" onPress={() => {NavData.navigation.toggleDrawer()}}/>
        )
    }
};

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default Favoritescreen;