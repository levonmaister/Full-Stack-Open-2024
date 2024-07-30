import axios from 'axios';
import {DiaryEntry} from './types';
const baseUrl = 'http://localhost:3000/api/diaries'


export const  getAllDiaries =  ()  => {
    return axios
    .get<DiaryEntry[]>(baseUrl)
    .then(response => response.data)
}

export const createDiary  = async (object: object) => {
    const response = await axios.post<DiaryEntry>(baseUrl, object);
    return response.data;
}

