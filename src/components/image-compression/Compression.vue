<template>
  <!-- 图片上传区域 123-->
  <div id="drop-area" @dragenter="highlight" @dragover="highlight" @dragleave="unhighlight" @drop="handleDrop"
    class="drag-area border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer">
    <i class="fas fa-cloud-upload-alt text-5xl text-gray-400 mb-4"></i>
    <h2 class="text-2xl font-semibold text-gray-700 mb-2">拖放图片到此处或点击上传</h2>
    <p class="text-gray-500 mb-6">支持JPG、PNG、WEBP等格式，单次最多上传5张图片</p>
    <button id="upload-btn" @click="uploadImage"
      class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors">
      <i class="fas fa-upload mr-2"></i> 选择图片
    </button>
    <input type="file" ref="fileInput" id="file-input" multiple accept="image/*" class="hidden"
      @change="handleInputFileChange">
  </div>

  <!-- 压缩设置 -->
  <div id="compression-settings" class="mt-8 p-6 bg-white rounded-lg shadow-sm" v-if="showCompressionSetting">
    <div class="image-list mb-6">
      <p v-for="img in imageBox" :key="img.name" class="h-7 flex">
        <span class="mr-12 w-80 truncate cursor-pointer" :title="img.name">{{ img.name }}</span>
        <span class="mr-16 w-40">{{ frindlyFileSize(img.size) }}</span>
        <span class="w-20"> 待处理</span>
      </p>
    </div>
    <h3 class="text-xl font-semibold text-gray-800 mb-4">压缩设置</h3>
    <div class="mb-6">
      <label for="quality" class="block text-gray-700 font-medium mb-2">压缩质量</label>
      <div class="flex items-center">
        <input v-model="quality" type="range" id="quality" min="10" max="90" value="70" class="w-full mr-4">
        <span id="quality-value" class="text-gray-700 font-medium">{{quality}}%</span>
      </div>
    </div>
    <div class="mb-6 hidden">
      <label class="block text-gray-700 font-medium mb-2">目标格式</label>
      <div class="flex space-x-4">
        <label class="flex items-center">
          <input type="radio" name="format" value="auto" checked class="mr-2">
          <span class="text-gray-700">自动(保持原格式)</span>
        </label>
        <label class="flex items-center">
          <input type="radio" name="format" value="jpg" class="mr-2">
          <span class="text-gray-700">JPG</span>
        </label>
        <label class="flex items-center">
          <input type="radio" name="format" value="png" class="mr-2">
          <span class="text-gray-700">PNG</span>
        </label>
        <label class="flex items-center">
          <input type="radio" name="format" value="webp" class="mr-2">
          <span class="text-gray-700">WEBP</span>
        </label>
      </div>
    </div>
    <button id="start-compression" @click="doCompress"
      class="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-lg transition-colors">
      <i class="fas fa-magic mr-2"></i> 开始压缩
    </button>
  </div>

  <!-- 加载状态 -->
  <div id="loading-state" class="mt-8 p-6 bg-white rounded-lg shadow-sm text-center" :class="[processing ? '' :'hidden']">
    <div class="inline-block">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
    <p class="mt-4 text-lg text-gray-700">正在压缩图片，请稍候...</p>
    <div class="w-full bg-gray-200 rounded-full h-2 mt-6">
      <div id="compression-progress" class="progress-bar bg-green-600 h-2 rounded-full" style="width: 0%"></div>
    </div>
  </div>

  <!-- 结果展示区域 -->
  <div id="results-area" :class="['mt-8', processing || !output.length ? 'hidden': '']">
    <h3 class="text-xl font-semibold text-gray-800 mb-4">压缩结果</h3>
    <div id="image-results" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- 图片结果将通过JS动态添加 -->
      <Compare :imageList="output" :sourceImage="imageBox" />
      
    </div>
    <div class="mt-6 text-center">
      <button id="download-all"
        class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors">
        <i class="fas fa-download mr-2"></i> 下载所有图片
      </button>
      <button id="compress-again"
        class="ml-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-3 px-8 rounded-lg transition-colors">
        <i class="fas fa-redo mr-2"></i> 重新压缩
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { frindlyFileSize } from '../../utils/number'
import Compressor from 'compressorjs';
import Compare from './Compare.vue';
const imageBox = ref([]);
const output = ref([])
const processing = ref(false);
const quality = ref(70)

const fileInput = ref(null);

// 现实压缩参数设置
const showCompressionSetting = computed(() => {
  return imageBox.value.length;
})

onMounted(() => {

})



function initListener () {
  const dropAreaEl = document.getElementById('drop-area');
  dropAreaEl.addEventListener('')
}

async function compressFile(file, options = { level: 'strong', quality: '70' }) {

  const compressLevels = {
    slight: "85",
    normal: "75",
    strong: "50",
    extreme: "20"
  };

  return new Promise((resolve, reject) => {
    try {
      debugger
      const bb = new Blob([file])
      bb.arrayBuffer().then(res => {
        let buff = new Uint8Array(res)
        const result = cjpeg(buff, ["-quality", options.quality || compressLevels[options.level]  || compressLevels["normal"]])
        const blob = new Blob([result.data])
        blob.url = window.URL.createObjectURL(blob) // 创建下载的链接
        resolve(blob)
      })
    } catch (e) {
      reject(e)
    }
  })
}


// const buf = new Uint8Array(reader.readAsArrayBuffer(files[0]));


function doCompress() {
  const task = [];
  console.log({ quality: quality.value.toString()})
  for(let file of imageBox.value) {
    task.push(compressFile(file, { quality: quality.value.toString() }))
  }
  processing.value = true;
  Promise.all(task).then(([...result]) =>{
    console.log(result)
    output.value = result;
    processing.value = false;
  })
}

function initStyleListener() {

  // 再次压缩
  // compressAgain.addEventListener('click', () => {
  //     resultsArea.classList.add('hidden');
  //     compressionSettings.classList.remove('hidden');
  //     // 重置进度
  //     compressionProgress.style.width = '0%';
  //     // 高亮第二步
  //     compressionSteps[2].classList.remove('active');
  //     compressionSteps[1].classList.add('active');
  // });

}

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}


function highlight(e) {
  preventDefaults(e)
  e.target.classList.add('active');
}

function unhighlight(e) {
  preventDefaults(e)
  e.target.classList.remove('active');
}


function handleDrop(e) {
  unhighlight(e);
  const dt = e.dataTransfer;
  const files = dt.files;
  handleFiles(files);
}

function uploadImage() {
  fileInput.value.click();
}



function handleInputFileChange(e) {
  handleFiles(e.target.files || []);
}

function handleFiles(files) {
  // 限制最多上传5张图片
  if (files.length > 10) {
    alert('最多只能上传10张图片');
    fileInput.value = '';
    return;
  }
  // // 显示压缩设置
  // compressionSettings.classList.remove('hidden');

  imageBox.value = Array.from(files).map(item => {
    item.url = URL.createObjectURL(item);
    return item;
  });

}


</script>