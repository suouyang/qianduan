import request from '@/utils/request'
export default {
  selectImageByPpid(id){
    return request({
      url: `/smart/product-applicationimage/selectImageByPpid/${id}`,
      method: 'post',
    })
  },
  deleteImageById(id){
    return request({
      url: `/smart/product-applicationimage/deleteImageById/${id}`,
      method: 'post',
    })
  },
  updateImageById(appli){
    return request({
      url: `/smart/product-applicationimage/updateImageById`,
      method: 'post',
      data:appli
    })
  },
  addImage(appli){
    return request({
      url: `/smart/product-applicationimage/addImage`,
      method: 'post',
      data:appli
    })
  }
}
