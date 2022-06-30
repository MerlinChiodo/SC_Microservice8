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
          <img src="http://vps2290194.fastwebserver.de:9780/api/files/ba7ed1f8-9a90-44c5-bd4c-2ac26030ad37.jpg?token=1234" class="d-block w-100" alt="office" />
          <div class="header-text hidden-xs">
            <div class="col-md-12 cccontent ccleft d-none d-lg-block">
              <h2>
                <span>Finanzamt 2.0</span>
              </h2>
              <br />
              <h3>
                <span>
                  Sehen Sie sich alle laufenden Vorgänge an, ganz ohne Papier!
                </span>
              </h3>
              <br />
              <a
                href="Konto/Vorgaenge"
                class="btn btn-secondary btn-lg active"
                role="button"
                aria-pressed="true"
                >Meine Vorgänge</a
              >
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <img src="http://supersmartcity.de:9780/api/files/f38de1b5-e8d0-4b86-9099-4a62e826016f.jpg?token=1234" class="d-block w-100" alt="gebäude finanzamt münster" />
          <div class="col-md-12 cccontent ccright d-none d-lg-block">
            <h2>
              <span>Finanzamt 2.0</span>
            </h2>
            <br />
            <h3>
              <span
                >Sehen Sie sich anstehende Termine und Fristen an</span
              >
            </h3>
            <br />
            <a
              href="Termine"
              class="btn btn-secondary btn-lg active"
              role="button"
              aria-pressed="true"
              >Zu den Terminen</a
            >
          </div>
        </div>
      </div>
    </div>

    <div class="jumbotron text-center">
      <h1 class="display-4">Willkommen bei ihrem Finanzamt</h1>
      <p class="lead">
        Ihr Finanzamt ist jetzt komplett digital zu erreichen.
        <br>
        Starten Sie neue Vorgänge, reichen Dateien ein und warten auf Bearbeitung durch unsere Sachbearbeiter.
        <br>
        Wir sind für Sie da, ob digital oder vor Ort.
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
              Sie haben noch keine Login-Daten für die Smart City Münster?
              <br>
              Kein Problem!
              <br>
              Sie können problemlos über das Formular "Dateien Einreichen" angefragte Informationen nachreichen
              <br>
              Ansonsten erreichen Sie ihr Bürgerbüro <a href="http://www.supersmartcity.de:9710/">hier</a>
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
              Sollten Sie trotz der intuitiven Benutzeroberfläche und den bereitgestellten Informationen noch Fragen haben, erreichen Sie uns <a href="Kontakt">hier</a>
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
