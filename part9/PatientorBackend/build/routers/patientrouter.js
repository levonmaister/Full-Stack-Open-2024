"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = __importDefault(require("../utils"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientService_1.default.getPatients());
});
router.get('/:id', (_req, res) => {
    const id = _req.params.id;
    console.log(patientService_1.default.getPatient(id));
    res.send(patientService_1.default.getPatient(id));
});
router.post('/', (req, res) => {
    try {
        const { date, occupation, dateOfBirth, name, ssn, gender } = req.body;
        const entry = {
            id: 'b4f4eca1-2aa7-4b13-9a18-4a5535c3c8da',
            date: '2019-10-20',
            specialist: 'MD House',
            type: 'HealthCheck',
            description: 'Yearly control visit. Cholesterol levels back to normal.',
            healthCheckRating: 0,
        };
        const object = {
            date: date,
            occupation: occupation,
            dateOfBirth: dateOfBirth,
            name: name,
            ssn: ssn,
            gender: gender,
            entries: entry
        };
        const newPatientEntry = (0, utils_1.default)(object);
        const NewPatientObject = patientService_1.default.addPatient(newPatientEntry);
        res.send(NewPatientObject);
    }
    catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
exports.default = router;
