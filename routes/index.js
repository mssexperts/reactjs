const Web = require('./web');

class Routes {
  constructor(router) {
    this.router = router;
  }

  register() {
    new Web(this.router).routes();

    return this.router;
  }
}

module.exports = Routes;
