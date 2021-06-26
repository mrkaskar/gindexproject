<template>
      <button id="clearcache" class="navbar-item" @click="cleanCache">
        <span class="icon">
          <i class="fa fa-trash" aria-hidden="true"></i>
        </span>
        <span id="text">
        {{ $t("setting.clear.text") }}
        </span>
      </button>
</template>

<style scoped>
 #clearcache{
  background: linear-gradient(to top, #EF4358 0%, #e48f99 110%); 
   border: none;
   border-radius: 16px;
   height: 46px;
   margin-top: 4px;
   font-size: 16px;
   box-shadow: 0 4px 16px #ef43578e;
   color: white;
 }
 .icon{
   margin-right: 2px !important;
 }
@media only screen and (max-width: 1500px) {
 #text{
   display: none;
 }
}
</style>
<script>
import { mapActions } from "vuex";
import util from "@/libs/util";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions("acrou/db", ["databaseClear"]),
    cleanCache() {
      new Promise((resolve) => {
        Object.keys(localStorage).forEach((item) => {
          if (item.indexOf("file_path_") !== -1) {
            localStorage.removeItem(item);
          }
        });
        util.cookies.remove("lang");
        this.databaseClear();
        resolve();
      }).then(() => {
        this.$notify({
          title: this.$t("notify.title"),
          message: this.$t("setting.clear.success"),
          type: "success",
        });
      });
    },
  },
};
</script>
