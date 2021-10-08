import request from '@/utils/request'
export default {
  upload() {
    return request({
      url: `/upload/file`,
      method: 'post'
    })
  }
}
