<template>
  <div>
    <button @click="$router.push({name : 'DetailEntreprise', params: {id:`${id}`} })">retour</button>
    <h2>Ajouter un contact a l'entreprise id : {{id}}</h2>
    <form @submit.prevent="newContact(id)">
      <div class="form-group">
        <label>Nom du contact :</label>
        <input type="text" v-model="nom" />
      </div>
      <div>
        <label>Prénom du contact</label>
        <input type="text" v-model="prenom" />
      </div>
      <div>
        <label>Email :</label>
        <input type="text" v-model="email" />
      </div>
      <div>
        <label>Téléphone :</label>
        <input type="text" v-model="tel" />
      </div>
      <div>
        <label>Fonction :</label>
        <input type="text" v-model="fonction" />
      </div>
      <div></div>
      <input type="submit" />
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
