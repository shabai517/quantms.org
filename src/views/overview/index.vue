<template>
  <div class="display-box">
    <h1 class="title">
      <span>Protein </span>
      <span
        v-for="(s, index) in font"
        :key="index"
        v-bind:style="{ color: fontColor[index] }"
        >{{ s }}</span
      >
    </h1>
    <!-- serch -->
    <div class="search-box">
      <el-select
        v-model="sapiens"
        class="m-2"
        placeholder="Select organism"
        style="width: 140px"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-input
        v-model="input"
        placeholder="protein name"
        clearable
        class="input"
      />
      <el-button type="primary" plain @click="queryProtein(input)"
        >Search</el-button
      >
    </div>
    <p>
      Find the iBAQ distribution for your protein of interest, e.g. ABCD4_HUMAN.
    </p>
    <div class="info">
      <h1>Organism: <span>Homo sapiens</span></h1>
      <h1>
        Protein: <span>{{ protein }}</span>
      </h1>
    </div>
    <!--  Image  -->
    <div class="card">
      <div ref="chart" style="width: 100%; height: 600px"></div>
    </div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { ref, onMounted, reactive, toRaw } from 'vue'
import { getProteins } from '@/api/search'
import { inflate } from 'pako'
// sapiens
const sapiens = ref('')
// select_menus
const options = [
  {
    value: 'Homo sapiens',
    label: 'Homo sapiens'
  }
]
// load protein table
onMounted(() => {
  getProteinTable()
})
// get full table
const proteinTable = reactive([])
const getProteinTable = async () => {
  const res = await getProteins()
  const byteArray = new Uint8Array(res.data)
  const data = inflate(byteArray, { to: 'string' })
  proteinTable.push(...JSON.parse(data))
}
// qeury
const queryProtein = (input) => {
  const proteinList = toRaw(proteinTable)
  const output = proteinList.find((item) => {
    return item.name === input
  })
  if (output) {
    protein.value = output.name
    init(output)
  } else {
    alert('Please enter a legal protein name')
  }
}

const font = ['V', 'i', 's', 'u', 'a', 'l', 'i', 'z', 'a', 't', 'i', 'o', 'n']
const fontColor = [
  '#25BEF6',
  '#EB3E71',
  '#0BB88D',
  '#FF7B22',
  '#25BEF6',
  '#EB3E71',
  '#0BB88D',
  '#FF7B22',
  '#25BEF6',
  '#EB3E71',
  '#0BB88D',
  '#FF7B22',
  '#25BEF6'
]
// input protien name
const input = ref('')
// protein name
const protein = ref('')
const chart = ref()
let myChart

const init = (data) => {
  if (myChart != null && myChart !== '' && myChart !== undefined) {
    myChart.dispose() // discard
  }
  myChart = echarts.init(chart.value)
  const option = {
    title: [
      {
        text: data.title,
        left: 'center'
      }
    ],
    dataset: [
      {
        source: data.data
      },
      {
        transform: {
          type: 'boxplot',
          config: {
            itemNameFormatter: function (params) {
              return data.tags[params.value]
            }
          }
        }
      },
      {
        fromDatasetIndex: 1,
        fromTransformResult: 1
      }
    ],
    tooltip: {
      trigger: 'item',
      axisPointer: {
        type: 'shadow'
      },
      textStyle: {},
      formatter: function (param) {
        return [
          "<div style='margin-bottom:5px;width:100%;border-radius:3px;text-align:center;family'><p>" +
            param.data[0] +
            ' </p></div>',
          '<hr size=1 style="margin: 3px 0">',
          "<span style='text-align:left;color:#8f9a7a;margin-right:15px;'>Max:</span>" +
            parseFloat(param.data[5]).toFixed(2) +
            '<br/>',
          "<span style='text-align:left;color:#8f9a7a;margin-right:15px;'>Q3:</span>" +
            parseFloat(param.data[4]).toFixed(2) +
            '<br/>',
          "<span style='text-align:left;color:#8f9a7a;margin-right:15px;'>Median:</span>" +
            parseFloat(param.data[3]).toFixed(2) +
            '<br/>',
          "<span style='text-align:left;color:#8f9a7a;margin-right:15px;'>Q1:</span>" +
            parseFloat(param.data[2]).toFixed(2) +
            '<br/>',
          "<span style='text-align:left;color:#8f9a7a;margin-right:15px;'>Min:</span>" +
            parseFloat(param.data[1]).toFixed(2) +
            '<br/>'
        ].join('')
      }
    },
    grid: {
      left: '10%',
      right: '10%',
      bottom: '15%'
    },
    yAxis: {
      type: 'category',
      boundaryGap: true,
      nameGap: 30,
      splitArea: {
        show: false
      },
      splitLine: {
        show: false
      }
    },
    xAxis: {
      type: 'value',
      name: 'riBAQ',
      nameLocation: 'center',
      nameGap: 30,
      splitArea: {
        show: true
      },
      scale: true
    },
    dataZoom: [
      {
        type: 'inside'
      },
      {
        type: 'slider',
        height: 10
      }
    ],
    toolbox: {
      feature: {
        saveAsImage: {
          type: 'png',
          title: 'save as .png'
        }
      }
    },
    series: [
      {
        name: 'boxplot',
        type: 'boxplot',
        datasetIndex: 1,
        itemStyle: {
          color: '#06B800',
          color0: '#FA0000',
          borderColor: null,
          borderColor0: null
        }
      },
      {
        name: 'outlier',
        type: 'scatter',
        encode: { x: 1, y: 0 },
        datasetIndex: 2
      }
    ]
  }
  myChart.setOption(option)
}
</script>
<style lang="scss" scoped>
.display-box {
  margin: 0 20px;
}
.introduction-msg {
  font-family: 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji';
  font-size: 16px;
  line-height: 1.5;
  word-wrap: break-word;
  text-align: left;
  border: 1px solid red;
  margin-bottom: 20px;
}
.input {
  width: 150px;
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: aqua;
  display: flex;
  align-items: center;
}
h1 {
  text-align: left;
}
.info {
  text-align: left;
  margin: 20px 0;
  margin-left: 2px;
}
.info h1 {
  font-size: 14px;
  margin: 5px 0;
  font-weight: inherit;
  font-weight: 500;
}
.info span {
  font-weight: 700;
}
.search-box {
  display: flex;
  margin-bottom: 2px;
}
.display-box p {
  text-align: left;
  font-size: 10px;
  font-weight: bold;
  margin-bottom: 32px;
  margin-left: 2px;
}
.title {
  font-size: 40px;
  // font-style: italic;
  font-family: 'Times New Roman', Times, serif;
}
</style>
