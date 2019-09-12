<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <button
          class="btn btn-outline-success btn-sm"
          @click="$router.push({name : 'DetailEntreprise', params: {id:`${id}`} })"
        >retour</button>
      </div>
      <div class="col">
        <h2>Ajouter un contact</h2>
      </div>
      <div class="col"></div>
    </div>
    <form @submit.prevent="newContact(id)">
      <div class="row">
        <div class="col text-right">
          <label>Nom du contact :</label>
        </div>
        <div class="col">
          <input type="text" v-model="nom" />
        </div>
      </div>
      <div class="row">
        <div class="col text-right">
          <label>Prénom du contact :</label>
        </div>
        <div class="col">
          <input type="text" v-model="prenom" />
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
          <label>Fonction :</label>
        </div>
        <div class="col">
          <input type="text" v-model="fonction" />
        </div>
      </div>
      <div class="row">
        <div></div>
      </div>
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
  name: "AddContact",
  props: {
    id: String
  },
  data() {
    return {
      nom: null,
      prenom: null,
      email: null,
      tel: null,
      fonction: null,
      id_entreprise: null,
      apiURL: "http://localhost:3000/v1",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
  },
  methods: {
    // Ajoute une entreprise au tableau entreprises
    async newContact(id) {
      console.log(this.id);
      const response = await fetch(`${this.apiURL}/contacts`, {
        body: JSON.stringify({
          nom: this.nom,
          prenom: this.prenom,
          email: this.email,
          tel: this.tel,
          fonction: this.fonction,
          id_entreprise: this.id
        }),

        headers: this.headers,
        method: "POST"
      });
      this.$router.push({
        name: "DetailEntreprise",
        params: { id: `${this.id}` }
      });
    }
  }
};
</script>
