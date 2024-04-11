import { defineStore } from 'pinia'
import axios from 'axios'
import { INGREDIENTS_URL, COCKTAILS_BY_INGR_URL } from '../constants'

export const useRootStore = defineStore('root', {
state: ()=>({
  ingredients: [],
  ingredient: null, //далее пишем метод, чтобы установить ингредиент
  cocktails: [],
}),
actions: { //здесь мы задаем методы для их использования в других файлах, методы чтобы поместить информацию в хранилище проекта
  async getIngredients(){
    const data = await axios.get(INGREDIENTS_URL)
    this.ingredients = data?.data?.drinks
  },
  async getCocktails(ingredient){
    const data = await axios.get(`${COCKTAILS_BY_INGR_URL}${ingredient}`)
    this.cocktails = data?.data?.drinks
  },
  setIngredient(val){ //здесь размещаем ingredient, чтобы он помещался в хранилище, и когда мы переходим на страницу коктейля и возвращаемся обратно, мы снова остаемся на этом ингредиенте
    this.ingredient = val;
  }
}
})
