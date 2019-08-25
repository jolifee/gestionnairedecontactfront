<template>
    <div class="container">
        <div class="row">
            <h2> liste des entreprises</h2>
        </div>
        <div class="row">
            <div class="col">
                <select>
                    <option>prospection</option>
                    <option>Premier Contact</option>
                    <option>Proposition Commerciale</option>
                    <option>Signature</option>
                </select>
            </div>
            <div class="col">
                <button @click="$router.push({ name: 'AddEntreprise' })">Ajouter une entreprise</button>
            </div>
        </div>
      <TableEntreprises />
    </div>
</template>

<script>
import TableEntreprises from '../components/TableEntreprises.vue';

export default {
  name: 'ListEntreprises',
  components: {
    TableEntreprises,
  },
};
</script>
