import request from '@/utils/request'
export default {
  selectAllCategory() {
    return request({
      url: `/smart/recruitmentinfo-category/selectAllCategory`,
      method: 'get'
    })
  },
  selectCategoryById(id){
    return request({
      url: `/smart/recruitmentinfo-category/selectCategoryById/${id}`,
      method: 'get'
    })
  },
  deleteCategoryById(id){
    return request({
      url: `/smart/recruitmentinfo-category/deleteCategoryById/${id}`,
      method: 'delete'
    })
  },
  updateCategory(category){
    return request({
      url: `/smart/recruitmentinfo-category/updateCategory`,
      method: 'post',
      data:category
    })
  },
  addCategory(category){
    return request({
      url: `/smart/recruitmentinfo-category/addCategory`,
      method: 'post',
      data:category
    })
  }

}
