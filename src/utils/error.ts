/**
 * 自定義錯誤類，繼承自標準的 Error 類別
 *
 * @class CustomError
 * @extends {Error}
 */
export class CustomError extends Error {
  /**
   * 創建一個自定義錯誤實例
   *
   * @param {string} name - 錯誤類型名稱
   * @param {string} message - 錯誤訊息
   */
  constructor(name: string, message: string) {
    super(message);
    this.name = name;
    // 修正原型鏈，讓 instanceof 正常
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * 自定義錯誤類，表示螢幕寬度錯誤
 *
 * @class ScreenWidthError
 * @extends {CustomError}
 */
export class ScreenWidthError extends CustomError {
  /**
   * 創建一個螢幕寬度錯誤實例
   *
   * @param {number} width - 最小寬度
   */
  constructor(width: number) {
    super("ScreenWidthError", `請使用寬度超過 ${width}px 的裝置或將視窗放大，以使用此應用程式。`);
    // 修正原型鏈，讓 instanceof 正常
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
