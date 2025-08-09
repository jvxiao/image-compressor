<template>
  <div class="compare bg-white rounded-lg shadow-sm overflow-hidden" v-for="(item, index) in imageList" :key="index">
   <div class="p-4" >
      <h4 class="font-semibold text-gray-800 mb-2">图片 {{ sourceImage[index].name }}</h4>
      <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
              <p class="text-sm text-gray-500 mb-1">原图</p>
              <img :src="sourceImage[index].url" alt="原图" class="w-full h-40 object-cover rounded">
              <p class="text-sm text-gray-500 mt-2">{{ frindlyFileSize(sourceImage[index].size) }}</p>
          </div>
          <div>
              <p class="text-sm text-gray-500 mb-1">压缩后</p>
              <img :src="item.url" alt="压缩后" class="w-full h-40 object-cover rounded">
              <p class="text-sm text-green-600 mt-2">{{ frindlyFileSize(item.size) }} <span class="text-gray-500 ml-1">减少：{{ calcReduceRate(sourceImage[index].size, item.size )}}</span></p>
          </div>
      </div>
      <div class="flex justify-between">
          <button class="text-blue-600 hover:text-blue-800 text-sm font-medium">
              <i class="fas fa-eye mr-1"></i> 查看原图
          </button>
          <button @click="downloadFile(item.url, sourceImage[index].name)" class="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-1.5 px-4 rounded transition-colors">
              <i class="fas fa-download mr-1"></i> 下载
          </button>
      </div>
  </div>
</div>
</template>

<script setup>
import { frindlyFileSize } from '../../utils/number'
import { downloadFile } from '../../utils/file'
const props = defineProps({
  imageList: {
    type: Array,
    default: []
  },

  sourceImage: {
    type: Array,
    default: []
  }
})

const calcReduceRate = (originSize, currentSize) => {
  if(originSize && currentSize) {
    return (((originSize - currentSize) / originSize) * 100).toFixed(0) + '%'
  }
}
</script>