<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <button
          class="btn btn-outline-success btn-sm"
          @click="$router.push({name : 'ListEntreprises'})"
        >retour</button>
      </div>
      <div class="col text-center">
        <h2>Ajouter une entreprise</h2>
      </div>
      <div class="col"></div>
    </div>
    <form @submit.prevent="newEntreprise()">
      <div class="row">
        <div class="col text-right">
          <label>Raison Social :</label>
        </div>
        <div class="col">
          <input type="text" v-model="raison_social" />
        </div>
      </div>
      <div class="row">
        <div class="col text-right">
          <label>Adresse</label>
        </div>
        <div class="col">
          <input type="text" v-model="adresse" />
        </div>
      </div>
      <div class="row">
        <div class="col text-right">
          <label>Code Postal :</label>
        </div>
        <div class="col">
          <input type="text" v-model="code_postal" />
        </div>
      </div>
      <div class="row">
        <div class="col text-right">
          <label>Ville</label>
        </div>
        <div class="col">
          <input type="text" v-model="ville" />
        </div>
      </div>
      <div class="row">
        <div class="col text-right">
          <label>Type d'entreprise :</label>
        </div>
        <div class="col">
          <input type="text" v-model="type" />
        </div>
      </div>
      <div class="row">
        <div class="col text-right">
          <label>Email :</label>
        </div>
        <div class="col">
          <input type="text" v-model="email" />
        </div>
      </div>
      <div class="row">
        <div class="col text-right">
          <label>Téléphone :</label>
        </div>
        <div class="col">
          <input type="text" v-model="tel" />
        </div>
      </div>
      <div class="row">
        <div class="col text-right">
          <label>Status :</label>
        </div>
        <div class="col">
          <input v-model="statut" type="radio" id="prospection" value="prospection" />
          <label for="prospection">prospection</label>
          <br />
          <input v-model="statut" type="radio" id="Premier_Contact" value="Premier Contact" />
          <label for="Premier_Contact">Premier Contact</label>
          <br />
          <input
            v-model="statut"
            type="radio"
            id="Proposition_Commerciale"
            value="Proposition Commerciale"
          />
          <label for="Proposition_Commerciale">Proposition Commerciale</label>
          <br />
          <input v-model="statut" type="radio" id="Signature" value="Signature" />
          <label for="Signature">Signature</label>
        </div>
      </div>
      <div class="row">
        <div class="col text-right">
          <label>Plus d'info :</label>
        </div>
        <div class="col">
          <input type="text" v-model="description" />
        </div>
      </div>
      <div class="row"></div>
      <div class="row">
        <div class="col text-center">
          <input type="submit" />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "AddEntreprise",
  data() {
    return {
      raison_social: null,
      adresse: null,
      code_postal: null,
      ville: null,
      type: null,
      email: null,
      tel: null,
      statut: null,
      description: null,
      apiURL: "http://localhost:3000/v1",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
  },
  methods: {
    // Ajoute une entreprise au tableau entreprises
    async newEntreprise() {
      const response = await fetch(`${this.apiURL}/entreprises`, {
        body: JSON.stringify({
          raison_social: this.raison_social,
          adresse: this.adresse,
          code_postal: this.code_postal,
          ville: this.ville,
          type: this.type,
          email: this.email,
          tel: this.tel,
          description: this.description,
          statut: this.statut
        }),
        headers: this.headers,
        method: "POST"
      });
      this.$router.push({ name: "ListEntreprises" });
    }
  }
};
</script>
