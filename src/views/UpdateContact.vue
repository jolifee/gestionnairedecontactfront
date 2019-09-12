<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <button @click="$router.push({name : 'DetailEntreprise', params: {id:`${id}`} })">retour</button>
      </div>
      <div class="col text-center">
        <h2>Modifier un contact</h2>
      </div>
      <div class="col"></div>
    </div>
    <form @submit.prevent="updateContact(id_contact)">
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
          <label>Prénom du contact</label>
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
