<template>
    <div class="container">
        <div class="row">
            <div class="col-sm">
                <form>
                    <fieldset>
                        <legend>Termin vereinbaren</legend>
                        <div class="mb-3">
                        <label for="TextInput" class="form-label">Name:</label>
                        <input type="text" id="TextInput" class="form-control" placeholder="Max Mustermann">
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
                            <input class="form-check-input" type="checkbox" id="disabledFieldsetCheck">
                            <label class="form-check-label" for="FieldsetCheck">
                            Ich bestätige...
                            </label>
                        </div>
                        </div>
                        <button type="submit" class="btn btn-primary">Termin vereinbaren</button>
                    </fieldset>
                </form>
            </div>
            <div class="col-sm">
            <form>
                    <fieldset>
                        <legend>Kontakt aufnehmen</legend>
                        <div class="mb-3">
                        <label for="TextInput" class="form-label">Name:</label>
                        <input type="text" id="TextInput" class="form-control" placeholder="Max Mustermann">
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1">Email Addresse:</label>
                            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@beispiel.de">
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlTextarea1">Nachricht:</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                        <div class="mb-3">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="disabledFieldsetCheck">
                            <label class="form-check-label" for="FieldsetCheck">
                            Ich bestätige...
                            </label>
                        </div>
                        </div>
                        <button type="submit" class="btn btn-primary">Nachricht absenden</button>
                    </fieldset>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Kontakt',
  data() {
    return {
        
      }
    }
  ,
  components: {
  }
      
}
</script>
