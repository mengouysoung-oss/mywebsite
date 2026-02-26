// Caesar Cipher Functions
function encryptCaesar() {
    const text = document.getElementById('caesar-input').value;
    const shift = parseInt(document.getElementById('caesar-shift').value);
    let result = '';
    
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        if (/[a-z]/.test(char)) {
            result += String.fromCharCode((char.charCodeAt(0) - 97 + shift) % 26 + 97);
        } else if (/[A-Z]/.test(char)) {
            result += String.fromCharCode((char.charCodeAt(0) - 65 + shift) % 26 + 65);
        } else {
            result += char;
        }
    }
    
    document.getElementById('caesar-output').value = result;
}

function decryptCaesar() {
    const text = document.getElementById('caesar-output').value;
    const shift = parseInt(document.getElementById('caesar-shift').value);
    let result = '';
    
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        if (/[a-z]/.test(char)) {
            result += String.fromCharCode((char.charCodeAt(0) - 97 - shift + 26) % 26 + 97);
        } else if (/[A-Z]/.test(char)) {
            result += String.fromCharCode((char.charCodeAt(0) - 65 - shift + 26) % 26 + 65);
        } else {
            result += char;
        }
    }
    
    document.getElementById('caesar-input').value = result;
}

// General Shift Cipher Functions
function encryptShift() {
    const text = document.getElementById('shift-input').value;
    const shift = parseInt(document.getElementById('shift-value').value);
    let result = '';
    
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        if (/[a-z]/.test(char)) {
            result += String.fromCharCode((char.charCodeAt(0) - 97 + shift) % 26 + 97);
        } else if (/[A-Z]/.test(char)) {
            result += String.fromCharCode((char.charCodeAt(0) - 65 + shift) % 26 + 65);
        } else {
            result += char;
        }
    }
    
    document.getElementById('shift-output').value = result;
}

function decryptShift() {
    const text = document.getElementById('shift-output').value;
    const shift = parseInt(document.getElementById('shift-value').value);
    let result = '';
    
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        if (/[a-z]/.test(char)) {
            result += String.fromCharCode((char.charCodeAt(0) - 97 - shift + 26) % 26 + 97);
        } else if (/[A-Z]/.test(char)) {
            result += String.fromCharCode((char.charCodeAt(0) - 65 - shift + 26) % 26 + 65);
        } else {
            result += char;
        }
    }
    
    document.getElementById('shift-input').value = result;
}

// Affine Cipher Functions
function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

function modularInverse(a, m) {
    for (let i = 1; i < m; i++) {
        if ((a * i) % m === 1) {
            return i;
        }
    }
    return 1;
}

function encryptAffine() {
    const text = document.getElementById('affine-input').value;
    const a = parseInt(document.getElementById('affine-a').value);
    const b = parseInt(document.getElementById('affine-b').value);
    
    if (gcd(a, 26) !== 1) {
        alert('Error: a and 26 must be coprime!');
        return;
    }
    
    let result = '';
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        if (/[a-z]/.test(char)) {
            const x = char.charCodeAt(0) - 97;
            result += String.fromCharCode((a * x + b) % 26 + 97);
        } else if (/[A-Z]/.test(char)) {
            const x = char.charCodeAt(0) - 65;
            result += String.fromCharCode((a * x + b) % 26 + 65);
        } else {
            result += char;
        }
    }
    
    document.getElementById('affine-output').value = result;
}

function decryptAffine() {
    const text = document.getElementById('affine-output').value;
    const a = parseInt(document.getElementById('affine-a').value);
    const b = parseInt(document.getElementById('affine-b').value);
    
    const a_inv = modularInverse(a, 26);
    
    let result = '';
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        if (/[a-z]/.test(char)) {
            const y = char.charCodeAt(0) - 97;
            result += String.fromCharCode((a_inv * (y - b + 26)) % 26 + 97);
        } else if (/[A-Z]/.test(char)) {
            const y = char.charCodeAt(0) - 65;
            result += String.fromCharCode((a_inv * (y - b + 26)) % 26 + 65);
        } else {
            result += char;
        }
    }
    
    document.getElementById('affine-input').value = result;
}

// Transposition Cipher Functions
function encryptTransposition() {
    const text = document.getElementById('transposition-input').value.replace(/\s/g, '');
    const key = parseInt(document.getElementById('transposition-key').value);
    
    let result = '';
    for (let col = 0; col < key; col++) {
        for (let row = col; row < text.length; row += key) {
            result += text[row];
        }
    }
    
    document.getElementById('transposition-output').value = result;
}

function decryptTransposition() {
    const text = document.getElementById('transposition-output').value;
    const key = parseInt(document.getElementById('transposition-key').value);
    
    const rows = Math.ceil(text.length / key);
    const cols = key;
    let result = Array(text.length);
    let index = 0;
    
    for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
            if (col + row * cols < text.length) {
                result[col + row * cols] = text[index++];
            }
        }
    }
    
    document.getElementById('transposition-input').value = result.join('');
}

// RSA Cipher Functions
let rsa_n = 0, rsa_e = 0, rsa_d = 0;

function isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
}

function gcdExtended(a, b) {
    if (a === 0) return [b, 0, 1];
    const [gcd, x1, y1] = gcdExtended(b % a, a);
    const x = y1 - Math.floor(b / a) * x1;
    const y = x1;
    return [gcd, x, y];
}

function modularInverseRSA(e, phi) {
    const [gcd, x] = gcdExtended(e, phi);
    if (gcd !== 1) return null;
    return (x % phi + phi) % phi;
}

function generateRSAKeys() {
    const p = parseInt(document.getElementById('rsa-p').value);
    const q = parseInt(document.getElementById('rsa-q').value);
    
    if (!isPrime(p) || !isPrime(q)) {
        alert('Both numbers must be prime!');
        return;
    }
    
    rsa_n = p * q;
    const phi = (p - 1) * (q - 1);
    
    rsa_e = 2;
    while (gcd(rsa_e, phi) !== 1) {
        rsa_e++;
    }
    
    rsa_d = modularInverseRSA(rsa_e, phi);
    
    if (rsa_d === null) {
        alert('Error generating keys!');
        return;
    }
    
    document.getElementById('rsa-keys').style.display = 'block';
    document.getElementById('rsa-public-key').value = `(${rsa_n}, ${rsa_e})`;
    document.getElementById('rsa-private-key').value = `(${rsa_n}, ${rsa_d})`;
}

function modularExponentiation(base, exp, mod) {
    let result = 1;
    base = base % mod;
    while (exp > 0) {
        if (exp % 2 === 1) {
            result = (result * base) % mod;
        }
        exp = Math.floor(exp / 2);
        base = (base * base) % mod;
    }
    return result;
}

function encryptRSA() {
    const message = document.getElementById('rsa-input').value;
    
    if (rsa_n === 0) {
        alert('Please generate keys first!');
        return;
    }
    
    let result = '';
    for (let char of message) {
        const m = char.charCodeAt(0) % rsa_n;
        const c = modularExponentiation(m, rsa_e, rsa_n);
        result += c + ' ';
    }
    
    document.getElementById('rsa-output').value = result.trim();
}

function decryptRSA() {
    const encrypted = document.getElementById('rsa-output').value.trim().split(' ');
    
    if (rsa_n === 0) {
        alert('Please generate keys first!');
        return;
    }
    
    let result = '';
    for (let c of encrypted) {
        const m = modularExponentiation(parseInt(c), rsa_d, rsa_n);
        result += String.fromCharCode(m);
    }
    
    document.getElementById('rsa-input').value = result;
}

// Smooth scroll to sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// CTA Button scroll
document.querySelector('.cta-button').addEventListener('click', function() {
    document.getElementById('ciphers').scrollIntoView({
        behavior: 'smooth'
    });
});