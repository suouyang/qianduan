import request from '@/utils/request'
export default {
  selectCompanyInfo() {
    return request({

      url: `/smart/company-info/selectCompanyInfo`,
      method: 'get',

    })
  },
  selectCompanyInfoById(id){
    return request({
      url: `/smart/company-info/selectCompanyInfoBy/${id}`,
      method: 'get',
    })
  },
  updateCompanyInfo(company){
    return request({

      url: `/smart/company-info/updateCompanyInfo/`,
      method: 'post',
      data:company
    })
  },
  selectAllCompanyResults(){
    return request({
      url: `/smart/company-results/selectAllCompanyResults`,
      method: 'get',
    })
  },
  deleteCompanyResults(id){
    return request({
      url: `/smart/company-results/deleteCompanyResults/${id}`,
      method: 'delete',
    })
  },
  addComapnyResults(companyResults){
    return request({
      url: `/smart/company-results/addComapnyResults`,
      method: 'post',
      data:companyResults
    })
  },
  deleteAll(){
    return request({
      url: `/smart/company-results/deleteAll`,
      method: 'delete',
    })
  }

}
