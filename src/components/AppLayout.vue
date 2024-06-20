<template>
  <div class="root">
    <div :style="`background-image: url(${imgUrl})`" class="img"></div>
    <div class="main">
      <div class="btns">
        <el-button 
          v-if="isBackButtonVisible"
          type="primary" 
          :icon="Back"  
          class="back" 
          @click="goBack" 
          circle />
        <el-button @click="goForCocktailRandom" class="btn">Get random cocktail</el-button>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { Back } from '@element-plus/icons-vue'
import { defineProps } from 'vue';
import { computed } from 'vue';
import { ROUTES_PATHS } from '@/constants';

const props = defineProps({
  imgUrl: {
    type: String,
    required: true
  },
  backFunc: {
    type: Function,
  },
  isBackButtonVisible: {
    type: Boolean,
    default: true
  }
});

const route = useRoute()
const router = useRouter()

const routeName = computed(() => route.name);

function goForCocktailRandom() {
  router.push(ROUTES_PATHS.COCKTAIL_RANDOM);
  if (routeName.value === ROUTES_PATHS.COCKTAIL_RANDOM) {
    router.go()
  }
}

function goBack() {
  props.backFunc ? props.backFunc() : router.go(-1);
}
</script>

<style lang="sass" scoped>
@import '../assets/styles/main.sass'

@import '../assets/styles/main.sass'

.root
  display: flex
  background-color: $background
  min-height: 100vh

.img
  width: 50%
  background-repeat: no-repeat
  background-position: 50% 50%
  background-size: cover

.main
  position: relative
  padding: 32px 40px
  width: 50%
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  text-align: center

  .btn
    position: relative
    font-size: 16px
    font-family: 'Raleway', 'Arial', 'sans-serif'
    background-color: $accent
    border-color: $accent
    color: $text
    transition: transform 500ms ease
    margin-top: 20px

    &:hover, 
    &:active
      background-color: darken($accent, 10%)
      border-color: darken($accent, 10%)
      transform: scale(1.1) translateY(-5px)

  .btns
    display: flex
    justify-content: center
    align-items: center
    width: 100%

  .back
    background: transparent
    border-color: #fff
    transition: transform 500ms ease
    position: absolute
    top: 20px
    left: 20px

    &:hover
      border-color: $accent
      transform: scale(1.1) translateY(-5px)
</style>
