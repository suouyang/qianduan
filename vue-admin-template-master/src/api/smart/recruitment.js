import request from '@/utils/request'
export default {
  selectAll() {
    return request({
      url: `/smart/recruitment-info/selectrecruitmentInfo`,
      method: 'get'
    })
  },
  deleteRecruitmentById(id) {
    return request({
      url: `/smart/recruitment-info/deleterecruitmentInfo/${id}`,
      method: 'delete'
    })
  },
  addRecruitment(recruitment) {
    return request({
      url: `/smart/recruitment-info/addrecruitmentInfo`,
      method: 'post',
      data: recruitment
    })
  },
  updateRecruitment(recruitment) {
    return request({
      url: `/smart/recruitment-info/updaterecruitmentInfo/`,
      method: 'post',
      data: recruitment
    })
  },
  selectRecruitmentById(id) {
    return request({
      url: `/smart/recruitment-info/selectrecruitmentInfoById/${id}`,
      method: 'get'
    })
  },
  selectAllCondition(page,limit,recruQuery){
    return request({
      url: `/smart/recruitment-info/selectAllCondition/${page}/${limit}`,
      method: 'post',
      data:recruQuery
    })
  }

}

