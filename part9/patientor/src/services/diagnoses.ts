import axios from "axios";
import { Diagnosis } from "../types";

import { apiBaseUrl } from "../constants";

const getAllDiagnoses = async () => {
  console.log('GETTING: ',`${apiBaseUrl}/diagnoses` )
  const { data } = await axios.get<Diagnosis[]>(
    `${apiBaseUrl}/diagnoses`
  );

  return data;
};




export default {
  getAllDiagnoses
};

