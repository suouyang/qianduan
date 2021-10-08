<template>
  <div>
    <el-form ref="joinUs" :model="joinUs" label-width="80px">
      <el-form-item label="首页图片">
        <el-upload
          class="avatar-uploader"
          :action="BASE_API+'/upload/file'"
          :show-file-list="false"
          :on-success="handleSuccess"
          :before-upload="beforeUpload">
          <img v-if="imageUrl!=null" :src="joinUs.firstImage" class="avatar" width="300px" height="200px">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <div style="margin-left: 80px">
        <el-button  type="primary" icon="el-icon-edit"@click="submitDisappear()" >添加</el-button>
<!--        <el-button type="text" @click="submitDisappear()">添加</el-button>-->
        <el-dialog title="图片"  :visible.sync="dialogFormVisible">
          <el-form  :model="en">
            <el-form-item label="图片说明">
              <el-input v-model="en.description" style="width: auto" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="图片链接" >
              <el-upload
                :on-success="handleAvatarSuccess11"
                :before-upload="beforeUpload"
                :show-file-list="false"
                :action="BASE_API+'/upload/file'"
                class="avatar-uploader">
                <img v-if="imageurl14!=null" :src="en.imageUrl" width="200" height="200" >
                <!--                <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
              </el-upload>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitImage()">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <el-form-item label="办公环境">
        <el-table
          :data="envir"
          border
          fit
          highlight-current-row>
          <el-table-column
            label="序号"
            width="70"
            align="center">
            <template slot-scope="scope">
              {{  scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column
            prop="description"
            label="图片说明"
            width="150">
          </el-table-column>
          <el-table-column label="图片缩略图" width="220px" >
            <template width="90"  slot-scope="scope">
            <img style="width:100px;height:100px;border:none;" :src="scope.row.imageUrl">-->
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="200px" >
            <template slot-scope="scope">
<!--            <router-link :to="'/join/edit/'+scope.row.id">-->
<!--              <el-button type="primary" size="mini" icon="el-icon-edit" style="width: 73px" >修改</el-button>-->
<!--            </router-link>-->
              <el-button type="danger" size="mini" icon="el-icon-delete" style="width: 73px"  @click="removeDataById(scope.row.id)">删除</el-button>
              <el-button type="primary" size="mini" @click="submitDisappear()">添加</el-button>
              <el-dialog title="图片"  :visible.sync="dialogFormVisible">
                <el-form  :model="en">
                  <el-form-item label="图片说明">
                    <el-input v-model="en.description" style="width: auto"></el-input>
                  </el-form-item>
                  <el-form-item label="图片" >
                    <el-upload
                      :on-success="handleAvatarSuccess11"
                      :before-upload="beforeUpload"
                      :show-file-list="false"
                      :action="BASE_API+'/upload/file'"
                      class="avatar-uploader">
                      <img v-if="imageurl14!=null" :src="en.imageUrl" width="200" height="200" >
                      <!--                <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
                    </el-upload>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="submitImage()">确 定</el-button>
                </div>
              </el-dialog>
            </template>
          </el-table-column>
        </el-table>
    <el-form-item>
<!--    <el-button type="text" @click="submitDisappear()">添加</el-button>-->
<!--    <el-dialog title="图片"  :visible.sync="dialogFormVisible">-->
<!--      <el-form  :model="en">-->
<!--        <el-form-item label="图片说明">-->
<!--          <el-input v-model="en.description" style="width: auto" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="图片链接" >-->
<!--          <el-upload-->
<!--            :on-success="handleAvatarSuccess11"-->
<!--            :before-upload="beforeAvatarUpload"-->
<!--            :show-file-list="false"-->
<!--            :action="BASE_API+'/upload/file'"-->
<!--            class="avatar-uploader">-->
<!--            <img v-if="imageurl14!=null" :src="en.imageUrl" width="200" height="200" >-->
<!--            &lt;!&ndash;                <i v-else class="el-icon-plus avatar-uploader-icon"></i>&ndash;&gt;-->
<!--          </el-upload>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--      <div slot="footer" class="dialog-footer">-->
<!--        <el-button @click="dialogFormVisible = false">取 消</el-button>-->
<!--        <el-button type="primary" @click="submitImage()">确 定</el-button>-->
<!--      </div>-->
<!--    </el-dialog>-->

</el-form-item>
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
      <div style="margin-left: 80px">
      <el-button  type="primary" icon="el-icon-edit"@click="submitDisappear1()" >添加</el-button>
        <el-dialog title="图片"  :visible.sync="dialogFormVisible1">
          <el-form  :model="en1">
            <el-form-item label="图片" >
              <el-upload
                :on-success="handleAvatarSuccess33"
                :before-upload="beforeUpload"
                :show-file-list="false"
                :action="BASE_API+'/upload/file'"
                class="avatar-uploader">
                <img v-if="imageurl16!=null" :src="en1.imageUrl" width="200" height="200" >
                <!--                <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
              </el-upload>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible1 = false">取 消</el-button>
            <el-button type="primary" @click="submitImage1()">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <el-form-item label="活动图片">
        <el-table
          :data="joinActiv"
          border
          fit
          highlight-current-row>
          <el-table-column
            label="序号"
            width="70"
            align="center">
            <template slot-scope="scope">
              {{  scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column label="活动图片缩略图" width="440px" hight="440px">
            <template width="90"  slot-scope="scope">
              <img style="width:350px;height:350px;border:none;" :src="scope.row.imageUrl">-->
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="200px" >
            <template slot-scope="scope">
              <el-button type="danger" size="mini" icon="el-icon-delete" style="width: 73px"  @click="removeDataById1(scope.row.id)">删除</el-button>
              <el-button type="primary" size="mini" icon="el-icon-add" @click="submitDisappear1()">添加</el-button>
              <el-dialog title="图片"  :visible.sync="dialogFormVisible1">
                <el-form  :model="en1">
                  <el-form-item label="图片链接" >
                    <el-upload
                      :on-success="handleAvatarSuccess33"
                      :before-upload="beforeUpload"
                      :show-file-list="false"
                      :action="BASE_API+'/upload/file'"
                      class="avatar-uploader">
                      <img v-if="imageurl16!=null" :src="en1.imageUrl" width="200" height="200" >
                      <!--                <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
                    </el-upload>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                  <el-button type="primary" @click="submitImage1()">确 定</el-button>
                </div>
              </el-dialog>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
<!--        <el-button type="text" @click="submitDisappear1()">添加</el-button>-->
<!--        <el-dialog title="图片"  :visible.sync="dialogFormVisible1">-->
<!--          <el-form  :model="en1">-->
<!--            <el-form-item label="图片链接" >-->
<!--              <el-upload-->
<!--                :on-success="handleAvatarSuccess33"-->
<!--                :before-upload="beforeUpload"-->
<!--                :show-file-list="false"-->
<!--                :action="BASE_API+'/upload/file'"-->
<!--                class="avatar-uploader">-->
<!--                <img v-if="imageurl16!=null" :src="en1.imageUrl" width="200" height="200" >-->
<!--                &lt;!&ndash;                <i v-else class="el-icon-plus avatar-uploader-icon"></i>&ndash;&gt;-->
<!--              </el-upload>-->
<!--            </el-form-item>-->
<!--          </el-form>-->
<!--          <div slot="footer" class="dialog-footer">-->
<!--            <el-button @click="dialogFormVisible1 = false">取 消</el-button>-->
<!--            <el-button type="primary" @click="submitImage1()">确 定</el-button>-->
<!--          </div>-->
<!--        </el-dialog>-->
      </el-form-item>
      <el-form-item>

        <el-button type="primary" @click="saveOrUpdate()">确认修改</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>

    </el-form>

  </div>

</template>
<script>
import join from '@/api/smart/join'
import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)
export default {
  inject:['reload'],

  data() {
    return {
      joinUs: {
        firstImage:''
      },
      environment:[],
      envir:[],
      activ:[],
      imageUrl: '',
      saveBtnDisabled: false,
      BASE_API: process.env.BASE_API, // 接口API地址
      en:{
        imageUrl:'',
        description:''
      },
      en1:{
        imageUrl:'',
      },

      imageurl14:'',
      imageurl15:'',
      imageurl16:'',
      joinActivity:[],
      joinActiv:[],
      dialogFormVisible:false,
      dialogFormVisible1:false,
      dialogImageUrl:'',
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
    // this.selectCategory()
    this.getJoin()
    this.selectEnviron()
    this.selectJoinActivity()
  },
  methods: {
    submitDisappear(){
      this.dialogFormVisible = true
      this.en={}
    },
    submitDisappear1(){
      this.dialogFormVisible1 = true
      this.en1={}
    },
    submitImage() {
      this.dialogFormVisible = false
      let en2={}
      en2.description=this.en.description
      en2.imageUrl=this.en.imageUrl
      this.envir.push(en2)
      this.$router.push({path: '/join/save'})
      // this.selectEnviron()
      // join.addImage(en2).then(response=>{
      //   this.$message({
      //     type: 'success',
      //     message: '增加成功!'
      //   })
      //   // this.$router.push({path: '/join/save'})
      //   //  this.selectEnviron()
      // })


    },
    submitImage1() {
      this.dialogFormVisible1 = false
      let en3={}
      en3.imageUrl=this.en1.imageUrl
      this.joinActiv.push(en3)
      // join.addJoinActivity(en3).then(response=>{
      //   this.$message({
      //     type: 'success',
      //     message: '增加成功!'
      //   })
      //   this.$router.push({path: '/join/save'})
      //   this.selectJoinActivity()
      // })
    },

    selectJoinActivity(){
      join.selectJoinActivity().then(response=>{
        this.joinActivity=response.data.data
        this.joinActivity.forEach(item=>{
          this.joinActiv.push(item)
        })
      })

    },
    handleAvatarSuccess11(res, file) {
      // console.log(res)// 上传响应
      // console.log(URL.createObjectURL(file.raw))// base64编码
      this.en.imageUrl= res.data.url
      this.imageurl14=file.url
      // console.log(this.productVo.firstImage)
    },
    // handleAvatarSuccess22(res, file) {
    //   // console.log(res)// 上传响应
    //   // console.log(URL.createObjectURL(file.raw))// base64编码
    //   this.joinUs.activity=this.joinUs.activity+res.data.url+";"
    //   this.imageurl15=file.url
    //   console.log(res.data.url)
    //   console.log(this.joinUs.activity)
    //   // console.log(this.productVo.firstImage)
    // },
    handleAvatarSuccess33(res, file) {
      // console.log(res)// 上传响应
      // console.log(URL.createObjectURL(file.raw))// base64编码
      this.imageurl16=file.url
      this.en1.imageUrl=res.data.url

      // console.log(this.productVo.firstImage)
    },

    // removeDataByIdCe(id){
    //   join.removeImageById(id).then(response=>{
    //     this.$message({
    //       type: 'success',
    //       message: '删除成功!'
    //     })
    //     // this.selectEnviron()
    //     this.reload()
    //   })
    //
    // },
    removeDataById1(id){
      // join.deleteJoinActivityById(id).then(response=>{
      //   this.$message({
      //     type: 'success',
      //     message: '删除成功!'
      //   })
      //   // this.selectEnviron()
      //   this.$router.push({path: '/join/save'})
      //   this.selectJoinActivity()
      // })
      this.joinActiv.forEach((item,i)=>{
        if(item.id==id){
          this.joinActiv.splice(i,1)
        }
      })

    },
    removeDataById(id){
      this.envir.forEach((item,index)=>{
        if(item.id==id){
          this.envir.splice(index, 1);
        }
      })
    },
    // saveImage(){
    //   this.$router.push({path: '/join/saveImage'})
    // },
    // handleRemove1(file, fileList) {
    //   for (const i in this.envir) {
    //     if (this.envir[i].key === file.uid) {
    //       this.envir.splice(i, 1)
    //     }
    //     // console.log(this.form.picList,"434")
    //   }
    // },
    // handlePictureCardPreview(file) { // 查看某张图片的原图
    //   this.dialogImageUrl = file.url
    //   this.dialogVisible = true
    // },

    handleSuccess(res, file) {
      // console.log(res)// 上传响应
      // console.log(URL.createObjectURL(file.raw))// base64编码
      this.joinUs.firstImage = res.data.url
      this.imageUrl = res.data.url
      // console.log(this.joinUs.firstImage)
    },
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt10M = file.size / 1024 / 1024 < 10

      if (!isJPG && !isPNG) {
        this.$message.error('上传图片只能是 JPG或 PNG 格式!')
      }
      if (!isLt10M) {
        this.$message.error('上传图片大小不能超过 10MB!')
      }
      return (isJPG || isPNG) && isLt10M
    },
    saveOrUpdate() {
      // join.addImage(en2).then(response=>{
      //   this.$message({
      //     type: 'success',
      //     message: '增加成功!'
      //   })
      this.deleteEnvironmentAll()
      this.envir.forEach(item=>{
        join.addImage(item).then(response=>{
      })})
      this.deleteActivityAll()
      this.joinActiv.forEach(item=>{
        join.addJoinActivity(item).then(response=>{

          // this.$router.push({path: '/join/list'})
        })
      })
      this.$message({
        type: 'success',
        message: '增加成功!'
      })
      this.updateJoinUs()
      this.$router.push({path: '/join/list'})


    },
    updateJoinUs() {
      join.updateJoinUs(this.joinUs)
        .then(response => {
          // 提示信息
          this.$message({
            type: 'success',
            message: '修改成功!'
          }).catch(e => {
            console.log(e)
          })
          // 回到列表页面 路由跳转
        })
      this.$router.push({path: '/join/list'})
    },

    getJoin() {
      join.getJoinUs().then(response => {
        this.joinUs = response.data.data
      })
    },
    selectEnviron() {
      join.selectEnvironmen().then(response => {
        this.environment = response.data.data
        this.environment.forEach((item)=>{
          this.envir.push(item)
        })
      })
    },
    deleteEnvironmentAll(){
      join.deleteEnvironmentAll().then(response=>{})
    },
    deleteActivityAll(){
      join.deleteActivityAll().then(response=>{})
    },
    cancel() {
      this.$router.push({path: '/join/list'})
    },

    onEditorReady(editor){},
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {} ,// 内容改变事件

  },


}

</script>

