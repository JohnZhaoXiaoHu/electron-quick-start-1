import { formatTime } from '../utils/util'

/**
 * 存储路径:
 * app.getPath('userData')\AppData\Roaming\app-name\config.json
 */
class Config {
  static _instance: any
  store: any
  static getInstance() {
    if (!this._instance)
      this._instance = new Config()
    return this._instance
  }

  constructor() {
    console.log('Config')
    const schema = {
      debug: {
        type: 'boolean',
        default: false,
      },
      cwd: {
        type: 'string',
        default: '',
      },
    }
    const _Store = require('electron-store')
    this.store = new _Store(/* { schema } */)
    this.store.set('launch_time', formatTime(new Date()))
    console.log('config path: ', this.store.path)
    this._init()
    console.log('config data: ', this.store.store)
  }

  _init() {
    this._setDefaultValue('debug', false)
    this._setDefaultValue2('cwd', process.cwd(), true)
  }

  _setDefaultValue(key: string, value: any) {
    if (!this.has(key))
      this.set(key, value)
  }

  _setDefaultValue2(key: string, value: any, resetFlag: boolean) {
    if (resetFlag || !this.has(key))
      this.set(key, value)
  }

  isDebug() {
    return this.get('debug', false)
  }

  set(key: string, value: any) {
    this.store.set(key, value)
  }

  get(key: string, defaultValue: any) {
    return this.store.get(key, defaultValue)
  }

  has(key: string) {
    return this.store.has(key)
  }

  delete(key: string) {
    this.store.delete(key)
  }

  clear() {
    this.store.clear()
  }
}

export {
  Config,
}
