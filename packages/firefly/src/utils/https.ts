import request from 'request'
import {CheckIn} from '../types/index'
export const signInApi = ({ check_url, url, cookie }:CheckIn) => {
  request(
    check_url,
    {
      method: 'post',
      headers: {
        Referer: url,
        Cookie: cookie
      }
    },
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body)
      }
    }
  )
}
