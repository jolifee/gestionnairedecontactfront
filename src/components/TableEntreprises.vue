<template>
    <div>
      <table>
          <thead>
              <tr>
                <th>Raison Sociale</th>
                <th>Ville</th>
                <th>Status</th>
                <th>Modifier</th>
                <th>Supprimer</th>
                <th>Voir plus</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(entreprise) of list" :key="entreprise.id_entreprise" >
                <td>{{entreprise.raison_social}}</td>
                <td> {{entreprise.ville}} </td>
                <td> {{entreprise.statut}} </td>
                <td> <button @click.stop="deleteEntreprise(entreprise.id_entreprise)">supprimer</button> </td>
                <td> <button @click.stop="$router.push({ name: 'UpdateEntreprise', params: {id_entreprise: `${entreprise.id_entreprise}` } })">modifier</button> </td>
                <td> <button @click="$router.push({name : 'DetailEntreprise', params: {id_entreprise:`${entreprise.id_entreprise}`} })">voir +</button></td>
              </tr>
          </tbody>
      </table>
    </div>
</template>

<script>
export default {
  name: 'TableEntreprises',
  data() {
    return {
      list: [],
      apiURL: 'http://localhost:3000/v1',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
  },
  created() {
    this.listEntreprises();
  },
  watch: {
    $route() {
      this.listEntreprises();
    },
  },
  methods: {
    async listEntreprises() {
      try {
        const response = await fetch(
          `${this.apiURL}/entreprises`,
        );
        const list = await response.json();
        this.list = list;
      } catch (err) {
        console.log(err.message);
      }
    },
    async deleteEntreprise(id_entreprise) {
      const question = confirm('Voulez-vous supprimer cette entreprise ?');
      if (question == true) {
        const response = await fetch(`${this.apiURL}/entreprises/${id_entreprise}`,
          {
            headers: this.headers,
            method: 'DELETE',
          });
        if (await response) {
          this.listEntreprises();
        } else {
          alert('La suppression a échoué');
        }
      }
    },
  },
};
</script>
