"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractTime = extractTime;
function extractTime(dateString) {
    const date = new Date(dateString);
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    return `${hours}:${minutes}`;
}
function padZero(number) {
    return number.toString().padStart(2, '0');
}
