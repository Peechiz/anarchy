'use strict'
const expect = require('chai').expect;
const app = require('../../app')
const request = require('supertest')(app);

describe('tests are ready', ()=>{
  it('checks to see if tests are working', ()=>{
    expect(1).to.equal(1)
  })
})
