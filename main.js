
window.Event = new Vue();
Vue.component('tabs', {
  props: ['title', 'body'],
  template: `<div>
              <div class="tabs">
                <ul>
                  <li v-for="tab in tabs" :class="{'is-active':tab.isActive }">
                    <a :href="tab.href" @click="selected(tab)">{{tab.name}}</a>
                  </li>
                </ul>
              </div>
              <div>
                <slot></slot>
              </div>
            </div>`,

  mounted() {
    // console.log(this.$children)
  },

  created() {
    this.tabs = this.$children
  },

  data() {
    return {
      tabs: []
    }
  },
  methods: {
    selected(selectedTab) {
      this.tabs.forEach((tab) => {
        if (tab.name === selectedTab.name){
          tab.isActive = true;
        } else {
          tab.isActive = false;
        }
      });
    }
  },
  

});

Vue.component('tab', {
  props: {
    name: { required: true},
    selected: {default: false}

  },
 template: `<div v-show="isActive">
              <p @click="callMe">uygfd</p>
              <slot></slot>         
            </div>`,
  data() {
    return {
      isActive: false,
    }
  },
  methods: {
    callMe() {
      Event.$emit('me');
    }
  },
  computed: {
    href() {
      return '#' + this.name.toLowerCase().replace(/ /g, '-')
    }
  },
  mounted() {
    this.isActive = this.selected;
  }
});

new Vue({
  el: '#root',
  data: {
    isVisible: false
  },
  created() {
    Event.$on('me', () =>
      alert('listening')
    )
  }
});