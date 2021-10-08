<template>
  <div>
    <el-form ref="recruitment" :model="recruitment" :rules="rules" label-width="80px">
      <el-form-item label="招聘职位" prop="position">
        <el-input v-model="recruitment.position" style="width: 210px"/>
      </el-form-item>
      <el-form-item label="招聘类别" prop="cid">
        <el-select v-model="recruitment.cid" placeholder="请选择">
          <el-option
            v-for="item in nameList"
            :key="item.cid"
            :label="item.name"
            :value="item.cid"/>
        </el-select>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-date-picker
          v-model="recruitment.createTime"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"/>
      </el-form-item>
      <el-form-item label="招聘要求">
        <quill-editor
          ref="myQuillEditor"
          v-model="recruitment.content"
          :options="editorOption"
          style="width: 800px"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @change="onEditorChange($event)"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveOrUpdate('recruitment')">立即创建</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>

  </div>

</template>
<script>

import recru from '@/api/smart/recruitment'
import recrucate from '@/api/smart/recruitmentCategory'
import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)
export default {

  data() {
    return {
      rules:{
        cid: [{required: true, message: "招聘类别不能为空", trigger: "change"}],
        position: [{required: true, message: "招聘职位不能为空", trigger: "change"}]
      },
      recruitment: {
        name: '',
        position: '',
        content: '',
        createTime: '',
        modifiedTime: '',
        cid:''
      },
      nameList:[],
      // 富文本内容
      content: '',
      editorOption: {}
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    }
  },
  created() {
    this.selectAllCategory()
    this.init()
  },
  methods: {
    addRecruitment() {
      recru.addRecruitment(this.recruitment)
        .then(response => { // 添加成功
          // 提示信息
          // console.log(response)
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          // 回到列表页面 路由跳转
          this.$router.push({ path: '/recruitment/list' })
        })
    },
    init() {
      // 判断路径有id值,做修改
      if (this.$route.params && this.$route.params.id) {
        // 从路径获取id值
        const id = this.$route.params.id
        console.log(id)
        // 调用根据id查询的方法
        this.selectRecruitmentById(id)
      } else { // 路径没有id值，做添加
        // 清空表单
        this.recruitment = {}
      }
    },
    saveOrUpdate(formName) {

      // 判断修改还是添加
      if (!this.recruitment.id) {
        // 添加
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.addRecruitment()
            this.$router.push({path:'/recruitment/list'})
          } else {
            console.log("error submit!!");
            return false;
          }
        });

      } else {
        // 修改
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.updateRecruitment()()
            this.$router.push({path:'/recruitment/list'})
          } else {
            console.log("error submit!!");
            return false;
          }
        });

      }
    },
    updateRecruitment() {
      recru.updateRecruitment(this.recruitment)
        .then(response => {
          // 提示信息
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          // 回到列表页面 路由跳转
          this.$router.push({ path: '/recruitment/list' })
        })
    },
    selectAllCategory() {
      recrucate.selectAllCategory().then(response => {
        this.nameList = response.data.data
      })
    },
    cancel() {
      this.recruitment = null
      this.$router.push({ path: '/recruitment/list' })
    },
    selectRecruitmentById(id) {
      recru.selectRecruitmentById(id).then(response => {
        this.recruitment = response.data.data
      })
    },
    onEditorReady(editor) { // 准备编辑器

    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {} // 内容改变事件
  }

}
</script>

