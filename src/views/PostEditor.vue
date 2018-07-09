<template>
  <div>

    <h1>This is Post Editor</h1>



    <!-- create Post v-dialog ******************************************************************************* -->

      <!-- slide-x-transition -->
        <v-card tile>
          <v-toolbar card dark color="primary">
            <v-btn icon dark >
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Post</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat @click="submitPost">Save</v-btn>
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


          <div>
            <v-list three-line subheader>
              <v-subheader>Create Post</v-subheader>
            </v-list>
            <v-divider></v-divider>
            <v-list three-line subheader>
              <v-subheader>Write</v-subheader>

              <v-list-tile avatar>

                  <span>Content:</span>
                  <br>
                    <textarea class="p_textarea" v-model="content" placeholder="add multiple lines"></textarea>
                    <p >
                      {{ result }}
                    </p>

              </v-list-tile>

            </v-list>
          </div>






          <div style="flex: 1 1 auto;"></div>
        </v-card>

      <!-- create Post v-dialog ******************************************************************************* -->

  </div>


</template>

<script>
</script>

<style>
</style>
