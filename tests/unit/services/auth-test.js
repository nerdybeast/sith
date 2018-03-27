import { moduleFor, test } from 'ember-qunit';

moduleFor('service:auth', 'Unit | Service | auth', {
  needs: ['service:ajax']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let service = this.subject();
  assert.ok(service);
});

test('returns auth0 instance', function(assert) {
  let service = this.subject();
  assert.ok(service);
});
