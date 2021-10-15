// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>Número para texto</h1>`;

const numberTextArray1 = [
  'zero',
  'um',
  'dois',
  'três',
  'quatro',
  'cinco',
  'seis',
  'sete',
  'oito',
  'nove',
  'dez',
  'onze',
  'doze',
  'treze',
  'quatorze',
  'quinze',
  'dezesseis',
  'dezessete',
  'dezoito',
  'dezenove',
];

const numberTextArray2 = [
  'dez',
  'vinte',
  'trinta',
  'quarenta',
  'cinquenta',
  'sessenta',
  'setenta',
  'oitenta',
  'noventa',
];

const numberTextArray3 = [
  'cem',
  'cento',
  'duzentos',
  'trezentos',
  'quatrocentos',
  'quinhentos',
  'seiscentos',
  'setecentos',
  'oitocentos',
  'novecentos',
];

const numberTextArray4 = [
  'mil',
  'milhão',
  'bilhão',
  'trilhão',
  'quadrilhão',
  'quintilhão',
  'sextilhão',
  'setilhão',
  'octilhão',
  'nonilhão',
  'decilhão',
  'undecilhão',
  'dodecilhão',
  'tredecilhão',
  'quatrodecilhão',
  'quindecilhão',
  'sedecilhão',
  'septendecilhão',
  'octencilhão',
  'nonencilhão',
];

const validateInput = (input, min, max) => {
  if (typeof input !== 'number' || input < min || input > max) {
    return false;
  }

  return true;
};

// Exercício 1
const numberToText1 = (input) => {
  if (!validateInput(input, 0, 9)) return undefined;

  let resp = '';

  resp += numberTextArray1[Math.abs(input)];

  return resp;
};

// Exercício 2
const numberToText2 = (input) => {
  if (!validateInput(input, -9, 9)) return undefined;

  let resp = '';

  if (input < 0) resp = 'menos ';

  resp += numberTextArray1[Math.abs(input)];

  return resp;
};

// Exercício 3
const numberToText3 = (input) => {
  if (!validateInput(input, -9.99, 9.99)) return undefined;

  const [inputPart1, inputPart2] = (input + '').split('.');

  let resp = '';

  resp = numberToText2(parseInt(inputPart1));

  if (inputPart2) {
    if (numberTextArray1[inputPart2]) {
      resp += ` e ${numberTextArray1[inputPart2]}`;
    } else {
      const part1 = inputPart2.substr(0, 1);
      const part2 = inputPart2.substr(1, 1);

      resp += part1 > 0 ? ` e ${numberTextArray2[parseInt(part1) - 1]}` : '';
      resp += ` e ${numberTextArray1[part2]}`;
    }
  }

  return resp;
};

// Exercício 4
const numberToText4 = (input) => {
  if (!validateInput(input, -999999999.99, 999999999.99)) return undefined;

  let a;
  let v;
  let i;
  let n = (input + '').replace(input ? /[^,\d]/g : /\D/g, '').split(',');
  let e = ' e ';
  let $ = 'real';
  let d = 'centavo';
  let sl;

  for (
    var f = n.length - 1, l, j = -1, r = [], s = [], t = '';
    ++j <= f;
    s = []
  ) {
    j && (n[j] = (('.' + n[j]) * 1).toFixed(2).slice(2));
    if (
      !((a = (v = n[j]).slice((l = v.length) % 3).match(/\d{3}/g)),
      (v = l % 3 ? [v.slice(0, l % 3)] : []),
      (v = a ? v.concat(a) : v)).length
    )
      continue;
    for (a = -1, l = v.length; ++a < l; t = '') {
      if (!(i = v[a] * 1)) continue;
      (i % 100 < 20 && (t += numberTextArray1[i % 100])) ||
        ((i % 100) + 1 &&
          (t +=
            numberTextArray2[(((i % 100) / 10) >> 0) - 1] +
            (i % 10 ? e + numberTextArray1[i % 10] : '')));
      s.push(
        (i < 100
          ? t
          : !(i % 100)
          ? numberTextArray3[i == 100 ? 0 : (i / 100) >> 0]
          : numberTextArray3[(i / 100) >> 0] + e + t) +
          ((t = l - a - 2) > -1
            ? ' ' +
              (i > 1 && t > 0
                ? numberTextArray4[t].replace('ão', 'ões')
                : numberTextArray4[t])
            : '')
      );
    }
    a =
      (sl = s.length) > 1
        ? ((a = s.pop()), s.join(' ') + e + a)
        : s.join('') ||
          ((!j && n[j + 1] * 1 > 0) || r.length ? '' : numberTextArray1[0]);
    a &&
      r.push(
        a +
          (input
            ? ' ' +
              (v.join('') * 1 > 1
                ? j
                  ? d + 's'
                  : (/0{6,}$/.test(n[0]) ? 'de ' : '') + $.replace('l', 'is')
                : j
                ? d
                : $)
            : '')
      );
  }
  return r.join(e);
};

let textFromNumber = undefined;
let input = '';
do {
  input = +prompt(
    'Por favor, insira o número para ser transcrito (digite sair para encerrar o programa)'
  );

  textFromNumber = numberToText4(input);

  if (textFromNumber && textFromNumber !== 'undefined') {
    alert(`${input} -> ${textFromNumber}`);
  }
} while (!textFromNumber && (input + '').toLowerCase() !== 'sair');
