'use strict'

app.controller('adminController', adminController)

function adminController(){
  const a = this;

  a.submit = function() {
    console.log('submitted!');
  }
}
