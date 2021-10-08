import request from '@/utils/request'

export default {
  getProductListPage(page, limit, productQuery) {
    return request({

      url: `/smart/product-info/selectAllCondition/${page}/${limit}`,
      method: 'post',
      data: productQuery
    })
  },
  deleteProductById(id) {
    return request({
      url: `/smart/product-info/deleteById/${id}`,
      method: 'delete'
    })
  },
  addProduct(productVo) {
    return request({
      url: `/smart/product-info/addProduct`,
      method: 'post',
      data: productVo
    })
  },
  selectProductById(id) {
    return request({
      url: `/smart/product-info/selectById/${id}`,
      method: 'get'

    })
  },
  updateProduct(productVo) {
    return request({
      url: `/smart/product-info/updateById`,
      method: 'post',
      data: productVo
    })
  },

  selectProductPicture(id){
    return request({
      url: `/smart/product-picture/selectProductPicture/${id}`,
      method: 'get',
    })
  },
  deleteProductPictureById(id){
    return request({
      url: `/smart/product-picture/deleteProductPictureById/${id}`,
      method: 'delete',
    })
  },
  addProductPicture(productPicture){
    return request({
      url: `/smart/product-picture/addProductPicture`,
      method: 'post',
      data:productPicture
    })
  },
  updateProductPicture(productPicture){
    return request({
      url: `/smart/product-picture/updateProductPicture`,
      method: 'post',
      data:productPicture
    })
  },
  selectImageByPpid(id) {
    return request({
      url: `/smart/product-applicationimage/selectImageByPpid/${id}`,
      method: 'get',
    })
  },
  deleteImageSingle(id){
    return request({
      url: `/smart/product-applicationimage/deleteImageSingle/${id}`,
      method: 'delete',
    })
  },
  addImage(productApplicationimage){
    return request({
      url: `/smart/product-applicationimage/addImage`,
      method: 'post',
      data:productApplicationimage
    })
  },
  selectProductParameter(id){
    return request({
      url: `/smart/product-parameter/selectProductParameter/${id}`,
      method: 'get',
    })

  },
  deleteProductParameter(id){
    return request({
      url: `/smart/product-parameter/deleteProductParameter/${id}`,
      method: 'delete',
    })
  },
  updateProductParameter(productParameter){
    return request({
      url: `/smart/product-parameter/updateProductParameter`,
      method: 'post',
      data:productParameter
    })
  },
  addProductParameter(productParameter){
    return request({
      url: `/smart/product-parameter/addProductParameter`,
      method: 'post',
      data:productParameter
    })
  },
  deleteAllProductPicture(id){
    return request({
      url: `/smart/product-parameter/deleteAllProductPicture/${id}`,
      method: 'delete',
    })
  }





}
