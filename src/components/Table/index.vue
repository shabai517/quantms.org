<template>
  <el-table
    :data="table"
    border
    style="width: 100%"
    :header-cell-style="{ backgroundColor: '#5AAC8A', color: '#000' }"
    :cell-style="{ backgroundColor: '#f7f8f6' }"
    height="1000"
  >
    <el-table-column label="Accession" min-width="100">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-link :href="scope.row.accession.path" type="primary">{{
            scope.row.accession.id
          }}</el-link>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="samples" label="Samples" />
    <el-table-column prop="msruns" label="Msruns" />
    <el-table-column prop="peptides" label="Peptides" />
    <el-table-column prop="proteins" label="Proteins" />
    <el-table-column label="Title" min-width="500">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          {{ scope.row.title.title }}
        </div>
        PubmedID:
        <span v-for="pubmed in scope.row.title.pubmedId" :key="pubmed.id">
          <text v-html="'&nbsp;'"></text>
          <el-link :href="pubmed.path" type="primary">
            {{ pubmed.id }}
          </el-link>
        </span>
      </template>
    </el-table-column>
    <el-table-column label="Reanalysis" min-width="140">
      <template #default="scope">
        <div
          style="display: flex; align-items: center"
          v-for="item in scope.row.reanalysis"
          :key="item.id"
        >
          <el-link :href="item.path" type="primary"
            >{{ item.title }};<br
          /></el-link>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>
<script setup>
import { defineProps } from 'vue';
defineProps({
  table: {
    type: Object
  }
})

</script>
<style lang="scss" scoped></style>
