<template>
  <div>
    <el-form ref="company" :model="this.company" label-width="80px">
      <el-form-item label="公司名字">
        <el-input v-model="company.name"/>
      </el-form-item>
      <el-form-item label="公司地址">
        <el-input v-model="company.address"/>
      </el-form-item>
      <el-form-item label="公司电话">
        <el-input v-model="company.phone"/>
      </el-form-item>
      <el-form-item label="公司介绍">
        <textarea cols="70" rows="10"  v-model="company.introduction"/>
      </el-form-item>

      <el-form-item label="视频封面">
        <el-upload
          :show-file-list="false"
          :on-success="handleSuccess"
          :before-upload="beforeAvatarUpload"
          :action="BASE_API+'/upload/file'"
          class="avatar-uploader">
          <img v-if="imageUrl!=null" :src="company.videoImage" width="200" height="150">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item >
      <el-form-item label="视频">
      <el-upload class="avatar-uploader"
                 :action="BASE_API+'/upload/file'"
                 v-bind:on-progress="uploadVideoProcess"
                 v-bind:on-success="handleVideoSuccess"
                 v-bind:before-upload="beforeUploadVideo"
                 v-bind:show-file-list="false">
        <video v-if="company.videoUrl!='' && !videoFlag"
               v-bind:src="company.videoUrl"
               width="300px" height="200px"
               class="avatar video-avatar"
               controls="controls">
          您的浏览器不支持视频播放
        </video>
        <i v-else-if="company.videoUrl=='' && !videoFlag"
           class="el-icon-plus avatar-uploader-icon"></i>
        <el-progress v-if="videoFlag == true"
                     type="circle"
                     v-bind:percentage="videoUploadPercent"
                     style="margin-top:7px;"></el-progress>
      </el-upload>
      </el-form-item>
      <el-form-item label="发展方向">
        <el-input v-model="company.development"/>
      </el-form-item>
      <el-form-item label="发展方向内容" cols="20" rows="10">
        <textarea cols="70" rows="8"  v-model="company.developmentContent"/>
      </el-form-item>
      <el-form-item label="5G网联车发展内容">
        <textarea cols="70" rows="10" v-model="company.networkingContent"/>
      </el-form-item>
      <el-form-item label="5G网联车图片">
        <el-upload
          :show-file-list="false"
          :on-success="handleSuccess2"
          :before-upload="beforeAvatarUpload"
          :action="BASE_API+'/upload/file'"
          class="avatar-uploader">
          <img v-if="imageUrl1!=null" :src="company.networkingImage" width="200" height="150">
          <i class="el-icon-plus"></i>
        </el-upload>
        </el-form-item>
      <div style="margin-left: 80px">
        <el-button type="primary"  icon="el-icon-save" @click="submitDisappear()">添加</el-button>
        <el-dialog title="图片"  :visible.sync="dialogFormVisible">
          <el-form  :model="re">
            <el-form-item label="图片" >
              <el-upload
                :on-success="handleAvatarSuccess11"
                :before-upload="beforeAvatarUpload"
                :show-file-list="false"
                :action="BASE_API+'/upload/file'"
                class="avatar-uploader">
                <img v-if="imageurl15!=null" :src="re.imageUrl" width="200" height="200" >
                <i v-else class="el-icon-plus avatar-uploader-icon"/>
              </el-upload>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitImage()">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <el-form-item label="研发成果">
        <el-table
          :data="this.companyResu"
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
          <el-table-column label="图片" width="220px" >
            <template width="90"  slot-scope="scope">
              <img style="width:100px;height:100px;border:none;" :src="scope.row.imageUrl">-->
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="200px" >
            <template slot-scope="scope">
              <el-button type="danger" size="mini" icon="el-icon-delete" style="width: 73px"  @click="removeDataById(scope.row.id)">删除</el-button>

              <el-button type="primary" size="mini" icon="el-icon-save" @click="submitDisappear()">添加</el-button>
              <el-dialog title="图片"  :visible.sync="dialogFormVisible">
                <el-form  :model="re">
                  <el-form-item label="图片" >
                    <el-upload
                      :on-success="handleAvatarSuccess11"
                      :before-upload="beforeAvatarUpload"
                      :show-file-list="false"
                      :action="BASE_API+'/upload/file'"
                      class="avatar-uploader">
                      <img v-if="imageurl15!=null" :src="re.imageUrl" width="200" height="200" >
                      <i v-else class="el-icon-plus avatar-uploader-icon"/>
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
      </el-form-item>
<!--      <el-form-item>-->
<!--        <el-button type="text" @click="submitDisappear()">添加</el-button>-->
<!--        <el-dialog title="图片"  :visible.sync="dialogFormVisible">-->
<!--          <el-form  :model="re">-->
<!--            <el-form-item label="图片" >-->
<!--              <el-upload-->
<!--                :on-success="handleAvatarSuccess11"-->
<!--                :before-upload="beforeAvatarUpload"-->
<!--                :show-file-list="false"-->
<!--                :action="BASE_API+'/upload/file'"-->
<!--                class="avatar-uploader">-->
<!--                <img v-if="imageurl15!=null" :src="re.imageUrl" width="200" height="200" >-->
<!--                <i v-else class="el-icon-plus avatar-uploader-icon"/>-->
<!--              </el-upload>-->
<!--            </el-form-item>-->
<!--          </el-form>-->
<!--          <div slot="footer" class="dialog-footer">-->
<!--            <el-button @click="dialogFormVisible = false">取 消</el-button>-->
<!--            <el-button type="primary" @click="submitImage()">确 定</el-button>-->
<!--          </div>-->
<!--        </el-dialog>-->

<!--      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" @click="Update()">确认修改</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>
<script>
import companyInfo from '@/api/smart/company'
import Vue from 'vue'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import {v4 as uuidv4} from "uuid";
export default {
inject:['reload'],
  data() {
    return {
      company: {
        name: '',
        address:'',
        phone:'',
        videoUrl:'',
        videoImage:'',
        introduction:'',
        development:'',
        networkingContent:'',
        networkingImage:'',
        developmentContent:'',
        postCode:''
      },
      companyResults:[],
      companyResu:[],
      List:[],
      dialogImageUrl:'',
      dialogVisible:false,
      re2:{
        imageUrl:''
      },
      re:{
        imageUrl:''
      },
      imageUrl:'',
      imageUrl1:'',
      imageurl15:'',
      videoFlag: false,
      //是否显示进度条
      videoUploadPercent: "",
      //进度条的进度，
      isShowUploadVideo: false,
      //显示上传按钮
      BASE_API: process.env.BASE_API, // 接口API地址,
      dialogFormVisible:false,
    }
  },
  computed: {
  },
  created() {
    this.init()
    this.selectAllCompanyResults()
  },
  methods: {
    init() {
      // 判断路径有id值,做修改
      if (this.$route.params && this.$route.params.id) {
        // 从路径获取id值
        const id = this.$route.params.id
        console.log(id)
        // 调用根据id查询的方法
        this.selectById(id)
      }
    },
    handlePictureCardPreview(file) { // 查看某张图片的原图
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleRemove1(file, fileList) {
      for (const i in this.List) {
        if (this.List[i].key === file.uid) {
          this.List.splice(i, 1)
        }
        // console.log(this.form.picList,"434")
      }
    },
    handleSuccess(res, file) {
      // console.log(res)// 上传响应
      // console.log(URL.createObjectURL(file.raw))// base64编码
      this.company.videoImage = res.data.url
      this.imageUrl=res.data.url
      // console.log(this.newsInfo.image)
    },
    handleSuccess2(res, file) {
      // console.log(res)// 上传响应
      // console.log(URL.createObjectURL(file.raw))// base64编码
      this.company.networkingImage = res.data.url
      this.imageUrl1=res.data.url
      console.log()
      // console.log(this.newsInfo.image)
    },
    //上传前回调
    beforeUploadVideo(file) {
      var fileSize = file.size / 1024 / 1024 < 120;
      if (['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb', 'video/mov'].indexOf(file.type) == -1) {
        this.$message.error("视频格式不正确")
        return false;
      }
      if (!fileSize) {
        this.$message.error("视频大小为120MB")
        return false;
      }
      this.isShowUploadVideo = false;
    },
    //进度条
    uploadVideoProcess(event, file, fileList) {
      this.videoFlag = true;
      this.videoUploadPercent = file.percentage.toFixed(0) * 1;
    },
    //上传成功回调
    handleVideoSuccess(res, file) {
      this.isShowUploadVideo = true;
      this.videoFlag = false;
      this.videoUploadPercent = 0;
      this.company.videoUrl=res.data.url
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt10M = file.size / 1024 / 1024 < 10

      if (!isJPG && !isPNG) {
        this.$message.error('上传图片只能是 JPG或PNG 格式!')
      }
      if (!isLt10M) {
        this.$message.error('上传图片大小不能超过 10MB!')
      }
      return (isJPG||isPNG) && isLt10M
    },
    Update() {
      this.updateCompany()
      this.addAll()
    },
    updateCompany() {
      // console.log(this.company)
      companyInfo.updateCompanyInfo(this.company)
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
      this.$router.push({ path: '/company/list' })
    },
    cancel() {
      this.$router.push({ path: '/company/list' })
    },
    selectById(id) {
      companyInfo.selectCompanyInfoById(id).then(response => {
        this.company = response.data.data

        console.log(this.company)
      })
    },
    selectAllCompanyResults(){
      companyInfo.selectAllCompanyResults().then(response=>{
        this.companyResults=response.data.data
        console.log(this.companyResults)
        this.companyResults.forEach(item=>{
          this.companyResu.push(item)
      })
    })},
    removeDataById(id){
      console.log(id)
      this.companyResu.forEach((item,i)=>{
        if(item.id==id){
          this.companyResu.splice(i, 1)
        }
      })

    },
    submitDisappear(){
      this.dialogFormVisible = true
      this.re={}
    },
    submitImage() {
      this.dialogFormVisible = false
      this.re2.imageUrl=this.re.imageUrl
      this.companyResu.push(this.re2)
      this.companyResu.forEach(item=>{
        console.log(item)
      })
    },
    handleAvatarSuccess11(res, file) {
      // console.log(res)// 上传响应
      // console.log(URL.createObjectURL(file.raw))// base64编码
      this.re.imageUrl= res.data.url
      this.imageurl15=file.url
      // console.log(this.productVo.firstImage)
    },
    addAll(){
      companyInfo.deleteAll().then(response=>{})
      this.companyResu.forEach(item=>{
         companyInfo.addComapnyResults(item).then(response=>{
          this.$message({
            type: 'success',
            message: '修改成功!'
          })

        })
      })

      console.log(this.companyResults)
    }


  }

}
</script>

