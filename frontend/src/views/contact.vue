<template>
  <div class="container">
    <div
      v-if="message"
      class="alert alert-success d-flex align-items-center"
      role="alert"
    >
      <div>
        {{ this.message }}
      </div>
    </div>
    <div
      v-if="error"
      class="alert alert-danger d-flex align-items-center"
      role="alert"
    >
      <div>
        {{ this.error }}
      </div>
    </div>
    <div class="row">
      <div class="col-sm">
        <form>
          <fieldset>
            <legend>Termin vereinbaren</legend>
            <div class="mb-3">
              <label for="TextInput" class="form-label">Name:</label>
              <input
                type="text"
                id="TextInput"
                class="form-control"
                placeholder="Max Mustermann"
              />
            </div>
            <div class="mb-3">
              <label for="Select" class="form-label">Verfügbare Termine</label>
              <select id="Select" class="form-select">
                <option>Mo 01.05 10:30</option>
                <option>Mo 01.05 11:15</option>
              </select>
            </div>
            <div class="mb-3">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="disabledFieldsetCheck"
                />
                <label class="form-check-label" for="FieldsetCheck">
                  Ich bestätige...
                </label>
              </div>
            </div>
            <button
              type="button"
              @click="requestAppointment()"
              class="btn btn-primary"
            >
              Termin vereinbaren
            </button>
          </fieldset>
        </form>
      </div>
      <div class="col-sm">
        <form>
          <fieldset>
            <legend>Kontakt aufnehmen</legend>
            <div class="mb-3">
              <label for="TextInput" class="form-label">Name:</label>
              <input
                v-model="crname"
                type="text"
                id="TextInput"
                class="form-control"
                placeholder="Max Mustermann"
              />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1">Email Addresse:</label>
              <input
                v-model="cremail"
                type="email"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="name@beispiel.de"
              />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlTextarea1">Nachricht:</label>
              <textarea
                v-model="crmessage"
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
              ></textarea>
            </div>
            <div class="mb-3">
              <div class="form-check">
                <input
                  v-model="crconsent"
                  class="form-check-input"
                  type="checkbox"
                  id="disabledFieldsetCheck"
                />
                <label class="form-check-label" for="FieldsetCheck">
                  Ich bestätige...
                </label>
              </div>
            </div>
            <button
              v-if="crconsent"
              type="button"
              @click="submitMessage()"
              class="btn btn-primary"
            >
              Nachricht absenden
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Kontakt",
  data() {
    return {
      error: null,
      message: null,
      crmessage: null,
      crname: null,
      cremail: null,
      crconsent: false
    };
  },
  created() {
    this.message = this.$route.query.message;
    this.error = this.$route.query.error;
  },
  methods: {
    requestAppointment() {
      this.error = "Sorry, geht noch nicht :(";
    },
    async submitMessage() {
      let body = {
                name: this.crname,
                email: this.cremail,
                message: this.crmessage
            };
      let data = await this.fetch_post({} , body, '/api/contactRequest/');
      if(data && !data.errors){
        this.message = "Anfrage erfolgreich gesendet";
        this.error = null;
      }else{
        this.message = null;
        this.error = "Da ist etwas schiefgelaufen";
      }
    },
  },
};
</script>
