'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('teams', [
      {teamName: 'Legion'},
      {teamName: 'Owls'}
    ]).then(()=>{
      return queryInterface.bulkInsert('skaters', [{
        userName: 'w0mbo',
        derbyName: 'Wombo Combo',
        number: '5',
        teamId: 1,
        favPosition: 'Jammer',
        photo: 'http://www.fillmurray.com/300/300',
        admin: false,
        rank: 'member',
        summary: 'I do it for the dank memes',
        password: '$2a$08$hf6MYh81bz9qoIOONHTkWu9308Lup.O..HXejK2Z9hFaEKJ0G0f0q'
      }, {
        userName: 'todd',
        derbyName: '_todd_',
        number: '22',
        teamId: 2,
        favPosition: 'Pivot',
        photo: 'http://www.fillmurray.com/300/300',
        admin: false,
        rank: 'member',
        summary: 'this is my summary',
        password: '$2a$08$hf6MYh81bz9qoIOONHTkWu9308Lup.O..HXejK2Z9hFaEKJ0G0f0q'
      }, {
        userName: 'bruc3',
        derbyName: 'Bruce Payne',
        number: '55',
        teamId: 1,
        favPosition: 'Blocker',
        photo: 'http://www.fillmurray.com/300/300',
        admin: true,
        rank: 'captain',
        summary: 'this is sparta',
        password: '$2a$08$hf6MYh81bz9qoIOONHTkWu9308Lup.O..HXejK2Z9hFaEKJ0G0f0q'
      }, {
        userName: 'sharkn4do',
        derbyName: 'Sharknado',
        number: '111',
        teamId: 2,
        favPosition: 'Pivot',
        photo: 'http://www.fillmurray.com/300/300',
        admin: false,
        rank: 'fresh meat',
        summary: 'a tornado full of sharks',
        password: '$2a$08$hf6MYh81bz9qoIOONHTkWu9308Lup.O..HXejK2Z9hFaEKJ0G0f0q'
      }])
    }).then(() => {
      return queryInterface.bulkInsert('brands', [{
        name: 'brand1'
      }, {
        name: 'brand2'
      }, {
        name: 'brand3'
      }])
    }).then(() => {
      return queryInterface.bulkInsert('gears', [{
        name: 'a_boot',
        brandId: 1,
        type: 'boot'
      }, {
        name: 'a_wheels',
        brandId: 2,
        type: 'wheels'
      }, {
        name: 'a_plates',
        brandId: 3,
        type: 'plates'
      }, {
        name: 'a_toestop',
        brandId: 1,
        type: 'toestop'
      }, {
        name: 'a_helmet',
        brandId: 2,
        type: 'helmet'
      }, {
        name: 'a_kneepads',
        brandId: 3,
        type: 'kneepads'
      }, {
        name: 'a_elbowpads',
        brandId: 1,
        type: 'elbowpads'
      }, {
        name: 'a_wristgaurds',
        brandId: 2,
        type: 'wristgaurds'
      }, {
        name: 'a_mouthgaurd',
        brandId: 3,
        type: 'mouthgaurd'
      }])
    }).then(() => {
      return queryInterface.bulkInsert('skaters_gears', [{
        skaterId: 1,
        gearId: 2,
        isCurrent: true,
        img: 'http://flattrackstats.com/sites/default/files/imagecache/profile/logos/AA-logo.png'
      }, {
        skaterId: 1,
        gearId: 1,
        isCurrent: true,
        img: 'http://flattrackstats.com/sites/default/files/imagecache/profile/logos/AA-logo.png'
      }, {
        skaterId: 1,
        gearId: 5,
        isCurrent: true,
        img: 'http://flattrackstats.com/sites/default/files/imagecache/profile/logos/AA-logo.png'
      }, {
        skaterId: 1,
        gearId: 6,
        isCurrent: true,
        img: 'http://flattrackstats.com/sites/default/files/imagecache/profile/logos/AA-logo.png'
      }, {
        skaterId: 1,
        gearId: 7,
        isCurrent: true,
        img: 'http://flattrackstats.com/sites/default/files/imagecache/profile/logos/AA-logo.png'
      }, {
        skaterId: 1,
        gearId: 8,
        isCurrent: true,
        img: 'http://flattrackstats.com/sites/default/files/imagecache/profile/logos/AA-logo.png'
      }, {
        skaterId: 1,
        gearId: 9,
        isCurrent: true,
        img: 'http://flattrackstats.com/sites/default/files/imagecache/profile/logos/AA-logo.png'
      }, { // END SKATER 1
        skaterId: 2,
        gearId: 1,
        isCurrent: true,
        img: 'http://flattrackstats.com/sites/default/files/imagecache/profile/logos/AA-logo.png'
      }, {
        skaterId: 3,
        gearId: 3,
        isCurrent: true,
        img: 'http://flattrackstats.com/sites/default/files/imagecache/profile/logos/AA-logo.png'
      }, {
        skaterId: 4,
        gearId: 4,
        isCurrent: true,
        img: 'http://flattrackstats.com/sites/default/files/imagecache/profile/logos/AA-logo.png'
      }])
    }).then(() => {
      return queryInterface.bulkInsert('reviews', [{
        skaterId: 1,
        gearId: 2,
        text: 'i love it',
        rating: 11,
      }, {
        skaterId: 1,
        gearId: 1,
        text: 'i hate it',
        rating: 0,
      }, {
        skaterId: 1,
        gearId: 5,
        text: 'i meh it',
        rating: 5
      }, {
        skaterId: 1,
        gearId: 6,
        text: 'i love it',
        rating: 8,
      }, {
        skaterId: 1,
        gearId: 7,
        text: 'i love it',
        rating: 9,
      }, {
        skaterId: 1,
        gearId: 8,
        text: 'i love it',
        rating: 10,
      }, {
        skaterId: 1,
        gearId: 9,
        text: 'i love it',
        rating: 11,
      }])
    })
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.dropAllTables();
  }
};
