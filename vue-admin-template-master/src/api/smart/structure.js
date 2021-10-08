import request from '@/utils/request'
export default {
  selectAll() {
    return request({
      url: `/smart/organizational-structure/selectAll`,
      method: 'get'
    })
  },

  updateStructure(organizationalStructure) {
    return request({
      url: `/smart/organizational-structure/updateOrganizationalStructure`,
      method: 'post',
      data: organizationalStructure
    })
  },
  selectById(id) {
    return request({
      url: `/smart/organizational-structure/selectById/${id}`,
      method: 'get'
    })
  },
  selectOrgnizationalFirstImage(){
    return request({
      url: `/smart/orgnizational-firstimage/selectOrgnizationalFirstImage`,
      method: 'get'
    })
  },
  updateOrgnizationalFirstImage(firstImage){
    return request({
      url: `/smart/orgnizational-firstimage/updateOrgnizationalFirstImage`,
      method: 'post',
      data:firstImage
    })
  },
  deleteOrganizationalStructureById(id){
    return request({
      url: `/smart/organizational-structure/deleteOrganizationalStructureById/${id}`,
      method: 'delete',
    })
  },
  addOrganizationalStructure(organizationalStructure){
    return request({
      url: `/smart/organizational-structure/addStructure`,
      method: 'post',
      data:organizationalStructure
    })
  }

}
