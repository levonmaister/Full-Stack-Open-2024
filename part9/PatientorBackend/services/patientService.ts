import {Patients}  from '../data/patients';
import { NewPatientEntry, Patient } from '../types';
import { v1 as uuid } from 'uuid'
//import {Gender} from '../types'



export const getPatients = (): Patient[] => {
    return Patients.map(({id, name,gender, occupation, ssn, dateOfBirth, entries}) => ({
        id,
        name,
        gender,
        occupation,
        ssn,
        dateOfBirth,
        entries,
    }));
};


export const addPatient = (entry: NewPatientEntry): Patient => {
  

    const newPatientEntry = {
        id: uuid(),
        ...entry
      };

    Patients.push(newPatientEntry)
    return newPatientEntry
};


export const getPatient = (id: string): Patient  => {
  const OurPatient = Patients.filter(patient => patient.id === id);
  console.log(OurPatient)
  return OurPatient[0];
}

export default {
getPatients,
  addPatient,
  getPatient
};