import React,{useState,useEffect,useCallback} from 'react';
import {View, Text, StyleSheet, Platform,Switch} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useDispatch} from 'react-redux';
import Colors from "../constants/Colors";
import {setFilter} from '../store/actions/mealsAction';

const FilterScreen = (props) => {
    const {navigation} = props;
    const [isGlutenFree,setIsGlutenFree] = useState(false);
    const [isVegan,setIsVegan] = useState(false);
    const [isVegetarian,setIsVegitarian] = useState(false);
    const [isLactosFree,setIsLactosFree] = useState(false);

    const dispatch = useDispatch();

    const saveFilters = useCallback(() => {
      const appliedFilters = {
        glutenFree : isGlutenFree,
          vegan : isVegan,
          lactoseFree : isLactosFree,
          vegetarian: isVegetarian,
      };

      dispatch(setFilter(appliedFilters));
      console.log(appliedFilters);
    },[isVegetarian,isLactosFree,isVegan,isGlutenFree,dispatch]);

    useEffect(() => {
        navigation.setParams({save: saveFilters});
    },[saveFilters]);

    return(
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters</Text>
            <View style={styles.filterContainer}>
                <Text>Gluten free</Text>
                <Switch trackColor={{true: Colors.primaryColor}} thumbColor={Colors.primaryColor} value={isGlutenFree} onValueChange={newValue => setIsGlutenFree(newValue)}/>
            </View>
            <View style={styles.filterContainer}>
                <Text>Vegan</Text>
                <Switch trackColor={{true: Colors.primaryColor}} thumbColor={Colors.primaryColor} value={isVegan} onValueChange={newValue => setIsVegan(newValue)}/>
            </View>
            <View style={styles.filterContainer}>
                <Text>Vegitarian</Text>
                <Switch trackColor={{true: Colors.primaryColor}} thumbColor={Colors.primaryColor} value={isVegetarian} onValueChange={newValue => setIsVegitarian(newValue)}/>
            </View>
            <View style={styles.filterContainer}>
                <Text>Lactos free</Text>
                <Switch trackColor={{true: Colors.primaryColor}} thumbColor={Colors.primaryColor} value={isLactosFree} onValueChange={newValue => setIsLactosFree(newValue)}/>
            </View>
        </View>
    )
};

FilterScreen.navigationOptions = (NavData) => {
    return{
        headerTitle: 'Filter',
        headerLeft: () => (
            <Ionicons name="ios-menu" size={24} color="white" onPress={() => {NavData.navigation.toggleDrawer()}}/>
        ),
        headerRight: () => (
            <Ionicons name="ios-save" size={24} coloe="white" onPress={
                NavData.navigation.getParam('save')
            }/>
        )
    }
};


const styles = StyleSheet.create({
    screen:{
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center'
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80%',
        marginTop: 30,
        padding: 10
    }
});

export default FilterScreen;