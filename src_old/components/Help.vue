<script setup>
import CommonHeader from "./CommonHeader.vue";
import CommonFooter from "./CommonFooter.vue";
import { event } from "vue-gtag";

const docs_link = "https://docs.zimaboard.com/faq/How-to-check-IP-address.html";
const discord_link = "https://zimaboard.com/discord";

const readDocs = () => {
  event("link", {
    event_category: "link",
    event_label: "docs",
  });
  window.open(docs_link);
};

const joinDiscord = () => {
  event("link", {
    event_category: "link",
    event_label: "discord",
  });
  window.open(discord_link);
};
</script>

<template>
  <div class="container help-section">
    <!-- Header Start -->
    <common-header>{{ $t("help.title") }}</common-header>
    <!-- Header Stop -->
    <div class="container">
      <div class="main-contents">
        <div class="columns is-variable is-2">
          <div class="column">
            <div class="main-card common-card card1">
              <div class="is-flex">
                <div class="is-flex-shrink-0 mr-5">
                  <figure class="image">
                    <img src="../assets/images/read.svg" />
                  </figure>
                </div>
                <div class="is-flex-grow-1">
                  <h2 class="title is-3 mb-2">
                    {{ $t("help.doc-card.title") }}
                  </h2>
                  <p class="desc mb-5">
                    {{ $t("help.doc-card.desc") }}
                  </p>
                  <button class="button" @click="readDocs">
                    {{ $t("help.doc-card.button") }}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="main-card common-card card1">
              <div class="is-flex">
                <div class="is-flex-shrink-0 mr-5">
                  <figure class="image">
                    <img src="../assets/images/Discord.svg" />
                  </figure>
                </div>
                <div class="is-flex-grow-1">
                  <h2 class="title is-3 mb-2" v-html="$t('help.communtity-card.title')">
                    
                  </h2>
                  <p class="desc mb-5">
                    {{ $t("help.communtity-card.desc") }}
                  </p>
                  <button class="button" @click="joinDiscord">
                    {{ $t("help.communtity-card.button") }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Start -->
    <common-footer line-style="border2">
      <div class="columns is-mobile">
        <div class="column has-text-left">
          <a href="https://www.zimaspace.com/products/single-board-server" target="_blank" class="link">{{
            $t("help.footer.link-text1")
          }}</a>
        </div>
        <div class="column has-text-centered">
          <a href="https://www.zimaspace.com/products/blade-personal-nas" target="_blank" class="link">{{
            $t("help.footer.link-text2")
          }}</a>
        </div>
        <div class="column has-text-right">
          <a href="https://www.zimaspace.com/products/cube-personal-cloud" target="_blank" class="link">{{
            $t("help.footer.link-text3")
          }}</a>
        </div>
      </div>
    </common-footer>
    <!-- Footer End -->

    <!-- Copyrights Start -->
    <div class="container has-text-centered copyrights">
      {{ $t("help.footer.copyrights") }}
    </div>
    <!-- Copyrights End -->
  </div>
</template>

<style lang="scss" scoped>
.columns {
  width: 100%;
}
.link {
  color: #e4e8ec;
  font-size: 0.875rem;
  &:hover {
    text-decoration: underline;
  }
}

.copyrights {
  color: rgba(228, 232, 236, 0.4);
}
</style>
