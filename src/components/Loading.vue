<template>
  <ul class="flex h-full items-center justify-center">
    <li></li>
    <li class="mx-6"></li>
    <li></li>
  </ul>
</template>
<style scoped>
li {
  width: 8px;
  height: 8px;
  background-color: rgba(26, 26, 26, 0.35);
  border-radius: 4px;
  /* animation: jump infinite linear 1.5s; */
  animation: scale infinite linear 1s;
}

li:nth-child(2) {
  animation-delay: 0.2s;
}

li:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes scale {
  0% {
    transform: scale(1);
  }

  25% {
    transform: scale(1.5);
    opacity: 0.8;
  }

  75% {
    transform: scale(0.8);
  }

  100% {
    transform: scale(1);
  }
}
</style>