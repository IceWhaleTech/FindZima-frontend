<script setup></script>
<template>
  <header>
    <div class="is-flex">
      <div class="is-flex-grow-1 border"></div>
      <div class="big-title">
        <div class="title-text">
          <slot></slot>
        </div>
      </div>
      <div class="is-flex-grow-1 border right"></div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  padding-bottom: 100px;
  .border {
    background: url(../assets/images/left.png) no-repeat bottom;
    background-size: 100% 26px;

    &.right {
      transform: scaleX(-1);
    }
  }
  .big-title {
    position: relative;
    padding: 0 54px;
    height: 40px;
    .title-text {
      font-size: 40px;
      font-weight: 700;
      line-height: 38px;
      color: rgba(228, 232, 236, 0.9);
      border-bottom: rgba(225, 227, 229, 0.9) 2px solid;
    }

    &:before {
      position: absolute;
      display: block;
      content: "";
      width: 54px;
      height: 100%;
      left: 0px;
      background: url(../assets/images/border.png) no-repeat bottom;
    }
    &:after {
      position: absolute;
      display: block;
      content: "";
      width: 54px;
      height: 100%;
      right: 0px;
      top: 0;
      transform: scaleX(-1);
      background: url(../assets/images/border.png) no-repeat bottom;
    }
  }
}

@media (min-width: 1024px) and (max-width: 1439px) {
  header {
    padding-bottom: 60px;
    .big-title {
      height: 36px;
      .title-text {
        font-size: 36px;
        line-height: 34px;
      }
    }
  }
}

@media (max-width: 1023px) {
  // Your styles here
  header {
    padding-bottom: 48px;
    .big-title {
      height: 26px;
      .title-text {
        font-size: 26px;
        line-height: 24px;
      }
    }
  }
}
</style>
