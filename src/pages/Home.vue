<script setup>
import AppLayout from '../components/AppLayout.vue';
import CocktailThumb from '../components/CocktailThumb.vue'
import { useRootStore } from '@/stores/root'
import { storeToRefs } from 'pinia';

const rootStore = useRootStore()

rootStore.getIngredients();

const { ingredients, ingredient, cocktails } = storeToRefs(rootStore);

function getCocktails() {
  rootStore.getCocktails(rootStore.ingredient);
}

function removeIngredient() {
  rootStore.setIngredient(null)
}
</script>

<template>
  <AppLayout imgUrl="/img/bg1small.jpg" :backFunc="removeIngredient" :is-back-button-visible="!!ingredient">
    <div class="wrapper">
      <div v-if="!rootStore.ingredient || !cocktails" class="info">
        <div class="title">Choose your drink</div>
        <div class="line"></div>
        <div class="select-wrapp">
          <el-select
            v-model="rootStore.ingredient"
            placeholder="Choose the main ingredient"
            size="large"
            filterable
            allow-create
            class="select"
            style="width: 240px"
            @change="getCocktails"
          >
            <el-option
              v-for="item in ingredients"
              :key="item.strIngredient1"
              :label="item.strIngredient1"
              :value="item.strIngredient1"
            />
          </el-select>
        </div>
        <div class="text">
          Try our delicious cocktail recipes for every occasion. Find delicious cocktail recipes by ingredient through our cocktail generator.
        </div>
        <img src="/img/cocktails.png" class="img" alt="Cocktails">
      </div>
      <div v-else class="info">
        <div class="title">COCKTAILS WITH {{ingredient}} </div>
        <div class="line"></div>
        <div class="cocktails">
          <CocktailThumb 
            v-for="cocktail in cocktails" 
            :key="cocktail.idDrink"
            :cocktail="cocktail"
          />
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<style lang="sass" scoped>
@import '../assets/styles/main.sass'

.select-wrapp
  padding-top: 50px
  transition: transform 500ms ease

  &:hover, 
  &:active
    transform: scale(1.1) translateY(-5px)

  .select
    width: 220px

.text
  max-width: 516px
  margin: 0 auto
  padding-top: 50px
  line-height: 36px
  letter-spacing: 0.1em
  color: $textMuted

.img
  margin-top: 60px

.cocktails
  display: flex
  align-items: center
  margin-top: 60px
  flex-wrap: wrap
  max-height: 400px
  overflow-y: auto
</style>
