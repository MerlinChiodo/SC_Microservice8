<template>
  <div class="container">
    <ul class="progressbar">
        <li class="active">Steuerjahr</li>
        <li :class="{active: state>0}">Vorgangstyp</li>
        <li :class="{active: state>1}">Bestätigen</li>
        <li :class="{active: state>2}">Daten Einreichen</li>
    </ul>
    <br>
    <div id="stateSwitcher">
        <div class="state" v-if="state == 0">
            <h4>Steuerjahr:</h4>
            <select class="form-select" name="year" id="year" v-model="year">
                <option value="0">{{ currentYear }}</option>
                <option value="1">{{ currentYear - 1 }}</option>
                <option value="2">{{ currentYear - 2 }}</option>
            </select>
            <br>
            <br>
        </div>
        <div class="state" v-else-if="state == 1">
            <h4>Vorgangstyp:</h4>
            <select class="form-select" name="type" id="type" v-model="processType" v-if="processTypes">
                <option :value="item.id" v-for="item in processTypes" :key='item.id'  >
                 {{ item.name }}
                </option>
            </select>
            <br>
            <br>
        </div>
        <div class="state" v-else-if="state == 2">
            <h4>Bestätigung:</h4>
            <p>Wollen Sie folgenden Vorgang erstellen?</p>
            {{ processTypes.find(element => element.id == processType).name }}
            {{ currentYear - year }}
            <br>
            {{ processTypes.find(element => element.id == processType).description }}
            <br>
            <br>
        </div>
        <div class="state" v-else>
            <br><br>
            <p class="text-center">Der Vorgang wurde erfolgreich erstellt</p>
            <br><br>
            <div class="d-flex justify-content-center btn-group-vertical">
                <button type="button" class="btn btn-primary btn-lg btn-block" @click="$router.push('/Konto/Vorgaenge')">Zu meinen Vorgängen</button>
                <button type="button" class="btn btn-secondary btn-lg btn-block">Vorgang ansehen</button>
            </div>
            <br>
        </div>
        <div class="d-flex justify-content-between" v-if="state<3">
            <div><button type="button" class="btn btn-dark" :class="{disabled: state==0}" @click="state-=1">Zurück</button></div>
            <div v-if="state!=2"><button type="button" class="btn btn-dark" @click="state+=1">Weiter</button></div>
            <div v-else><button type="button" class="btn btn-dark" @click="createProcess">Vorgang erstellen</button></div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Vorgänge",
  data() {
    return {
      currentYear: new Date().getFullYear(),
      year: 0,
      state: 0,
      processType: 1,
      processTypes: null,
    };
  },
  mounted: function () {
    this.getProcessTypes();
  },
  methods: {
    async getProcessTypes() {
      const options = {
        method: "GET"
      };
      await fetch("/api/processTypes/" , options)
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            this.processTypes = data.result;
          } else {
            throw new Error(data.error);
          }
        }).catch((error) => {
          this.$notify({group: "error",title: "Fehler!",text: "Da ist etwas schiefgelaufen",error:error},2000);
          this.$router.push("/");
        });
    },
    async createProcess(){
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": "1234"
            },
            body: JSON.stringify({
                year: this.year,
                type: this.processType
            })
        };
        await fetch("/api/process/", options)
            .then((response) => {
            if (response.status == 201) {
                this.$notify({group: "success",title: "Erfolg!",text: "Vorgang erfolgreich erstellt",},2000);
                this.state = 3;
            } else {
                throw new Error("Something went wrong");
            }
            })
            .catch((error) => {
                this.$notify({group: "error",title: "Fehler!",text: "Da ist etwas schiefgelaufen",error: error,},2000);
            });
    }
  },
};
</script>

<style>
/* http://kodhus.com/newsite/step-progress-bar-css-only/ */
.progressbar {
  counter-reset: step;
}
.progressbar li {
  list-style-type: none;
  width: 25%;
  float: left;
  font-size: 12px;
  position: relative;
  text-align: center;
  text-transform: uppercase;
  color: #7d7d7d;
}
.progressbar li:before {
  width: 30px;
  height: 30px;
  content: counter(step);
  counter-increment: step;
  line-height: 30px;
  border: 2px solid #7d7d7d;
  display: block;
  text-align: center;
  margin: 0 auto 10px auto;
  border-radius: 50%;
  background-color: white;
}
.progressbar li:after {
  width: 100%;
  height: 2px;
  content: "";
  position: absolute;
  background-color: #7d7d7d;
  top: 15px;
  left: -50%;
  z-index: -1;
}
.progressbar li:first-child:after {
  content: none;
}
.progressbar li.active {
  color: rgba(2, 0, 36, 1);
}
.progressbar li.active:before {
  border-color: rgba(2, 0, 36, 1);
}
.progressbar li.active + li:after {
  background-color: #000000;
}
</style>