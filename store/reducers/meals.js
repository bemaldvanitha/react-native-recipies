import {MEALS} from '../../data/dummy-data';
import {TOGGLE_FAVORITE,SET_FILTERS} from  '../actions/mealsAction';

const initialState = {
  meals:MEALS,
  filteredMeals:MEALS,
  favoriteMeals:[],
};

const mealsReducer = (state = initialState,action) => {
    switch (action.type) {
        case TOGGLE_FAVORITE:
            const existIndex = state.favoriteMeals.findIndex(meal => meal.id === action.payload);
            if(existIndex>=0){
                const updateFavMeals = [...state.favoriteMeals];
                updateFavMeals.splice(existIndex,1);
                return {...state,favoriteMeals: updateFavMeals};
            }else{
                return {...state,favoriteMeals: state.favoriteMeals.concat(state.meals.find(meal => meal.id === action.payload))}
            }
        case SET_FILTERS:
            const appliedFilters = action.payload;
            const fileredMeals = state.meals.filter(meal => {
               if(appliedFilters.glutenFree && !meal.isGlutenFree){
                   return false;
               }
               if(appliedFilters.lactosFree && !meal.isLactoseFree){
                   return false;
               }
               if(appliedFilters.vegan && !meal.isVegan){
                   return false;
               }
               if(appliedFilters.isVegetarian && !meal.isVegetarian){
                   return false;
               }
               return true
            });
            return {...state,filteredMeals: fileredMeals};
        default: return state;
    }
};

export default mealsReducer;