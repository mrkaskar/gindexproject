<template>
  <nav class="mynavbar" role="navigation" aria-label="main navigation">
    <div class="mycontainer">
      <div class="navbar-brand">
        <a class="navbar-item" :href="currgd.id">
          <h3 class="title is-3 has-text-white">{{ siteName }}</h3>
        </a>
      </div>
      <div
        :class="'navbar-menu is-active'"
      >
        <div class="navbar-start">
          <div
            class="navbar-item has-dropdown is-hoverable"
            v-if="gds.length > 0 && getCurrGD.length > 0"
          >
            <!-- <a class="navbar-link">{{ this.currgd.name }}</a> -->
            <!-- <div class="navbar-dropdown is-boxed">
              <a
                class="navbar-item"
                @click="changeItem(item)"
                v-for="(item, index) in getCurrGD"
                v-bind:key="index"
                >{{ item.name }}</a
              >
            </div> -->
          </div>
        </div>
  <vue-fab mainBtnColor="#301F4E" icon="reorder"
  :scrollAutoHide=false
  size="big"
  :globalOptions="{spacing: 45}"
  >
  <fab-item
    v-for="(item, index) in getCurrGD"
    v-bind:key="index"
    :title="item.name"
    :idx="index"
    icon="dns"
    @clickItem="changeItem(item)"
    :style="{
      backgroundColor: item.name === currgd.name ? 'greenyellow': 'white',
      }"
    />
</vue-fab>

        <div class="navbar-end">
          <!-- is-hidden-desktop -->
          <div class="navbar-item" v-show="showSearch">
            <div class="field is-grouped">
              <p class="control has-icons-left" style="width:100%;">
                <input
                  class="input search-input"
                  @keyup.enter="query"
                  v-model="param"
                  type="search"
                  placeholder="Search Precious Things"
                />
                <span class="icon is-small is-left" style="padding-left: 10px">
                <span id="search" class="material-icons">search</span>
                </span>
              </p>
            </div>
          </div>
          <div id="settings">
          <header-setting />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<style scoped>
.navbar-menu{
  position: relative;
  background-color: rgba(255, 255, 255, 0);
  box-shadow: none;
}
@media only screen and (max-width: 1500px) {
  .navbar-brand {
    display: none;
  }
  .navbar-start{
    display: none;
  }
  .navbar-end{
    display: flex;
  }
  .navbar-item{
    flex: 2;
  }
  .navbar-menu{
    display: none;
  }
  .mynavbar{
    height: 85px;
    width: 100% !important;
    padding-right: 16px;
    position: fixed;
  }
  .mycontainer{
    width: 100%;
  }
}
#search{
  color: white;
}
.mycontainer{
  width: 100%;
  padding: 0;
  margin: 0;
  padding-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.input {
  background-color: #3d2d586c;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.596);
  width: 300px;
}
input:active{
  border:0.5px solid #EF4358;
  outline: none !important;
}
input:focus{
  border:0.5px solid #EF4358;
    outline: 0 none !important;
  box-shadow: none;
}

.mynavbar{
  background: linear-gradient(to top, #94f0e815 0%, #94f0e81e 110%) !important;
 width: 70%;
 margin: 0 auto;
 margin-top: 10px;
 border-radius: 15px;
 padding: 5px;
 

}
.navbar-end{
 width: 100%;
}
</style>

<script>
// import headerLocales from "@/layout/header-aside/components/header-locales";
import headerSetting from "@/layout/header-aside/components/header-setting";
// import ViewMode from "@/layout/viewmode";

export default {
  components: {
    // headerLocales,
    headerSetting,
    // ViewMode,
  },
  created() {
    this.siteName = document.getElementsByTagName("title")[0].innerText;
    if (window.gds && window.gds.length > 0) {
      this.gds = window.gds.map((item, index) => {
        return {
          name: item,
          id: "/" + index + ":/",
        };
      });
      this.chooseGD();
    }
    if (window.MODEL) {
      this.param = window.MODEL.q ? window.MODEL.q : "";
    }
  },
  data: function() {
    return {
      siteName: "Precious Things",
      param: "",
      currgd: {},
      gds: [],
      isActive: false,
      
    };
  },
  methods: {
    chooseGD() {
      let index = this.$route.params.id;
      if (this.gds && this.gds.length >= index) {
        this.currgd = this.gds[index];
      }
    },
    changeItem(item) {
      this.currgd = item;
      this.$router.push({
        path: item.id,
      });
    },
    query() {
      if (this.param) {
        this.$router.push({
          path: this.currgd.id.match("/[0-9]+:") + "search?q=" + this.param,
        });
      }
    },
    burgerClick() {
      this.isActive = !this.isActive;
    },
  },
  computed: {
    getCurrGD() {
      return this.gds;
      //return this.gds.filter((item) => item.name !== this.currgd.name);
    },
    showSearch() {
      // 文件夹不支持搜索
      return window.MODEL ? window.MODEL.root_type < 2 : true
    },
  },
  watch: {
    "$route.params.id": "chooseGD",
  },
};
</script>
