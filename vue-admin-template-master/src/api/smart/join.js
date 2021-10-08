import request from '@/utils/request'
export default {
  getJoinUs() {
    return request({
      url: `/smart/join-us/selectJoin`,
      method: 'get',
    })
  },
  selectJoinById(id) {
    return request({
      url: `/smart/join-us/selectJoin/${id}`,
      method: 'get',
    })
  },
  updateJoinUs(joinUs) {
    return request({
      url: `/smart/join-us/updateJoinUs`,
      method: 'post',
      data:joinUs

    })
  },
  selectEnvironmen() {
    return request({
      url: `/smart/office-environment/selectEnvironmen`,
      method: 'get',
    })
  },
  removeImageById(id){
    return request({
      url: `/smart/office-environment/removeImage/${id}`,
      method: 'delete',
    })
  },
  selectImageById(id){
    return request({
      url: `/smart/office-environment/selectImageById/${id}`,
      method: 'get',
    })
  },
  updateImage(environmentImage){
    return request({
      url: `/smart/office-environment/updateImage`,
      method: 'post',
      data:environmentImage
    })
  },
  addImage(environmentImage){
    return request({
      url: `/smart/office-environment/addImage`,
      method: 'post',
      data:environmentImage
    })
  },
  selectJoinActivity(){
    return request({
      url: `/smart/join-activity/selectJoinActivity`,
      method: 'get',
    })
  },
  selectJoinActivityById(id){
    return request({
      url: `/smart/join-activity/selectJoinActivityById/${id}`,
      method: 'get',
    })
  },
  deleteJoinActivityById(id){
    return request({
      url: `/smart/join-activity/deleteJoinActivityById/${id}`,
      method: 'delete',
    })
  },
  updateJoinActivity(joinActivity){
    return request({
      url: `/smart/join-activity/updateJoinActivity`,
      method: 'post',
      data:joinActivity
    })
  },
  addJoinActivity(joinActivity){
    return request({
      url: `/smart/join-activity/addJoinActivity`,
      method: 'post',
      data:joinActivity
    })
  },
  deleteEnvironmentAll(){
    return request({
      url: `/smart/office-environment/deleteEnvironmentAll`,
      method: 'delete',
    })
  },
  deleteActivityAll(){
    return request({
      url: `/smart/join-activity/deleteActivityAll`,
      method: 'delete',
    })
  }





}
