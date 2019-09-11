<template>
  <div>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">Raison Sociale</th>
          <th scope="col">Ville</th>
          <th scope="col">Status</th>
          <th scope="col">Modifier</th>
          <th scope="col">Supprimer</th>
          <th scope="col">Voir plus</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entreprise) of list" :key="entreprise.id">
          <td scope="row">{{entreprise.raison_social}}</td>
          <td>{{entreprise.ville}}</td>
          <td>{{entreprise.statut}}</td>
          <td>
            <button @click.stop="deleteEntreprise(entreprise.id)">supprimer</button>
          </td>
          <td>
            <button
              @click.stop="$router.push({ name: 'UpdateEntreprise', params: {id: `${entreprise.id}` } })"
            >modifier</button>
          </td>
          <td>
            <button
              @click="$router.push({name : 'DetailEntreprise', params: {id:`${entreprise.id}`} })"
            >voir +</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "TableEntreprises",
  data() {
    return {
      list: [],
      apiURL: "http://localhost:3000/v1",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
  },
  created() {
    this.listEntreprises();
  },
  watch: {
    $route() {
      this.listEntreprises();
    }
  },
  methods: {
    async listEntreprises() {
      try {
        const response = await fetch(`${this.apiURL}/entreprises`);
        const list = await response.json();
        this.list = list;
      } catch (err) {
        console.log(err.message);
      }
    },
    async deleteEntreprise(id) {
      const question = confirm("Voulez-vous supprimer cette entreprise ?");
      if (question == true) {
        const response = await fetch(`${this.apiURL}/entreprises/${id}`, {
          headers: this.headers,
          method: "DELETE"
        });
        if (await response) {
          this.listEntreprises();
        } else {
          alert("La suppression a échoué");
        }
      }
    }
  }
};
</script>
