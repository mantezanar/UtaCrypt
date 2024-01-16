//se importan las bibliotecas a utilizar
const express = require('express');
const router = express.Router();
const CryptoJS = require('crypto-js');

//configuracion de las rutas de encriptado y desencriptado

router.get('/encrypt', (req, res) => {

  //se configuran las variables de key e iv
  var key = CryptoJS.enc.Hex.parse("566B59703373367638792F423F452848");
  var iv = CryptoJS.enc.Hex.parse("655367566B5970337336763979244226");
  
  //se configura el texto a encriptar
  var text = ''
  
  //se configura la funcion de encriptado aes-128-cbc
  var encrypted = CryptoJS.AES.encrypt(text, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  });

 //se manda la respuesta y se hashea en base64
  res.send(`Encrypted Message: ${btoa(encrypted.toString())}`);
});

router.get('/decrypt', (req, res) => {

  //se configuran las variables de key e iv
  var key = CryptoJS.enc.Hex.parse("566B59703373367638792F423F452848");
  var iv = CryptoJS.enc.Hex.parse("655367566B5970337336763979244226");

   //se configura el texto a desencriptar
  var encryptedText = "" 

   //se configura la funcion de desencriptado aes-128-cbc
  var decrypted = CryptoJS.AES.decrypt(atob(encryptedText), key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.AnsiX923
  });

  //se convierte el resultado en string
  var decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

  

  //se manda la respuesta desencriptada
  res.send(`Decrypted Message: ${decryptedText}`);
});

//se exportan las rutas para ser leidas por el servidor
module.exports = router;
