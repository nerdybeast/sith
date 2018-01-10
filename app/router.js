import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('welcome');
  this.route('authorize');
  this.route('main', { path: '/' }, function() {
    this.route('test-runner');
    this.route('logging');
  });
});

export default Router;
