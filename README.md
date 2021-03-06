# Austin Anarchy

**This is an app to manage roller derby team members and share gear status/reviews. It was built in two weeks.**

![Splash Image](http://mrpeech.com/img/anarchy.png)

**Technologies:**
- Node.js
- Hapi
- PostgreSQL
- Sequelize
- Angular 1.4
- Heroku (for deployment)
---

## Goals and Objectives

ATX Anarchy's current website is a static wordpress with minimal functionality and a design that doesn't leverage the team's aesthetic.  With that in mind, it was my intention to create a more visually pleasing design that also provided functionality that might be usefull to the team.

I'm currently consulting with them to improve the site, currently hosted on Heroku.

## Planned Features

- [x] **Skater Profiles**
- [ ] Admin Panel
  - [x] **Full skaters CRUD**
  - [x] **View pending skater applications**
  - [ ] Front Page editing
- [x] New Skater Application
- [ ] Calendar (supporting public/private events, Admin/Author permission editing)
- [ ] Blog/Bout Recap

## Known Issues
- Navigation bar will sometimes fail to highlite (nav controller refactor needed)
- Gear display image sometimes cuts off the bottom `<hr>`
- Angular not loading properly in Safari
