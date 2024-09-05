"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomEmoji = exports.funEmojis = void 0;
exports.funEmojis = [
    '👾',
    '⭐',
    '🌟',
    '🎉',
    '🎊',
    '🎈',
    '🎁',
    '🎂',
    '🎄',
    '🎃',
    '🎗',
    '🎟',
    '🎫',
    '🎖',
    '🏆',
    '🏅',
    '🥇',
    '🥈',
    '🥉',
    '⚽',
    '🏀',
    '🏈',
    '⚾',
    '🎾',
    '🏐',
    '🏉',
    '🎱',
    '🏓',
    '🏸',
    '🥅',
    '🏒',
    '🏑',
    '🏏',
    '⛳',
    '🏹',
    '🎣',
    '🥊',
    '🥋',
    '🎽',
    '⛸',
    '🥌',
    '🛷',
    '🎿',
    '⛷',
    '🏂',
    '🏋️',
    '🤼',
    '🤸',
    '🤺',
    '⛹️',
    '🤾',
    '🏌️',
    '🏇',
    '🧘',
];
const getRandomEmoji = () => {
    return exports.funEmojis[Math.floor(Math.random() * exports.funEmojis.length)];
};
exports.getRandomEmoji = getRandomEmoji;
