<template>
  <div class="home">
    <v-card>
      <v-card-media
        :src="imageUrl"
        height="50px"
      >
      <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="headline">{{ center_name }}</span>
              </v-flex>
            </v-layout>
          </v-container>
      </v-card-media>
    </v-card>

    <v-layout row>
      <v-flex xs7  @click.stop="dialog = true">
        <div>
          <div class="headline">{{ item.header }}</div>
          <div>Ellie Goulding</div>
        </div>
      </v-flex>
      <v-flex xs5>
        <v-card-media
          src="/static/doc-images/cards/halcyon.png"
          height="125px"
          contain
        ></v-card-media>
        <v-list-tile-avatar>
          <img :src="item.avatar">
        </v-list-tile-avatar>
      </v-flex>

      <!-- v-dialog ******************************************************************************* -->
      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        scrollable
      >
        <v-card tile>
          <v-toolbar card dark color="primary">
            <v-btn icon dark @click.native="dialog = false">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Settings</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat @click.native="dialog = false">Save</v-btn>
            </v-toolbar-items>
            <v-menu bottom right offset-y>
              <v-btn slot="activator" dark icon>
                <v-icon>more_vert</v-icon>
              </v-btn>
              <v-list>
                <!-- <v-list-tile v-for="(item, i) in items" :key="i" @click="">
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile> -->
              </v-list>
            </v-menu>
          </v-toolbar>
          <v-card-text>
            <v-tooltip right>
              <v-btn slot="activator">Tool Tip Activator</v-btn>
              Tool Tip
            </v-tooltip>
            <v-list three-line subheader>
              <v-subheader>User Controls</v-subheader>
              <v-list-tile avatar>
                <v-list-tile-content>
                  <v-list-tile-title>Content filtering</v-list-tile-title>
                  <v-list-tile-sub-title>Set the content filtering level to restrict apps that can be downloaded</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile avatar>
                <v-list-tile-content>
                  <v-list-tile-title>Password</v-list-tile-title>
                  <v-list-tile-sub-title>Require password for purchase or use password to restrict purchase</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
            <v-divider></v-divider>
            <v-list three-line subheader>
              <v-subheader>General</v-subheader>
              <v-list-tile avatar>
                <v-list-tile-action>
                  <v-checkbox v-model="notifications"></v-checkbox>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>Notifications</v-list-tile-title>
                  <v-list-tile-sub-title>Notify me about updates to apps or games that I downloaded</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile avatar>
                <v-list-tile-action>
                  <v-checkbox v-model="sound"></v-checkbox>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>Sound</v-list-tile-title>
                  <v-list-tile-sub-title>Auto-update apps at any time. Data charges may apply</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile avatar>
                <v-list-tile-action>
                  <v-checkbox v-model="widgets"></v-checkbox>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>Auto-add widgets</v-list-tile-title>
                  <v-list-tile-sub-title>Automatically add home screen widgets</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card-text>

          <div style="flex: 1 1 auto;"></div>
        </v-card>
      </v-dialog>
      </v-layout>
      <!-- v-dialog ******************************************************************************* -->

    <dong></dong>
  </div>
</template>

<script>
// @ is an alias to /src
import dong from '@/components/dong.vue'
import gugun from '@/components/gugun.vue'
import sido from '@/components/sido.vue'
import country from '@/components/country.vue'
import world from '@/components/world.vue'

export default {

  name: 'home',

  data: () => ({
    dialog: false,
    notifications: false,
    sound: true,
    widgets: false,

    show: false,
    center_name: "신대방동정보센터",
    imageUrl: "https://mblogthumb-phinf.pstatic.net/20160119_176/wnswo2015_1453161466962bNYC0_JPEG/DSC02491.JPG?type=w2",
    item: {
            avatar: '/static/doc-images/lists/1.jpg',
            title: '동네사람들과 정보를 공유해 보세요'
          },



  }),

  components: {
    dong, gugun, sido, country, world
  }
}
</script>

<style scoped>
.headline {
  color: white;
}

</style>
