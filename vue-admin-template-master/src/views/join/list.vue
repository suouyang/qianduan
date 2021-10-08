<template>
  <div>
    <el-form ref="joinUs" :model="joinUs" label-width="80px">
      <el-form-item label="首页图片">
        <img :src="joinUs.firstImage" width="200px" height="150px"></img>
      </el-form-item>
      <el-form-item label="办公环境" v-model="environment">
      <div>
        <div v-for="(item,i) in environment" style="float: left">
          <li>{{item.description}}</li>
       <img :src="item.imageUrl" width="200px" height="150px">
        </div>
      </div>

      </el-form-item>
      <el-form-item label="活动图片">
        <div>
          <div v-for="item in this.joinActivity" :key="item.id" style="float: left">
            <img :src="item.imageUrl" width="200px" height="150px">
          </div>
        </div>
      </el-form-item>
      <el-form-item label="人才培养">
        <quill-editor
          ref="myQuillEditor"
          v-model="joinUs.talents"
          :options="editorOption"
          style="width: 900px"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @change="onEditorChange($event)"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit()">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import join from '@/api/smart/join'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import Vue from 'vue'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)
export default {
  data() {
    return {
      joinUs: {
        firstImage: '',
        activity: '',
        talents: '',
      },
      content:'',
      editorOption: {},
      environment: [],
      joinActivity:[]
    }
  },
  created() {
    this.getJoin()
    this.selectEnviron()
    this.selectJoinActivity()
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    }
  },
  methods: {
    getJoin() {
      join.getJoinUs().then(response => {
        this.joinUs = response.data.data
        console.log(this.joinUs)
      })
    },
    selectEnviron() {
      join.selectEnvironmen().then(response => {
        this.environment = response.data.data
      })
    },
    selectJoinActivity(){
     join.selectJoinActivity().then(response=>{
       this.joinActivity=response.data.data
     })

    },
    onSubmit() {
      this.$router.push({path: '/join/save/'})
    },
    onEditorReady(editor){
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {} ,// 内容改变事件
  },

}

</script>
