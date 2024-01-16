//se importan las bibliotecas a utilizar
const express = require('express');
const router = express.Router();
const CryptoJS = require('crypto-js');


router.get('/', (req, res) => {
  res.render('home', {key: '', iv: '', text: '', encryptedText: '', keyD: '', ivD: '', encrypted: '', decryptedText: ''});
});

router.post('/procesar', (req, res) => {
  // Accede a los datos del formulario a través de req.body
  const formData = req.body;
  console.log(req.body);
  // Puedes hacer algo con los datos aquí

  res.send('Formulario enviado con éxito');
});




//configuracion de las rutas de encriptado y desencriptado

router.post('/encrypt', (req, res) => {

  //se configuran las variables de key e iv
  var key = CryptoJS.enc.Hex.parse(req.body.key);
  var iv = CryptoJS.enc.Hex.parse(req.body.iv);
  
  //se configura el texto a encriptar
  var text = req.body.plainText
  
  //se configura la funcion de encriptado aes-128-cbc
  var encrypted = CryptoJS.AES.encrypt(text, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  });

  encryptedText = btoa(encrypted.toString())
 //se manda la respuesta y se hashea en base64
  res.render('home', {key, keyD: key, iv, ivD: iv, text, decryptedText:'', encrypted: '', encryptedText});
});

router.post('/decrypt', (req, res) => {

  //se configuran las variables de key e iv
  var keyD = CryptoJS.enc.Hex.parse(req.body.keyD);
  var ivD = CryptoJS.enc.Hex.parse(req.body.ivD);

   //se configura el texto a desencriptar
  var encrypted = req.body.encrypted

   //se configura la funcion de desencriptado aes-128-cbc
  var decrypted = CryptoJS.AES.decrypt(atob(encrypted), keyD, {
    iv: ivD,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  });

  //se convierte el resultado en string
  var decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

  
  console.log(decryptedText)
  //se manda la respuesta desencriptada
  res.render('home', {keyD, ivD, encrypted, decryptedText, key: keyD, iv: ivD, text: '', encryptedText: ''});
});

//se exportan las rutas para ser leidas por el servidor
module.exports = router;
