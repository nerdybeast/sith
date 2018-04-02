import { moduleFor, test } from 'ember-qunit';

moduleFor('service:basic-ajax', 'Unit | Service | basic ajax', {
  // Specify the other units that are required for this test.
  needs: ['service:ajax']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let service = this.subject();
  assert.ok(service);
});
