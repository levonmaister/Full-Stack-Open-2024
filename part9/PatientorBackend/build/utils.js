"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const isGender = (param) => {
    return Object.values(types_1.Gender).map(v => v.toString()).includes(param);
};
const parseGender = (gender) => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect weather: ' + gender);
    }
    return gender;
};
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDate = (date) => {
    if (!isString(date) || !isDate(date)) {
        throw new Error('Incorrect date: ' + date);
    }
    return date;
};
const parseName = (name) => {
    if (!isString(name)) {
        throw new Error('Incorrect name: ' + name);
    }
    return name;
};
const parseOccupation = (occupation) => {
    if (!isString(occupation)) {
        throw new Error('Incorrect occupation: ' + occupation);
    }
    return occupation;
};
const parseSSN = (ssn) => {
    if (!isString(ssn)) {
        throw new Error('Incorrect ssn: ' + ssn);
    }
    return ssn;
};
function parseEntry(_data) {
    return {};
}
const toNewPatientEntry = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('entries' in object && 'name' in object && 'gender' in object && 'occupation' in object && 'ssn' in object && 'dateOfBirth' in object) {
        if (!object.name || !object.ssn || !object.occupation) {
            throw new Error('Incorrect data: a field missing');
        }
        const newPatient = {
            name: parseName(object.name),
            occupation: parseOccupation(object.occupation),
            gender: parseGender(object.gender),
            ssn: parseSSN(object.ssn),
            dateOfBirth: parseDate(object.dateOfBirth),
            entries: parseEntry(object.entries)
        };
        return newPatient;
    }
    throw new Error('Incorrect data: a field missing');
};
exports.default = toNewPatientEntry;
