import request from '@/utils/request'
export default {
  selectCategory() {
    return request({
      url: `/smartnews/news-category/selectCategory`,
      method: 'get'
    })
  },
  deleteCategory(id) {
    return request({
      url: `/smartnews/news-category/deleteCategory/${id}`,
      method: 'delete'
    })
  },
  updateCategory(category){
    return request({
      url: `/smartnews/news-category/updateCategory`,
      method: 'post',
      data:category
    })
  },
  addCategory(category){
    return request({
      url: `/smartnews/news-category/addCategory`,
      method: 'post',
      data:category
    })
  },
  selectCategoryById(id){
    return request({
      url: `/smartnews/news-category/selectCategoryById/${id}`,
      method: 'get'
    })
  }

}
