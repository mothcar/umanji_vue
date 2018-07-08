<template>
  <div>
    <div>
      <v-carousel hide-delimiters>
        <v-carousel-item
          v-for="(item,i) in items"
          :key="i"
          :src="item.src"
          >
          <div class="p_portal_container">
            <h1>{{ title }} {{ $t("portal_page.title") }}</h1>
          </div>

        </v-carousel-item>
      </v-carousel>
    </div>
    <div>
      <!-- before was fixed-tabs -->
      <v-tabs
        slot="extension"
        v-model="model"
        centered
        color="blue"
        slider-color="red"
        fixed-tabs
      >
        <v-tab
          v-for="name in item_name"
          :key="name"
          :href="`#tab-${name}`"
        >
           {{ name }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="model">
        <v-tab-item
          v-for="(name, index) in item_name"
          :id="`tab-${name}`"
          :key="name"
        >
          <v-card flat>
            <v-card-text v-text="text"></v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>

    </div>

  </div>


</template>

<script>
export default {
    props: {

    }
    ,

    data () {
      return {
        title: this.$route.params.id,
        item_name: ['Post', 'Person', 'Some'],
        model: 'tab-2',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        items: [
          {
            src: require('../assets/images/default_info_center.jpg')
          },
          {
            src: require('../assets/images/default_info_center2.jpg')
          },
          {
            src: require('../assets/images/default_info_center3.jpg')
          },
          {
            src: require('../assets/images/default_info_center4.jpg')
          }
        ]
      } // return
    }, // data

    watch: {
      model: function(some) {
        switch(some){
          case 'tab-1':
          this.item_name = ''
          break;
        }
        console.log("watch - model changes and key", some +" "+this.model)
      }
    },

    created: function () {
      console.log('PortalPage - params : ', this.$route.params.id)
    } // created
  } // export

</script>

<style>
.p_portal_container {
  vertical-align: center;
  margin-top: 20%;
  text-align: center;
  color: white;
  text-shadow: 0 0 3px #111111;
}
</style>
