export class ResponseModel {
  success: boolean
  result: any
  code: number
  constructor(success: boolean, result: any, code: number) {
    this.success = success
    this.result = result
    this.code = code
  }
}
