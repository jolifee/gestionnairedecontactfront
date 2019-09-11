import Vue from 'vue';
import Router from 'vue-router';
import ListEntreprises from './views/ListEntreprises.vue';
import AddEntreprise from './views/AddEntreprise.vue';
import DetailEntreprise from './views/DetailEntreprise.vue';
import UpdateEntreprise from './views/UpdateEntreprise.vue';
import AddContact from './views/AddContact.vue';


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ListEntreprises',
      component: ListEntreprises,
    },
    {
      path: '/AddEntreprise',
      name: 'AddEntreprise',
      component: AddEntreprise,
    },
    {
      path: '/DetailEntreprise/:id',
      name: 'DetailEntreprise',
      component: DetailEntreprise,
      props: true,
    },
    {
      path: '/AddContact',
      name: 'AddContact',
      component: AddContact,
      props: true,
    },
    {
      path: '/UpdateEntreprise/:id',
      name: 'UpdateEntreprise',
      component: UpdateEntreprise,
      props: true,
    },
  ],
});
