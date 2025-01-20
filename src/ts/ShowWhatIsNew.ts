import { lang } from './Lang'
import { Config } from './Config'
import { msgBox } from './MsgBox'
import { EVT } from './EVT'
import { setSetting, settings } from './setting/Settings'

// 显示最近更新内容
class ShowWhatIsNew {
  constructor() {
    this.bindEvents()
  }

  private flag = '4.5.0'

  private bindEvents() {
    window.addEventListener(EVT.list.settingInitialized, () => {
      // 消息文本要写在 settingInitialized 事件回调里，否则它们可能会被翻译成错误的语言
      let msg = `<strong>${lang.transl('_新增功能')}: ${lang.transl(
        '_抓取关注的所有用户的投稿'
      )}</strong>
      <br>
      ${lang.transl('_你可以在首页和关注的创作者页面里使用此功能')}
      <br>
      <br>
      ${lang.transl('_修复已知问题')}`

      // <strong>${lang.transl('_新增设置项')}: ${lang.transl(
      //   '_非图片的命名规则'
      // )}</strong>

      // ${lang.transl('_新增非图片命名规则的说明')}

      // 在更新说明的下方显示赞助提示
      msg += `
      <br>
      <br>
      ${lang.transl('_赞助方式提示')}`

      this.show(msg)
    })
  }

  private show(msg: string) {
    if (settings.whatIsNewFlag !== this.flag) {
      msgBox.show(msg, {
        title: Config.appName + ` ${lang.transl('_最近更新')}`,
        btn: lang.transl('_我知道了'),
      })
      setSetting('whatIsNewFlag', this.flag)
    }
  }
}

new ShowWhatIsNew()
