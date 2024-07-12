import request from '@/utils/myrequest'
// 获取列表
export function getList(params) {
  return request({
    url: '/api/article',
    method: 'get',
    params
  })
}
// 定义删除接口
export function deletePosts(data) {
  return request({
    url: '/api/article/' + data.id + '/',
    method: 'delete'
  })
}
// 定义修改编辑接口
export function updatePosts(data) {
  return request({
    url: '/api/article/' + data.id + '/',
    method: 'put',
    data
  })
}
// 定义新增接口
export function addPosts(data) {
  return request({
    url: '/api/article/',
    method: 'post',
    data
  })
}

// export function postpicture(data) {
//   return request({
//     url:'/api'
//   })
// }
