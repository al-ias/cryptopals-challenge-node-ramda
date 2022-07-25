'use strict'

const { hexToBase64 } = require("../../src/2-fixed-xor")

const encodedString = '1c0111001f010100061a024b53535009181c'
const encodedString2 = '686974207468652062756c6c277320657965'

console.log(hexToBase64(encodedString, encodedString2))