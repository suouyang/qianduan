import request from '@/utils/request'
export default {
  selectCategory() {
    return request({
      url: `/smart/product-category/selectCategory`,
      method: 'get'
    })
  },
  deleteCategoryById(id){
    return request({
      url: `/smart/product-category/deleteCategoryById/${id}`,
      method: 'delete'
    })

  },
  updateCategory(category) {
    return request({
      url: `/smart/product-category/updateCategory`,
      method: 'post',
      data: category
    })
  },
    addCategory(category){
      return request({
        url: `/smart/product-category/addCategory`,
        method: 'post',
        data:category
      })
    },
  selectCategoryById(id){
    return request({
      url: `/smart/product-category/selectCategoryById/${id}`,
      method: 'get'
    })
  }




}
