"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPatient = exports.addPatient = exports.getPatients = void 0;
const patients_1 = require("../data/patients");
const uuid_1 = require("uuid");
//import {Gender} from '../types'
const getPatients = () => {
    return patients_1.Patients.map(({ id, name, gender, occupation, ssn, dateOfBirth, entries }) => ({
        id,
        name,
        gender,
        occupation,
        ssn,
        dateOfBirth,
        entries,
    }));
};
exports.getPatients = getPatients;
const addPatient = (entry) => {
    const newPatientEntry = Object.assign({ id: (0, uuid_1.v1)() }, entry);
    patients_1.Patients.push(newPatientEntry);
    return newPatientEntry;
};
exports.addPatient = addPatient;
const getPatient = (id) => {
    const OurPatient = patients_1.Patients.filter(patient => patient.id === id);
    console.log(OurPatient);
    return OurPatient[0];
};
exports.getPatient = getPatient;
exports.default = {
    getPatients: exports.getPatients,
    addPatient: exports.addPatient,
    getPatient: exports.getPatient
};
