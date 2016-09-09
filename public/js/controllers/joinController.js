'use strict'

app.controller('joinController', joinController)

function joinController(){
  const j = this;

  j.submit = function() {
    console.log('submitted!');
  }
}
