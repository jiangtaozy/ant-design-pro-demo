/*
 * Created by jemo on 2018-6-29.
 * axios
 */

import axios from 'axios';
import { imgUrl, kehuId, kehuAppName } from '../common/config';

export const imgApi = axios.create({
  baseURL: imgUrl,
  data: {
    kefu_id: kehuId,
    kefu_app_name: kehuAppName,
  },
  timeout: 1000
});

