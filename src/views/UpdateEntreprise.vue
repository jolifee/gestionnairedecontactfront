<template>
  <div>
    <button @click="$router.push({name : 'ListEntreprises'})">retour à la liste des entreprises</button>
    <h1>Modifier une entreprise</h1>
    <form @submit.prevent="updateEntreprise()">
      <div class="form-group">
        <label>Raison Social :</label>
        <input type="text" v-model="raison_social" />
      </div>
      <div>
        <label>Adresse</label>
        <input type="text" v-model="adresse" />
      </div>
      <div>
        <label>Code Postal :</label>
        <input type="text" v-model="code_postal" />
      </div>
      <div>
        <label>Ville</label>
        <input type="text" v-model="ville" />
      </div>
      <div>
        <label>Type d'entreprise :</label>
        <input type="text" v-model="type" />
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
        <label>Status :</label>
        <label for="prospection">prospection</label>
        <input v-model="statut" type="radio" id="prospection" value="prospection" />
        <br />
        <label for="Premier_Contact">Premier Contact</label>
        <input v-model="statut" type="radio" id="Premier_Contact" value="Premier Contact" />
        <br />
        <label for="Proposition_Commerciale">Proposition Commerciale</label>
        <input
          v-model="statut"
          type="radio"
          id="Proposition_Commerciale"
          value="Proposition Commerciale"
        />
        <br />
        <label for="Signature">Signature</label>
        <input v-model="statut" type="radio" id="Signature" value="Signature" />
      </div>
      <div>
        <label>Plus d'info :</label>
        <input type="text" v-model="description" />
      </div>
      <div></div>
      <input type="submit" />
    </form>
  </div>
</template>

<script>
export default {
  name: "UpdateEntreprise",
  props: {
    id: String
  },
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
  created() {
    this.findOneEntreprise(this.id);
  },
  watch: {
    $route() {
      this.findOneEntreprise(this.id);
    }
  },
  methods: {
    async findOneEntreprise(id) {
      const response = await fetch(`${this.apiURL}/entreprises/${id}`);
      const result = await response.json();
      (this.raison_social = result.raison_social),
        (this.adresse = result.adresse),
        (this.code_postal = result.code_postal),
        (this.ville = result.ville),
        (this.type = result.type),
        (this.email = result.email),
        (this.tel = result.tel),
        (this.statut = result.statut),
        (this.description = result.description);
    },
    updateEntreprise: async function(id) {
      console.log(this.id);
      let responses = await fetch(`${this.apiURL}/entreprises/${this.id}`, {
        headers: this.headers,
        method: "PUT",
        body: JSON.stringify({
          raison_social: this.raison_social,
          adresse: this.adresse,
          code_postal: this.code_postal,
          ville: this.ville,
          type: this.type,
          email: this.email,
          tel: this.tel,
          statut: this.statut,
          description: this.description
        })
      });
      console.log(responses);
      this.$router.push({ name: "ListEntreprises" });
    }
  }
};
</script>
