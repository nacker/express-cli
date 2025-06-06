const Result = require('./result');

class BaseController {
  constructor() {
    this.success = this.success.bind(this);
    this.error = this.error.bind(this);
    this.successResponse = this.successResponse.bind(this);
    this.errorResponse = this.errorResponse.bind(this);
  }

  // 基础成功响应
  success(res, data, message = '操作成功', code = 200) {
    return this.successResponse(res, Result.success(data));
  }

  // 基础错误响应
  error(res, message = '操作失败', code = 400, data = null) {
    return this.errorResponse(res, Result.error(code, message));
  }

  // 可扩展的成功响应方法
  successResponse(res, responseObj) {
    return res.status(responseObj.code || 200).json({
      success: true,
      ...responseObj
    });
  }

  // 可扩展的错误响应方法
  errorResponse(res, responseObj) {
    return res.status(responseObj.code || 400).json({
      success: false,
      ...responseObj
    });
  }
}

module.exports = BaseController;