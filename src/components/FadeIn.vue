<template>
  <div
    ref="fadeInRef"
    :class="['fade-in', { 'is-visible': isVisible }]"
    :style="fadeInStyle"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

const props = defineProps({
  delay: {
    type: Number,
    default: 0, // 毫秒
  },
  direction: {
    type: String as () => 'up' | 'down' | 'left' | 'right',
    default: 'up',
    validator: (value: string) => ['up', 'down', 'left', 'right'].includes(value),
  },
  threshold: {
    type: Number,
    default: 0.15,
  },
})

const fadeInRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
let observer: IntersectionObserver | null = null

const fadeInStyle = computed(() => ({
  transitionDelay: `${props.delay}ms`,
  '--transform-direction': getTransformDirection(),
}))

const getTransformDirection = () => {
  switch (props.direction) {
    case 'up':
      return 'translateY(40px)'
    case 'down':
      return 'translateY(-40px)'
    case 'left':
      return 'translateX(40px)'
    case 'right':
      return 'translateX(-40px)'
    default:
      return 'translateY(40px)'
  }
}

onMounted(() => {
  observer = new window.IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        isVisible.value = true
        observer && observer.disconnect()
      }
    },
    { threshold: props.threshold }
  )
  if (fadeInRef.value) {
    observer.observe(fadeInRef.value)
  }
})

onBeforeUnmount(() => {
  observer && observer.disconnect()
})
</script>

<style scoped>
.fade-in {
  opacity: 0;
  transform: var(--transform-direction);
  transition:
    opacity 1s cubic-bezier(0.4, 0, 0.2, 1),
    transform 1s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: opacity, transform;
}
.fade-in.is-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>