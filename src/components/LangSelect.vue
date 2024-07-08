<template>
<div class="lang-wrapper">
  <img class="icon" src="../assets/images/lang.png" alt="icon">
  <ul>
    <li v-for="item in langList"  :class="{active:currentLang == item.code}" @click="handleChange(item)">{{ item.text }}</li>
  </ul>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n()

interface Item {
  text: string;
  code: string;
}
const langList = [
  {
    text:'English',
    code:'en-US',
  },
  {
    text:'Japanese',
    code:'ja-JP',
  },
  {
    text:'Chinese',
    code:'zh-CN',
  },
]
// 设置默认语言

const currentLang = ref('en-US')
// 读取浏览器当前语言
currentLang.value = window.navigator.language
// 读取本地存储的语言
const lang = localStorage.getItem('lang')
if(lang){
  currentLang.value = lang 
}
locale.value = currentLang.value

// 切换语言
const handleChange = (item:Item) => {
  locale.value = item.code
  currentLang.value = item.code
  localStorage.setItem('lang',item.code)
}

</script>


<style scoped>
.lang-wrapper{
  position: relative;
  height: 100%;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon{
  width: 16px;
  height: 16px;
  opacity: 0.5;
}
.lang-wrapper:hover .icon{
  opacity: 1;
}
ul{
  position: absolute;
  top: 64px;
  left: 0;
  background-color: black;
  padding: 0 0;
  width: 164px;
  height: 0px;
  opacity: 0;
  overflow: hidden;
  box-sizing: border-box;
  transition: all .3s ease;
}
.lang-wrapper:hover ul{
  height: auto;
  padding: 16px 0;
  opacity: 1;
}
ul li{
  color: rgba(255, 255, 255, .5);
  cursor: pointer;
  font-size: 14px;
  line-height: 30px;
  padding: 0 18px;
}
ul li:hover{
  color: rgba(255, 255, 255, 1);
  text-decoration: underline;
  background-color: rgba(255, 255, 255, .2);
}
ul li.active{
  color: rgba(255, 255, 255, 1);
  text-decoration: underline;
}
</style>