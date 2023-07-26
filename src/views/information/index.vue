<template>
  <div class="page">
    <h1 class="title">quantms reanalysis</h1>
    <p class="body-content">
      A total of 118 datasets were reanalyzed using quantms version 1.1, UniProt
      protein sequence database (version 10.20222), only the SwissProt (reviewed
      proteins) without isoforms information. All datasets have been deposited
      in
      <a
        href="http://ftp.pride.ebi.ac.uk/pub/databases/pride/resources/proteomes/"
        >PRIDE Archive public FTP</a
      >. All datasets were filtered at a 1% false discovery rate (FDR) at PSM
      and protein levels for all datasets. All parameters including the
      posttranslational modifications, precursor and fragment tolerances can be
      found for each dataset in the corresponding SDRF. Following 2 tables show
      the list of AE and DE datasets reanalyzed including the number of samples,
      ms runs, unique peptides and unique proteins for each dataset, as well as
      reanalysis results and publication information.
    </p>
    <p class="body-title">absolute-expression</p>
    <Table v-model:table="tableDataAE"></Table>
    <p class="body-title">differential-expression</p>
    <Table v-model:table="tableDataDE"></Table>
  </div>
</template>
<script setup>
import Table from '@/components/Table/index.vue'
import { ref } from 'vue'
import { getAbsolueExpression, getDifferentialExpression } from '@/api/getTable'
const tableDataAE = ref([])
const tableDataDE = ref([])
const initTable = async () => {
  const AE = await getAbsolueExpression()
  tableDataAE.value = AE.data
  const DE = await getDifferentialExpression()
  tableDataDE.value = DE.data
}
initTable()
</script>
<style lang="scss" scoped>
.title {
  font-size: 32px;
  font-style: italic;
  font-family: 'Times New Roman', Times, serif;
}
.page {
  width: 95%;
  margin: 12px auto;
}
.body-title {
  font-size: 24px;
  font-weight: bold;
  text-align: left;
  padding-bottom: 5px;
  margin-bottom: 10px;
}
.body-content {
  font-family: 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji';
  font-size: 16px;
  line-height: 1.5;
  word-wrap: break-word;
  text-align: left;
  margin-top: 14px;
}
</style>
