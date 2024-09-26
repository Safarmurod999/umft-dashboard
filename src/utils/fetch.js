import axios from "axios";
import { BASE_URL } from "../const/data";

export const getData = async (url, options) => {
  const res = await axios.get(`${BASE_URL}/${url}`, options);
  return res.data;
};

export const postData = async (url, data, options) => {
  const res = await axios.post(`${BASE_URL}/${url}`, data, options);
  return res.data;
};

export const putData = async (url, data, options) => {
  const res = await axios.put(`${BASE_URL}/${url}`, data, options);
  return res.data;
};

export const deleteData = async (url, options) => {
  const res = await axios.delete(`${BASE_URL}/${url}`, options);
  return res.data;
};

import { useEffect, useState } from "react";
const useFetch = (url, options) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [callback, setCallback] = useState(false);
  const [error, setError] = useState(null);
  const recall = () => {
    setCallback(!callback);
  };
  const getData = async () => {
    fetch(`${BASE_URL}${url}`, {
      headers: { Authorization: `Bearer ${options}` },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    setLoading(true);
    getData();
  }, [url, callback]);
  return { data, loading, recall };
};

export default useFetch;
