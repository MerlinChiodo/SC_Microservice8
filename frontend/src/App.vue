<template>
  <div class="d-flex flex-column min-vh-100">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light" style="background: linear-gradient(180deg, rgba(2,0,36,1) 10%, rgba(9,9,121,1) 10%, rgba(255,255,255,1) 10%);">
      <div class="container-fluid">
        <a class="navbar-brand">Finanzamt</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/" class="nav-link">
                Home
              </router-link>
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
          </ul>
          <form class="d-flex">
            <button class="btn btn-outline-success" type="submit">Login</button>
          </form>
        </div>
      </div>
    </nav>
    <!-- End Navbar -->

    <div class="container">
      <router-view />
    </div>

    <!-- Footer -->
    <footer class=" mt-auto page-footer font-small purple pt-4" style="background: linear-gradient(330deg, rgba(2,0,36,1) 0%, rgba(2,0,36,1) 23%, rgba(255,255,255,1) 23%);">

      <!-- Footer Links -->
      <div class="container-fluid text-center text-md-left">
  
        <!-- Footer row 1-->
        <div class="row">
  
          <!-- Footer Column 1 -->
          <div class="col-md-6 mt-md-0 mt-3">
            <ul class="list-unstyled">
              <li>
                Öffnungszeiten
              </li>
              <li>
                Mo-Fr: 10:00-13:00 
              </li>
              <li>
                Sa: 12:00-14:00
              </li>
              <br>
              <li>
                Anfahrt:
              </li>
              <li>
                Musterstr. 361
              </li>
              <li>
                50187 Mohnheim
              </li>
            </ul>
  
          </div>
  
          <hr class="clearfix w-100 d-md-none pb-3">
  
          <!-- Footer Column 2 -->
          <div class="col-md-3 mb-md-0 mb-3">
          </div>
  
          <!-- Footer Column 3 -->
          <div class="col-md-3 mb-md-0 mb-3">
            <router-link to="/Kontakt" class="nav-link">
              Kontakt
            </router-link>
          </div> 
        </div>
        <!-- End Footer row 1 -->
      </div>
      <!-- End Footer Links -->
      <!-- Copyright -->
      <div class="footer-copyright text-center py-3">© 2022 Copyright:
        <a href="https://smartcity.com"> smartcity.com</a>
      </div>
      <!-- Copyright -->
  
    </footer>
    
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  }
}
</script>
