<template>
    <div class="mx-[-80px]">
        <div v-if="loading" class="px-[80px] pb-2">
          <Device :loading="true"  />
        </div>
        <div v-else-if="devices.length==0" class="px-[80px] pb-2">
          <Device  />
        </div>
        <swiper
            v-else
            :slides-per-view="'auto'"
            :space-between="4"
            :navigation="false"
            :keyboard="true"
            :modules="modules"
            :mousewheel="true"
            style="padding: 0 80px;"
          >
            <swiper-slide v-for="(device, index) in devices" :key="index" class="pb-2" >
              <Device :device="device" class="transition hover:shadow-md"></Device>
            </swiper-slide>
          </swiper>
    </div>
</template>
<script setup>
import { onMounted , ref ,reactive } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Keyboard , Mousewheel } from "swiper";
import Device from "./Device.vue";
import "swiper/css";
import "swiper/css/navigation";

const websocketProtocol = "wss";
const host = 'find.zimaspace.com'
// const host = 'www.findzima.com'
const webSocketServer = `${websocketProtocol}://${host}/ws`;

const modules = ref([Keyboard,Mousewheel]);
const socket = ref(null);
const devices = reactive([]);
const loading = ref(true);
// 挂载时执行
onMounted(async () => {
  fetchZimaFormServer();
});


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
          pushToArr(devices, element.device.info);
        });
        break;
      case "peer-joined":
        pushToArr(devices, message.peer.device.info);
        break;
      default:
        break;
    }
    if (message.type == "ping") {
      socket.value.send(JSON.stringify({ type: "pong" }));
    }
    loading.value = false;
  };
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
</script>