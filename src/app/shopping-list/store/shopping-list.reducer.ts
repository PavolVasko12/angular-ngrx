import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

export interface AppState {
  shoppingList: State;
}

const initialState: State = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function shoppingListReducer(state: State = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {

    /******************* ADD_INGREDIENT ********************/
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };


    /******************* ADD_INGREDIENTS ********************/
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };


    /******************* UPDATE_INGREDIENT ********************/
    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload
      };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredientIndex: -1,
        editedIngredient: null
      };


     /******************* DELETE_INGREDIENT ********************/
    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ingre, ingreIndex) => {
          return ingreIndex !== state.editedIngredientIndex;
        })
      };


    /******************* START_EDIT ********************/
    case ShoppingListActions.START_EDIT:
    return {
      ...state,
      editedIngredientIndex: action.payload,
      editedIngredient: { ...state.ingredients[action.payload] }
    };


    /******************* STOP_EDIT ********************/
    case ShoppingListActions.STOP_EDIT:
    return {
      ...state,
      editedIngredient: null,
      editedIngredientIndex: -1
    };

    default:
      return state;
  }
}
