<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <button @click="$router.push({name : 'ListEntreprises'})">retour</button>
      </div>
      <div class="col">
        <h2>{{ entreprise.raison_social }}</h2>
      </div>
      <div class="col">
        <button @click="$router.push({name : 'UpdateEntreprise', params: {id_entreprise: `${entreprise.id_entreprise}` } })">Modifier</button>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <label>adresse : </label>
      </div>
      <div class="col">
        <h4>{{ entreprise.adresse }}</h4>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <label>Code Postal : </label>
      </div>
      <div class="col">
        <h4>{{ entreprise.code_postal }}</h4>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <label>Ville : </label>
      </div>
      <div class="col">
        <h4>{{ entreprise.ville }}</h4>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <label>Type d'entreprise : </label>
      </div>
      <div class="col">
        <h4>{{ entreprise.type }}</h4>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <label>E-mail : </label>
      </div>
      <div class="col">
        <h4>{{ entreprise.email }}</h4>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <label>Telephone : </label>
      </div>
      <div class="col">
        <h4>{{ entreprise.tel }}</h4>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <label>Status : </label>
      </div>
      <div class="col">
        <h4>{{ entreprise.statut }}</h4>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <label>Description : </label>
      </div>
      <div class="col">
        <h4>{{ entreprise.description }}</h4>
      </div>
    </div>
    <div>
      <button @click="$router.push({ name: 'AddContact' })">Ajouter un contact</button>
      <table>
          <thead>
              <tr>
                <th></th>
                <th>Nom</th>
                <th>Prenom</th>
                <th>fonction</th>
                <th>telephone</th>
                <th>E-mail</th>
                <th>Modifier</th>
                <th>Supprimer</th>
                <th>Voir plus</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(contact) of list" :key="contact.id_contact" >
                <td>{{contact.id_contact}}</td>
                <td>{{contact.nom}}</td>
                <td> {{contact.prenom}} </td>
                <td> {{contact.fonction}} </td>
                <td> {{contact.tel}} </td>
                <td> {{contact.email}} </td>
                <td> <button @click.stop="deletecontact(contact.id_contact)">supprimer</button> </td>
                <td> <button @click.stop="$router.push({ name: 'Updatecontact', params: {id_contact: `${contact.id_contact}` } })">modifier</button> </td>
                <td> <button @click="$router.push({name : 'Detailcontact', params: {id_contact:`${contact.id_contact}`} })">voir +</button></td>
              </tr>
          </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailEntreprise',
  props: {
    id_entreprise: String,
  },
  data() {
    return {
      entreprise: {
        raison_social: null,
        adresse: null,
        code_postal: null,
        ville: null,
        type: null,
        email: null,
        tel: null,
        statut: null,
        description: null,
      },
      list: [],
      apiURL: 'http://localhost:3000/v1',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
  },
  created() {
    this.findOneEntreprise(this.id_entreprise);
    this.listContact();
  },
  watch: {
    $route() {
      this.findOneEntreprise(this.id_entreprise);
      this.listContact();
    },

  },
  methods: {
    async findOneEntreprise(id_entreprise) {
      try {
        const response = await fetch(
          `${this.apiURL}/entreprises/${id_entreprise}`,
        );
        const entreprise = await response.json();
        this.entreprise = entreprise;
      } catch (err) {
        console.log(err.message);
      }
    },
    async listContact(id_entreprise) {
      try {
        const response2 = await fetch(
          `${this.apiURL}/contacts/entreprises/${this.id_entreprise}`,
        );
        console.log(response2);
        const list = await response2.json();
        console.log(list);
        this.list = list;
      } catch (err) {
        console.log(err.message);
      }
    },
    async deleteContact(id_contact) {
      const question = confirm('Voulez-vous supprimer ce contact ?');
      if (question == true) {
        const response = await fetch(`${this.apiURL}/contacts/${id_contact}`,
          {
            headers: this.headers,
            method: 'DELETE',
          });
        if (await response) {
          this.listContact();
        } else {
          alert('La suppression a échoué');
        }
      }
    },
  },
};
</script>
