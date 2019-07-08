const WebController = require('../controllers/web');

class Web {
  constructor(router) {
    this.router = router;

    this.web = new WebController();
  }

  routes() {
    this.router.route('/*').get((req, res) => this.web.clientPortal(req, res));
  }
}

module.exports = Web;
