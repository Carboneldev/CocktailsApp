<script setup>
import axios from "axios"
import { ref, computed } from 'vue'; //ref нужен для реактивности
import AppLayout from '../components/AppLayout.vue';
import { COCKTAIL_BY_ID } from '@/constants';
import { useRoute } from 'vue-router'; //чтобы получить коктейль по id

const route = useRoute() //создаем объект в котором будет храниться все после доменного имени

const cocktail = ref(null);
const cocktailId = computed(()=>route.path.split('/').pop());
 //мы создаем массив для ингредиентов
const ingredients = computed(()=>{
 const ingredients = []

 for (let i = 1; i<=15; i++){
    if (!cocktail.value[`strIngredient${i}`])break

    const ingredient = {}
    ingredient.name = cocktail.value[`strIngredient${i}`]
    ingredient.measure = cocktail.value[`strMeasure${i}`]

    ingredients.push(ingredient)
 }
 return ingredients;
})

async function getCocktail(){
    const data = await axios.get(`${COCKTAIL_BY_ID}${cocktailId.value}`)
    cocktail.value = data?.data?.drinks[0];
}

getCocktail()
</script>

<template>
    <div v-if="cocktail" class="wrap">
        <AppLayout 
        :imgUrl="cocktail.strDrinkThumb">
<div class="wrapper">
   <div class="info">
        <div class="title">{{ cocktail.strDrink }}</div>
        <div class="line"></div>
        <div class="list">
            <div v-for="(item, key) in ingredients" :key="key" class="list-item">
            {{ item.name }}
            <template v-if="item.measure">
            |
            {{ item.measure }}
            </template>
            </div>
            
        </div>
        <div class="instruction">
            {{ cocktail.strInstructions }}
        </div>
        </div>
         </div>
    </AppLayout>
    </div>
   
</template>

<style lang="sass" scoped>
@import '../assets/styles/main.sass'


</style>