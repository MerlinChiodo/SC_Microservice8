<template>
    <div class="container d-flex justify-content-center">
            <div class="col-sm w-50">
            <form>
                    <fieldset>
                        <legend>Dokumente einrechen</legend>
                        <div class="mb-2">
                            <label for="TextInput" class="form-label">Name:</label>
                            <input type="text" id="TextInput" class="form-control" placeholder="Max Mustermann">
                        </div>
                        <div class="mb-2">
                            <label for="TextInput" class="form-label">Vorgang-ID:</label>
                            <input type="text" id="TextInput" class="form-control" placeholder="#2039840">
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1">Email Addresse:</label>
                            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@beispiel.de">
                        </div>
                        <div class="mb-3">
                            <label for="inputGroupFile01">Dokument</label>
                            <input type="file" class="form-control" id="inputGroupFile01">
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlTextarea1">Nachricht (optional):</label>
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
                <br>
                <div class="alert alert-info" role="alert">
                    Angemeldete Nutzer können .... <br>
                    hier anmelden ... <br>
                    hier registrieren
                </div>
            </div>
    </div>
</template>

<script>
export default {
  name: 'Einreichen',
  data() {
    return {
        
      }
    }
  ,
  components: {
  }
      
}
</script>
