/*
 * @Author: xujun
 * @Date: 2020-04-17 11:23:47
 * @LastEditTime: 2020-04-20 09:40:52
 * @LastEditors: xujun
 * @FilePath: /vue-next-practice/vue.config.js
 * @Description: vue 配置
 */
const path = require('path')
const axios = require('axios')
const bodyParser = require('body-parser')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'src': resolve('src'),
        'common': resolve('src/common'),
      }
    }
  },

  devServer: {
    // before(app) {
    //   app.use(bodyParser.urlencoded({extended: true}))
    //   // const querystring = require('querystring')

    //   app.get('/api/getDiscList', function (req, res) {
    //     const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
    //     axios.get(url, {
    //       headers: {
    //         referer: 'https://c.y.qq.com/',
    //         host: 'c.y.qq.com'
    //       },
    //       params: req.query
    //     }).then((response) => {
    //       res.json(response.data)
    //     }).catch((e) => {
    //       console.log(e)
    //     })
    //   })

    //   app.get('/api/getCdInfo', function (req, res) {
    //     const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
    //     axios.get(url, {
    //       headers: {
    //         referer: 'https://c.y.qq.com/',
    //         host: 'c.y.qq.com'
    //       },
    //       params: req.query
    //     }).then((response) => {
    //       let ret = response.data
    //       if (typeof ret === 'string') {
    //         const reg = /^\w+\(({.+})\)$/
    //         const matches = ret.match(reg)
    //         if (matches) {
    //           ret = JSON.parse(matches[1])
    //         }
    //       }
    //       res.json(ret)
    //     }).catch((e) => {
    //       console.log(e)
    //     })
    //   })

    //   app.get('/api/lyric', function (req, res) {
    //     const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'

    //     axios.get(url, {
    //       headers: {
    //         referer: 'https://c.y.qq.com/',
    //         host: 'c.y.qq.com'
    //       },
    //       params: req.query
    //     }).then((response) => {
    //       let ret = response.data
    //       if (typeof ret === 'string') {
    //         const reg = /^\w+\(({.+})\)$/
    //         const matches = ret.match(reg)
    //         if (matches) {
    //           ret = JSON.parse(matches[1])
    //         }
    //       }
    //       res.json(ret)
    //     }).catch((e) => {
    //       console.log(e)
    //     })
    //   })

    //   app.post('/api/getPurlUrl', bodyParser.json(), function (req, res) {
    //     const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
    //     axios.post(url, req.body, {
    //       headers: {
    //         referer: 'https://y.qq.com/',
    //         origin: 'https://y.qq.com',
    //         'Content-type': 'application/x-www-form-urlencoded'
    //       }
    //     }).then((response) => {
    //       res.json(response.data)
    //     }).catch((e) => {
    //       console.log(e)
    //     })
    //   })
    // },
    proxy: {
      '/api': {
        target: 'http://ustbhuangyi.com/music/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },

  assetsDir: 'static'
}