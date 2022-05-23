<template>
  <div class="container">
    <div
      id="carouselExampleIndicators"
      class="carousel slide"
      data-bs-ride="carousel"
    >
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="../assets/carousel.png" class="d-block w-100" alt="..." />
          <div class="header-text hidden-xs">
            <div class="col-md-12 cccontent ccleft d-none d-lg-block">
              <h2>
                <span>Finanzamt 2.0</span>
              </h2>
              <br />
              <h3>
                <span
                  >Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit.</span
                >
              </h3>
              <br />
              <a
                href="#"
                class="btn btn-secondary btn-lg active"
                role="button"
                aria-pressed="true"
                >Starten</a
              >
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <img src="../assets/carousel.png" class="d-block w-100" alt="..." />
          <div class="col-md-12 cccontent ccright d-none d-lg-block">
            <h2>
              <span>Finanzamt 2.0</span>
            </h2>
            <br />
            <h3>
              <span
                >Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span
              >
            </h3>
            <br />
            <a
              href="#"
              class="btn btn-secondary btn-lg active"
              role="button"
              aria-pressed="true"
              >Starten</a
            >
          </div>
        </div>
      </div>
    </div>

    <div class="jumbotron text-center">
      <h1 class="display-4">Willkommen beim Finanzamt 2.0</h1>
      <p class="lead">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
        aliquam ipsam, hic reiciendis minima ut.
      </p>
      <hr class="my-4" />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea tempore
        architecto optio, veritatis cupiditate, praesentium explicabo maiores
        totam vel, dicta quam nihil nostrum illum aliquam suscipit reprehenderit
        neque placeat incidunt doloribus non rem possimus odit. Culpa ipsa
        aspernatur itaque at consequatur, fugit dolor optio corrupti eos vero
        cupiditate repudiandae quibusdam
      </p>
      <p class="lead">
        <a class="btn btn-primary btn-lg" href="#" role="button">Mehr lernen</a>
      </p>
    </div>

    <div class="accordion" id="accordionExample">
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
          <button
            class="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            Erste Schritte
          </button>
        </h2>
        <div
          id="collapseOne"
          class="accordion-collapse collapse show"
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla
              voluptates temporibus provident fugit sed fuga accusamus voluptas
              doloremque architecto sapiente. Qui, odit. Accusantium et non
              exercitationem saepe reprehenderit eius, velit soluta atque
              tempore amet quod unde quibusdam quos maiores placeat deleniti!
              Reiciendis repellat perspiciatis non error libero necessitatibus
              nulla vero!
            </p>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingTwo">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo"
          >
            Hilfe anfordern
          </button>
        </h2>
        <div
          id="collapseTwo"
          class="accordion-collapse collapse"
          aria-labelledby="headingTwo"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla
              voluptates temporibus provident fugit sed fuga accusamus voluptas
              doloremque architecto sapiente. Qui, odit. Accusantium et non
              exercitationem saepe reprehenderit eius, velit soluta atque
              tempore amet quod unde quibusdam quos maiores placeat deleniti!
              Reiciendis repellat perspiciatis non error libero necessitatibus
              nulla vero!
            </p>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingThree">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseThree"
            aria-expanded="false"
            aria-controls="collapseThree"
          >
            Vorgänge verwalten
          </button>
        </h2>
        <div
          id="collapseThree"
          class="accordion-collapse collapse"
          aria-labelledby="headingThree"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla
              voluptates temporibus provident fugit sed fuga accusamus voluptas
              doloremque architecto sapiente. Qui, odit. Accusantium et non
              exercitationem saepe reprehenderit eius, velit soluta atque
              tempore amet quod unde quibusdam quos maiores placeat deleniti!
              Reiciendis repellat perspiciatis non error libero necessitatibus
              nulla vero!
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cccontent {
  position: absolute;
  top: 0%;
  height: 100%;
  width: 40%;
  padding-top: 20%;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.449);
}
.ccleft {
  left: 0%;
}
.ccright {
  right: 0%;
}
</style>
