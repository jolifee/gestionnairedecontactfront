<template>
  <div class="container">
    <div>
      <h2 class="text-center">liste des entreprises</h2>
    </div>
    <div>
      <div class="row">
        <div class="col-6 text-center">
          <label for="statut">Filtrez selon le statut de l'entreprise :</label>
          <select id="statut" v-model="search">
            <option value></option>
            <option value="prospection">prospection</option>
            <option value="Premier Contact">Premier Contact</option>
            <option value="Proposition Commerciale">Proposition Commerciale</option>
            <option value="Signature">Signature</option>
          </select>
        </div>
        <div class="col text-right">
          <button
            class="btn btn-outline-success"
            @click="$router.push({ name: 'AddEntreprise' })"
          >Ajouter une entreprise</button>
        </div>
      </div>
    </div>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th class="text-center">Raison Sociale</th>
          <th class="text-center">Ville</th>
          <th class="text-center">Status</th>
          <th class="text-center">Modifier</th>
          <th class="text-center">Supprimer</th>
          <th class="text-center">Voir plus</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!filteredList.length">
          <td>Pas de résultat pour ce filtre</td>
        </tr>
        <tr v-for="(entreprise) in filteredList" :key="entreprise.id">
          <td scope="row">{{entreprise.raison_social}}</td>
          <td>{{entreprise.ville}}</td>
          <td>{{entreprise.statut}}</td>
          <td class="text-center">
            <button
              @click="deleteEntreprise(entreprise.id)"
              class="text-center btn btn-outline-success"
            >
              <font-awesome-icon icon="trash" />
            </button>
          </td>
          <td class="text-center">
            <button
              @click="$router.push({ name: 'UpdateEntreprise', params: {id: `${entreprise.id}` } })"
              class="text-center btn btn-outline-success"
            >
              <font-awesome-icon icon="edit" />
            </button>
          </td>
          <td class="text-center">
            <button
              @click="$router.push({name : 'DetailEntreprise', params: {id:`${entreprise.id}`} })"
              class="text-center btn btn-outline-success"
            >
              <font-awesome-icon icon="plus" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "ListEntreprises",
  data() {
    return {
      search: "",
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
  computed: {
    filteredList: function() {
      return this.list.filter(item => {
        if (item.statut) {
          return item.statut.match(this.search);
        } else {
          return item;
        }
      });
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
