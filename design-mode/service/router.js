const { handleFileOperation } = require('./utils')
const { Router } = require('express')
const router = Router()

router.get('/get_list', (req, res, next) => {
  handleFileOperation('data.json', data => {
    res.send({
      code: 200,
      success: true,
      data
    })
    return data
  })
})

router.post('/add_todo', (req, res, next) => {
  const { body } = req
  handleFileOperation('data.json', data => {
    data.push(body)

    res.send({
      code: 200,
      success: true,
      msg: '添加成功！',
      data: body
    })

    return data
  }, 'write')
})

router.post('/remove_todo', (req, res, next) => {
  handleFileOperation('data.json', data => {
    const { id } = req.body

    res.send({
      code: 200,
      msg: '删除成功！',
      success: true,
      data
    })

    return data.filter(item => item.id !== id)
  }, 'write')
})

router.post('/change_todo', (req, res, next) => {
  const { id } = req.body

  handleFileOperation('data.json', data => {
    data.forEach(item => {
      if (item.id === id) {
        item.completed = !item.completed
      }
    })

    res.send({
      code: 200,
      msg: '修改状态成功！',
      success: true
    })

    return data
  }, 'write')
})

module.exports = router
