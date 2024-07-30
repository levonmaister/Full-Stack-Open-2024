"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const express_1 = __importDefault(require("express"));
const diagnosisrouter_1 = __importDefault(require("./routers/diagnosisrouter"));
const patientrouter_1 = __importDefault(require("./routers/patientrouter"));
const cors = require('cors');
const app = (0, express_1.default)();
app.use(cors());
app.use(express_1.default.json());
app.use('/api/diagnoses', diagnosisrouter_1.default);
app.use('/api/patients', patientrouter_1.default);
const PORT = 3001;
app.get('/api/ping', (_req, res) => {
    res.status(200).send();
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
