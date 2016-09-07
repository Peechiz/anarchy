'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('skaters', [{
      userName: 'w0mbo',
      derbyName: 'Wombo Combo',
      number: '5',
      team: 'Legion',
      favPosition: 'Jammer',
      photo: 'http://www.fillmurray.com/300/300',
      admin: false,
      rank: 'member',
      summary: 'I do it for the dank memes'
    }, {
      userName: 'todd',
      derbyName: '_todd_',
      number: '22',
      team: 'Owls',
      favPosition: 'Pivot',
      photo: 'http://www.fillmurray.com/300/300',
      admin: false,
      rank: 'member',
      summary: 'this is my summary'
    }, {
      userName: 'bruc3',
      derbyName: 'Bruce Payne',
      number: '55',
      team: 'Legion',
      favPosition: 'Blocker',
      photo: 'http://www.fillmurray.com/300/300',
      admin: true,
      rank: 'captain',
      summary: 'this is sparta'
    }, {
      userName: 'sharkn4do',
      derbyName: 'Sharknado',
      number: '111',
      team: 'Owls',
      favPosition: 'Pivot',
      photo: 'http://www.fillmurray.com/300/300',
      admin: false,
      rank: 'fresh meat',
      summary: 'a tornado full of sharks'
    }]).then(() => {
      return queryInterface.bulkInsert('brands', [{
        name: 'brand1'
      }, {
        name: 'brand2'
      }, {
        name: 'brand3'
      }])
    }).then(() => {
      return queryInterface.bulkInsert('gear', [{
        name: 'a_boot',
        brand_id: 1,
        type: 'boot'
      }, {
        name: 'a_wheels',
        brand_id: 2,
        type: 'wheels'
      }, {
        name: 'a_plates',
        brand_id: 3,
        type: 'plates'
      }, {
        name: 'a_toestop',
        brand_id: 1,
        type: 'toestop'
      }, {
        name: 'a_helmet',
        brand_id: 2,
        type: 'helmet'
      }, {
        name: 'a_kneepads',
        brand_id: 3,
        type: 'kneepads'
      }, {
        name: 'a_elbowpads',
        brand_id: 1,
        type: 'elbowpads'
      }, {
        name: 'a_wristgaurds',
        brand_id: 2,
        type: 'wristgaurds'
      }, {
        name: 'a_mouthgaurd',
        brand_id: 3,
        type: 'mouthgaurd'
      }])
    }).then(() => {
      return queryInterface.bulkInsert('skaters_gear', [{
        skater_id: 1,
        gear_id: 2,
        is_current: true,
        img: 'http://flattrackstats.com/sites/default/files/imagecache/profile/logos/AA-logo.png'
      }, {
        skater_id: 1,
        gear_id: 1,
        is_current: true,
        img: 'http://flattrackstats.com/sites/default/files/imagecache/profile/logos/AA-logo.png'
      }, {
        skater_id: 1,
        gear_id: 5,
        is_current: true,
        img: 'http://flattrackstats.com/sites/default/files/imagecache/profile/logos/AA-logo.png'
      }, {
        skater_id: 1,
        gear_id: 6,
        is_current: true,
        img: 'http://flattrackstats.com/sites/default/files/imagecache/profile/logos/AA-logo.png'
      }, {
        skater_id: 1,
        gear_id: 7,
        is_current: true,
        img: 'http://flattrackstats.com/sites/default/files/imagecache/profile/logos/AA-logo.png'
      }, {
        skater_id: 1,
        gear_id: 8,
        is_current: true,
        img: 'http://flattrackstats.com/sites/default/files/imagecache/profile/logos/AA-logo.png'
      }, {
        skater_id: 1,
        gear_id: 9,
        is_current: true,
        img: 'http://flattrackstats.com/sites/default/files/imagecache/profile/logos/AA-logo.png'
      }, { // END SKATER 1
        skater_id: 2,
        gear_id: 1,
        is_current: true,
        img: 'http://flattrackstats.com/sites/default/files/imagecache/profile/logos/AA-logo.png'
      }, {
        skater_id: 3,
        gear_id: 3,
        is_current: true,
        img: 'http://flattrackstats.com/sites/default/files/imagecache/profile/logos/AA-logo.png'
      }, {
        skater_id: 4,
        gear_id: 4,
        is_current: true,
        img: 'http://flattrackstats.com/sites/default/files/imagecache/profile/logos/AA-logo.png'
      }])
    }).then(() => {
      return queryInterface.bulkInsert('reviews', [{
        skater_id: 1,
        gear_id: 2,
        text: 'i love it',
        rating: 11,
      }, {
        skater_id: 1,
        gear_id: 1,
        text: 'i hate it',
        rating: 0,
      }, {
        skater_id: 1,
        gear_id: 5,
        text: 'i meh it',
        rating: 5
      }, {
        skater_id: 1,
        gear_id: 6,
        text: 'i love it',
        rating: 8,
      }, {
        skater_id: 1,
        gear_id: 7,
        text: 'i love it',
        rating: 9,
      }, {
        skater_id: 1,
        gear_id: 8,
        text: 'i love it',
        rating: 10,
      }, {
        skater_id: 1,
        gear_id: 9,
        text: 'i love it',
        rating: 11,
      }])
    })
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.dropAllTables();
  }
};
