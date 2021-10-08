import request from '@/utils/request'
import news from './news'
export default {
  getNewsListPage(page, limit, newsQuery) {
    return request({

      url: `/smartnews/news/selectAllCondition/${page}/${limit}`,
      method: 'post',
      data: newsQuery
    })
  },
  deleteNewsById(id) {
    return request({
      url: `/smartnews/news/delete/${id}`,
      method: 'delete'
    })
  },
  addNews(news) {
    return request({
      url: `/smartnews/news/addNews`,
      method: 'post',
      data: news
    })
  },
  selectNewsById(id) {
    return request({
      url: `/smartnews/news/selectNewsById/${id}`,
      method: 'get'
    })
  },
  updateNews(news) {
    return request({
      url: `/smartnews/news/updateNews`,
      method: 'post',
      data: news

    })
  },
  selectNewsFirstImage(){
    return request({
      url: `/smart/news-firstimage/selectNewsFirstImage`,
      method: 'get',
    })
  },
  updateNewsFirstImage(newsFirst){
    return request({
      url: `/smart/news-firstimage/updateNewsFirstImage`,
      method: 'post',
      data:newsFirst
    })
  }



}
