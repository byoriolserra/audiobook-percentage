#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)({ sigint: true });
/// USE CASES ////
const timeToDecimal = (time) => {
    const array = time.split(':');
    let decimal = parseInt(array[1], 10);
    decimal = (decimal / 6) * 10;
    return parseFloat(parseInt(array[0], 10) + '.' + (decimal < 10 ? '0' : '') + decimal);
};
const calculateReadHours = (totalHours, leftHours) => {
    return totalHours - leftHours;
};
const calculateReadPercentage = (totalHours, readHours) => {
    const percentage = (readHours * 100) / totalHours;
    return percentage.toString();
};
const fixPercentage = (longDecimal, fixed) => {
    const re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
    const fixedDecimal = longDecimal.match(re);
    if (!fixedDecimal) {
        return longDecimal;
    }
    return fixedDecimal[0];
};
///
const calculatePercentage = (totalHours, leftHours) => {
    const totalHoursDecimal = timeToDecimal(totalHours);
    const leftHoursDecimal = timeToDecimal(leftHours);
    const readHours = calculateReadHours(totalHoursDecimal, leftHoursDecimal);
    const readPercentage = calculateReadPercentage(totalHoursDecimal, readHours);
    const fixedReadPercentage = fixPercentage(readPercentage, 2);
    return fixedReadPercentage + '%';
};
const totalHours = prompt('What are the total hours of the book?');
const leftHours = prompt('What are the left hours of the book?');
console.log(`You have read ${calculatePercentage(totalHours, leftHours)} of the book 📖!`);
