// copy from -> https://www.cnblogs.com/kreo/p/11069640.html
// import命令接受一对大括号，里面指定要从其他模块导入的变量名，必须与被导入模块 src/types/index.ts 对外接口的名称相同
// import后的from 可以指定需要导入模块的路径名，可以是绝对路径，也可以是相对路径,其【.js】路径可以省略，
// 如果只有模块名，不带有路径，需要有配置文件指定.
// 可以看出，使用export时，import语句需要使用大括号
// 可以看出，使用export default时，import语句不用使用大括号

import { AxiosRequestConfig, AxiosStatic } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/utils'
import defaults from './defaults'
import mergeConfig from './core/mergeConfig'
import CancelToken from './cancel/CancelToken'
import Cancel, { isCancel } from './cancel/Cancel'

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)
  return instance as AxiosStatic
}

const axios = createInstance(defaults)

axios.create = function create(config) {
  return createInstance(mergeConfig(defaults, config))
}

axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel

axios.all = function all(promises) {
  return Promise.all(promises)
}

axios.spread = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr)
  }
}

axios.Axios = Axios

export default axios
