<template>
  <div>
    <button @click="$router.push({name : 'DetailEntreprise', params: {id:`${id}`} })">retour</button>
    <h2>Modifier un contact</h2>
    <form @submit.prevent="updateContact(id_contact)">
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
  name: "UpdateContact",
  props: {
    id: String,
    id_contact: String
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
  created() {
    this.findOneContact(this.id_contact);
  },
  watch: {
    $route() {
      this.findOneContact(this.id_contact);
    }
  },
  methods: {
    async findOneContact(id_contact) {
      const response = await fetch(`${this.apiURL}/contacts/${id_contact}`);
      const result = await response.json();
      (this.nom = result.nom),
        (this.prenom = result.prenom),
        (this.email = result.email),
        (this.tel = result.tel),
        (this.fonction = result.fonction),
        (this.id_entreprise = result.id_entreprise);
    },
    updateContact: async function(id_contact, id) {
      console.log(this.id);
      console.log(this.id_contact);
      let responses = await fetch(
        `${this.apiURL}/contacts/${this.id_contact}`,
        {
          headers: this.headers,
          method: "PUT",
          body: JSON.stringify({
            nom: this.nom,
            prenom: this.prenom,
            email: this.email,
            tel: this.tel,
            fonction: this.fonction,
            id_entreprise: this.id_entreprise
          })
        }
      );
      this.$router.push({
        name: "DetailEntreprise",
        params: { id: `${this.id}` }
      });
    }
  }
};
</script>
