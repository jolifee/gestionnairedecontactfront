<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <button
          @click="$router.push({name : 'ListEntreprises'})"
          class="btn btn-outline-success btn-sm"
        >retour</button>
      </div>
      <div class="col text-center">
        <h2>{{ entreprise.raison_social }}</h2>
      </div>
      <div class="col text-right">
        <button
          class="btn btn-outline-success btn-sm"
          @click="$router.push({name : 'UpdateEntreprise', params: {id_entreprise: `${entreprise.id_entreprise}` } })"
        >Modifier</button>
      </div>
    </div>
    <div class="row">
      <div class="col text-right">
        <label>adresse :</label>
      </div>
      <div class="col">
        <h4>{{ entreprise.adresse }}</h4>
      </div>
    </div>
    <div class="row">
      <div class="col text-right">
        <label>Code Postal :</label>
      </div>
      <div class="col">
        <h4>{{ entreprise.code_postal }}</h4>
      </div>
    </div>
    <div class="row">
      <div class="col text-right">
        <label>Ville :</label>
      </div>
      <div class="col">
        <h4>{{ entreprise.ville }}</h4>
      </div>
    </div>
    <div class="row">
      <div class="col text-right">
        <label>Type d'entreprise :</label>
      </div>
      <div class="col">
        <h4>{{ entreprise.type }}</h4>
      </div>
    </div>
    <div class="row">
      <div class="col text-right">
        <label>E-mail :</label>
      </div>
      <div class="col">
        <h4>{{ entreprise.email }}</h4>
      </div>
    </div>
    <div class="row">
      <div class="col text-right">
        <label>Telephone :</label>
      </div>
      <div class="col">
        <h4>{{ entreprise.tel }}</h4>
      </div>
    </div>
    <div class="row">
      <div class="col text-right">
        <label>Status :</label>
      </div>
      <div class="col">
        <h4>{{ entreprise.statut }}</h4>
      </div>
    </div>
    <div class="row">
      <div class="col text-right">
        <label>Description :</label>
      </div>
      <div class="col">
        <h4>{{ entreprise.description }}</h4>
      </div>
    </div>
    <div>
      <div class="text-right">
        <button
          class="btn btn-outline-success"
          @click="$router.push({ name: 'AddContact',params: {id:`${id}`} })"
        >Ajouter un contact</button>
      </div>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th class="text-center">Nom</th>
            <th class="text-center">Prenom</th>
            <th class="text-center">fonction</th>
            <th class="text-center">telephone</th>
            <th class="text-center">E-mail</th>
            <th class="text-center">Supprimer</th>
            <th class="text-center">Modifier</th>
            <th class="text-center">Voir plus</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(contact) in filteredlist" :key="contact.id_contact">
            <td>{{contact.nom}}</td>
            <td>{{contact.prenom}}</td>
            <td>{{contact.fonction}}</td>
            <td>{{contact.tel}}</td>
            <td>{{contact.email}}</td>
            <td class="text-center">
              <button class="btn btn-outline-success" @click="deleteContact(contact.id_contact)">
                <font-awesome-icon icon="trash" />
              </button>
            </td>
            <td class="text-center">
              <button
                class="btn btn-outline-success"
                @click="$router.push({ name: 'UpdateContact', params: {id_contact: `${contact.id_contact}` } })"
              >
                <font-awesome-icon icon="edit" />
              </button>
            </td>
            <td class="text-center">
              <button
                class="btn btn-outline-success"
                @click="$router.push({name : 'Detailcontact', params: {id_contact:`${contact.id_contact}`} })"
              >
                <font-awesome-icon icon="plus" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailEntreprise",
  props: {
    id: String
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
        description: null
      },
      list: [],
      apiURL: "http://localhost:3000/v1",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
  },
  created() {
    this.findOneEntreprise(this.id);
    this.listContact();
  },
  watch: {
    $route() {
      this.findOneEntreprise(this.id);
      this.listContact();
    }
  },
  computed: {
    filteredlist(id) {
      return this.list.filter(contact => {
        if (contact.id_entreprise == this.id) {
          return contact;
          console.log(contact);
        }
      });
    }
  },
  methods: {
    async findOneEntreprise(id) {
      try {
        const response = await fetch(`${this.apiURL}/entreprises/${id}`);
        const entreprise = await response.json();
        this.entreprise = entreprise;
      } catch (err) {
        console.log(err.message);
      }
    },
    async listContact() {
      try {
        const response2 = await fetch(`${this.apiURL}/contacts/`);
        const list = await response2.json();
        console.log(list);
        this.list = list;
      } catch (err) {
        console.log(err.message);
      }
    },
    async deleteContact(id_contact) {
      const question = confirm("Voulez-vous supprimer ce contact ?");
      if (question == true) {
        const response = await fetch(`${this.apiURL}/contacts/${id_contact}`, {
          headers: this.headers,
          method: "DELETE"
        });
        if (await response) {
          this.listContact();
        } else {
          alert("La suppression a échoué");
        }
      }
    }
  }
};
</script>
