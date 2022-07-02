<template>
  <div class="d-flex flex-column min-vh-100">
    <!-- Navbar -->
    <nav
      class="navbar navbar-expand-lg navbar-light bg-light"
      style="background: linear-gradient(180deg, rgba(2, 0, 36, 1) 10%,rgba(9, 9, 121, 1) 10%,rgba(255, 255, 255, 1) 10% );"
    >
      <div class="container-fluid">
        <a class="navbar-brand">Finanzamt</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/" class="nav-link"> Home </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/Termine" class="nav-link">
                Termine - Fristen
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/Formulare" class="nav-link">
                Formulare
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/Aktuelles" class="nav-link">
                Aktuelles
              </router-link>
            </li>
            <li class="nav-item dropdown" v-if="this.$cookies.isKey('user_session_token') && !this.$cookies.isKey('fm_token')">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Konto
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li class="nav-item">
                  <router-link to="/Konto/Vorgaenge" class="nav-link">
                    Vorgänge
                  </router-link>
                  <router-link to="/Spenden" class="nav-link">
                    Spenden
                  </router-link>
                </li>
              </ul>
            </li>
            <li class="nav-item dropdown" v-if="this.$cookies.isKey('fm_token')">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Intern
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li class="nav-item">
                  <router-link to="/Intern/Landingpage" class="nav-link">
                    Landingpage
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/Intern/events" class="nav-link">
                    Events
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/Spenden" class="nav-link">
                    Spenden
                  </router-link>
                </li>
              </ul>
            </li>
          </ul>
          <form class="d-flex" v-if="!this.$cookies.isKey('user_session_token') && !this.$cookies.isKey('fm_token')">
            <button class="btn btn-outline-success" type="button" @click="this.login()">Login</button>
          </form>
          <form class="d-flex" v-else>
            <button class="btn btn-outline-danger" type="button" @click="this.logout()">Logout</button>
          </form>
        </div>
      </div>
    </nav>
    <!-- End Navbar -->

    <div class="container">
      <router-view />
    </div>

    <!-- notifications -->
    <notificationGroup group="error">
      <div class="notification-container">
          <notification v-slot="{notifications}" :maxNotifications="1">
            <div class="rounded-top mt-5" style="max-height: 90px;" v-for="notification in notifications" :key="notification.id">
              <div class="rounded-top bg-danger d-flex justify-content-center">
                <img width="30" height="30" class="mt-2 mb-2" src="data:image/png;base64,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"/>
              </div>
              <div class="border border-danger d-flex justify-content-center bg-white">
                <div class="mx-3">
                  <h4>{{notification.title}}</h4>
                  <p class="text-gray text-sm">{{notification.text}}</p>
                </div>
              </div>
            </div>
          </notification>
      </div>
    </notificationGroup>
    <notificationGroup group="success">
      <div class="notification-container d-flex align-items-center justify-content-center">
        <notification v-slot="{notifications}" :maxNotifications="1">
          <div class="rounded-top mt-5" style="max-height: 90px;" v-for="notification in notifications" :key="notification.id">
            <div class="rounded-top bg-success d-flex justify-content-center">
              <img width="30" height="30" class="mt-2 mb-2" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAABKVJREFUWEe9mVnIVVUUx39/CJohe4sioigqGvAhsoImMssGNGnS5gzLJIssCwQricyKQsostGyyzywaDC2KJsiGhwYfTOglouGlCRoMiv6xPvb52B7PvXefe7/PDQfu3WettX93D2uvta7os9neGTgLOAbYK3v+A34GfgK+BT4EPpf0bz9Dqa2S7enAROBCYNdC/d8S6BAw1Aa2GND2xcAc4PgOUFuBr4GdgMO7gG8B1ki6o+TH9QS0HUALgDNrBjcBbwAbAkzS99V727sARwJHpCc+x6zn7SPgHEmxHTq2roC2LwMeAfbILKwClkv6pGQGMujYEjc0rMB4SV90stUR0PY84L5McR2wVNLbbcDqsravT6CHpHdrJV3QCtD2DODZTKmrkbbAtscBc4GTgDslvVcMaPtE4P1MYaWkmW0hRkt+myW2fTTwDrB3GiB+XdFpGxTI9iTgIGC9pG8qe3XA9dlpXSJp/qADl+jbPh94IcmuknTldoDJz61OL9ZJOrfE+KAyNbgwd5Okh5oA40qqnPDEQU9rCXgD3EJJd+W6w0ts+1Lg6aYpLhmoH5kGuAWS7q7bqgBj/WMfRDtO0sf9DFqq0wB3u6TFTfpK19KvQFxPWyQdVjpQP3INcPMlLals2Y57PCZsczjwALwIeD4JLJMUnn5MWgPcPEkP5IPZvhm4P/VNDcB7gNtSxyndvPog1L1OazaDcf8/lb7PDsBHgWtTx355VNIJyPY+kn4sBW6AmytpaZO+7fHAZ+ndogCM5Y1l3ippt16D2v40RdFTJL1aIJ874RCfIykipMZmO+LJf9LLFQEY8dwZwCZJcdV1bLb3TGF8hPh/Amd32xINMzdbUqxY12Z7MxCH9fVWgGG15jN/ACZL+rI+YgPcLEmP94JLY4S9oyIgbr3EycCNwINpsK9iBSRFgjTcGuBmSlpZApf0/0r5zlBfhyQZWZRSgfgajv10Sb83wF0l6ckWcPsC3yX55QO5GdvLgOuSschPnsiikui+XFJ1hRYx2j4ZeDcJLw7A84CXUkfrEMv2i8C0htEvkfRcEVUmZPte4NbUNS0AIwGPqy5y3J4nueEw7B5BJhCReNWmS6pup1aMtqsDEmnsuCpYiD1yRbI0oY+MbX8gfOKBwDWSquCzLdyxaT+H3nDgWgFGtaBajm0i2tIRbIdvPKBbCtnLlu18omZIWj0S8tve4QFrDmz7NOCt1LdR0gnxOQeM0sYOD/krSNuvRaUhfR/Zw92SplHNhbstr+08YN4gaXIlXweMnOTNrNQx5jmx7RXA1QnoD2CSpI2NgNGZ6jFVPBZdY5Yb246ce2E2u9s59sbaTENdprUDLzixuUMO8VskVZH0iHq34lG9PjNaxaM4rVHlqg5EwHS8dXqV3+J2eDkrhQw7UOCxtpmf7QnArOxCCFu/AFMlfdBpxksKmBHERt5SL2BGpTTqOGvrBcy0lyMqOTils6cCh9YgIlCOdHO7WDKX6wmY+anSEnCoBFin+nWc0IdL7+piwAw0qhCxf+KJXLqk/Q3EHo6azzMlCh3dTKlySvinALEF8r8hwkRU9asnlvAVSQHZuv0P/9fydYLPTXIAAAAASUVORK5CYII="/>
            </div>
            <div class="border border-success d-flex justify-content-center bg-white">
              <div class="mx-3">
                <h4>{{notification.title}}</h4>
                <p class="text-gray text-sm">{{notification.text}}</p>
              </div>
            </div>
          </div>
        </notification>
      </div>
    </notificationGroup>

    <!-- Footer -->
    <footer
      class="mt-auto page-footer font-small purple pt-4"
      style="background: linear-gradient(330deg,rgba(2, 0, 36, 1) 0%,rgba(2, 0, 36, 1) 23%,rgba(255, 255, 255, 1) 23%);"
    >
      <!-- Footer Links -->
      <div class="container-fluid text-center text-md-left">
        <!-- Footer row 1-->
        <div class="row">
          <!-- Footer Column 1 -->
          <div class="col-md-6 mt-md-0 mt-3">
            <ul class="list-unstyled">
              <li>Öffnungszeiten</li>
              <li>Mo-Fr: 10:00-13:00</li>
              <li>Sa: 12:00-14:00</li>
              <br />
              <li>Anfahrt:</li>
              <li>Musterstr. 361</li>
              <li>50187 Mohnheim</li>
            </ul>
          </div>

          <hr class="clearfix w-100 d-md-none pb-3" />

          <!-- Footer Column 2 -->
          <div class="col-md-3 mb-md-0 mb-3"></div>

          <!-- Footer Column 3 -->
          <div class="col-md-3 mb-md-0 mb-3">
            <router-link to="/Kontakt" class="nav-link"> Kontakt </router-link>
            <router-link to="/Upload" class="nav-link"> Dateien einreichen </router-link>
            <router-link to="/intern/overview" class="nav-link"> Mitarbeiterbereich </router-link>
          </div>
        </div>
        <!-- End Footer row 1 -->
      </div>
      <!-- End Footer Links -->
      <!-- Copyright -->
      <div class="footer-copyright text-center py-3">
        © 2022 Copyright:
        <a href="http://supersmartcity.de">supersmartcity.de</a>
      </div>
      <!-- Copyright -->
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  methods: {
      logout(){
        this.$cookies.remove('user_session_token');
        this.$cookies.remove('fm_token');
        this.$forceUpdate();
      },
      login(){
        this.initLogin();
      }
  }
};
</script>
