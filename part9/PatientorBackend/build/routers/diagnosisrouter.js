"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const express_1 = __importDefault(require("express"));
const diagnoses_1 = __importDefault(require("../data/diagnoses"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(diagnoses_1.default);
});
router.post('/', (_req, res) => {
    diagnoses_1.default.push(_req.body);
    res.send(_req.body);
});
exports.default = router;
