<script setup>
import axios from "axios";
import { onMounted, reactive, watch, ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Keyboard } from "swiper";
import { event } from "vue-gtag";
import "swiper/css";
import "swiper/css/navigation";

// 导入组件
import CommonHeader from "./CommonHeader.vue";
import CommonFooter from "./CommonFooter.vue";
import DeviceCard from "./DeviceCard.vue";

// 静态参数
const publicPort = 9527;
const websocketProtocol = location.protocol === "https:" ? "wss" : "ws";
const containerWidth = ref(992);
const cardWidth = ref(248);
const webSocketServer = `${websocketProtocol}://www.findzima.com/ws`;
const modules = ref([Navigation, Keyboard]);
const devices = reactive([]);
const leftOffset = ref(0);
const socket = ref(null);
const initState = ref(true);
const scanAni = ref("");
const showDeviceList = ref(false);
const hideInitialized = false;
const centerMode = ref(false);
const mdnsList = ["zima", "zima-2", "zima-3"];
const instance = axios.create({
  timeout: 300,
});
const emit = defineEmits(["gotoSlide"]);

const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
});

// 挂载时执行
onMounted(async () => {
  fetchZimaFormServer();
  await fetchZimaFromMdns();
  setLeftOffset();
});

// 监听devices的变化
watch(
  devices,
  (newDevices, oldDevices) => {
    setLeftOffset();
  },
  { deep: true }
);

// 设置左边距
const setLeftOffset = () => {
  const ww = window.innerWidth;

  leftOffset.value =
    devices.length > 1
      ? (ww - containerWidth.value) / 2
      : (ww - containerWidth.value) / 2 + cardWidth.value;

  if (ww >= 1440) {
    containerWidth.value = 992;
    cardWidth.value = 248;
  } else if (ww >= 1024 && ww < 1440) {
    containerWidth.value = 960;
    cardWidth.value = 240;
  } else {
    containerWidth.value = 352;
    cardWidth.value = 0;
    leftOffset.value = 0;
  }
  centerMode.value = ww < 1024 ? true : false;
};

// 动画迭代时执行
const onAnimationIteration = () => {
  scanAni.value = "";
  initState.value = false;
  if (devices.length > 0) {
    showDeviceList.value = true;
  } else {
    showDeviceList.value = false;
  }
};

// 重新扫描
const rescan = async () => {
  event("rescan", {
    event_category: "rescan",
    event_label: "rescan",
  });

  scanAni.value = "scan-animation";
  initState.value = true;
  await fetchZimaFromMdns();
  setLeftOffset();
};

// 初始化动画
const init = async () => {
  scanAni.value = "scan-animation";
};

// 重置状态
const reset = () => {
  scanAni.value = "";
  initState.value = true;
  showDeviceList.value = false;
};

// 把对象添加到数组，并且过滤掉重复的对象
const pushToArr = (arr, obj) => {
  let flag = true;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].hash == obj.hash) {
      flag = false;
      break;
    }
  }
  if (flag) {
    arr.push(obj);
  }
};

// Request zima devices from mdns
const fetchZimaFromMdns = async () => {
  for (let i = 0; i < mdnsList.length; i++) {
    try {
      const response = await instance.get(
        `http://${mdnsList[i]}.local:${publicPort}`
      );
      if (response.data.initialized && hideInitialized) return false;
      pushToArr(devices, response.data);
    } catch (error) {}
  }
};

// Request zima device from websocket server
const fetchZimaFormServer = () => {
  socket.value = new WebSocket(webSocketServer);
  socket.value.onopen = () => {
    console.log("WebSocket Client Connected");
  };
  socket.value.onmessage = (e) => {
    const message = JSON.parse(e.data);
    const messageType = message.type;
    switch (messageType) {
      case "ping":
        socket.value.send(JSON.stringify({ type: "pong" }));
        break;
      case "peers":
        message.peers.forEach((element) => {
          if (element.device.info.initialized && hideInitialized) return false;
          pushToArr(devices, element.device.info);
        });
        break;
      case "peer-joined":
        if (element.device.info.initialized && hideInitialized) return false;
        pushToArr(devices, message.peer.device.info);
        break;
      default:
        break;
    }
    if (message.type == "ping") {
      socket.value.send(JSON.stringify({ type: "pong" }));
    }
  };
};

const goto = () => {
  event("goto", {
    event_category: "goto",
    event_label: "help",
  });
  emit("gotoSlide", 2);
};

// when leave page, send disconnect message to server
window.onbeforeunload = () => {
  if (socket.value === null) return false;
  socket.value.send(JSON.stringify({ type: "disconnect" }));
};

// when window resize, reset left offset
window.onresize = () => {
  setLeftOffset();
};

// 对外暴露的方法
defineExpose({ init, reset });
</script>

<template>
  <div style="width: 100%">
    <div class="container find-section">
      <!-- Header Start -->
      <common-header>{{ $t("search.title") }}</common-header>
      <!-- Header Stop -->
    </div>
    <Transition name="slide" mode="out-in">
      <div class="container" v-if="!showDeviceList">
        <div class="is-flex is-justify-content-center">
          <div class="scan-card common-card is-flex is-align-items-center">
            <Transition name="fade" mode="out-in">
              <div class="is-flex" v-if="initState">
                <div class="is-flex-shrink-0 mr-40px">
                  <figure
                    class="image scan-image"
                    :class="scanAni"
                    @animationiteration="onAnimationIteration"
                  >
                    <img src="../assets/images/scan.svg" />
                  </figure>
                </div>
                <div class="is-flex-grow-1 is-flex is-align-items-center">
                  <div>
                    <h2 class="title is-3 mb-2">
                      {{ $t("search.scanning-card.title") }}
                    </h2>
                    <p class="desc mb-5">
                      {{ $t("search.scanning-card.desc") }}
                    </p>
                    <!-- <button class="button is-disabled">Scan</button> -->
                  </div>
                </div>
              </div>
              <div class="is-flex" v-else>
                <div class="is-flex-shrink-0 mr-40px">
                  <figure class="image scan-image">
                    <img src="../assets/images/help.svg" />
                  </figure>
                </div>
                <div class="is-flex-grow-1 is-flex is-align-items-center">
                  <div>
                    <h2 class="title is-3 mb-2">
                      {{ $t("search.error-card.title") }}
                    </h2>
                    <p class="desc mb-5">
                      {{ $t('search.error-card.desc') }}
                    </p>
                    <button class="button" @click="rescan">{{ $t('search.error-card.button') }}</button>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>

      <div class="gap" v-else>
        <swiper
          :slides-per-view="'auto'"
          :space-between="16"
          :slides-offset-before="leftOffset"
          :centered-slides="centerMode"
          :navigation="true"
          :keyboard="active"
          :modules="modules"
        >
          <swiper-slide v-for="(device, index) in devices" :key="index">
            <device-card :device="device"></device-card>
          </swiper-slide>
        </swiper>
      </div>
    </Transition>
    <div class="container">
      <!-- Footer Start -->
      <common-footer>
        <div class="bottom-button" @click="goto">{{ $t('search.footer.title') }}</div>
      </common-footer>
      <!-- Footer End -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.item {
  border: #333 1px solid;
  padding: 0.5rem;
  margin: 0.5rem;
}

.swiper-slide {
  width: 480px;
}
.gap {
  padding: 29px 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active {
  transition: all 0.3s ease-out;
}
.slide-leave-active {
  transition: all 0.3s ease-out;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(720px);
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(-720px);
}

@media (min-width: 1024px) and (max-width: 1439px) {
  .swiper-slide {
    width: 464px;
  }
  .gap {
    padding: 15px 0;
  }
}

@media (max-width: 1023px) {
  // Your styles here
  .swiper-slide {
    width: 352px;
  }
  .gap {
    padding: 0 0;
  }
}
</style>
