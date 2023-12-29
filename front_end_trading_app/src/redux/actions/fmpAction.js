import axios from "axios";
import * as actionTypes from "../types";

const apiKey = `521d75be66f700de47374352a721107a`;

export const getProfile = (symbol) => (dispatch) => {
  const url = `https://financialmodelingprep.com/api/v3/company/profile/${symbol}`;

  axios
    .get(url, {
      params: {
        apikey: apiKey
      }
    })
    .then((res) => {
      dispatch({
        type: actionTypes.GET_COMPANY_PROFILE,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};