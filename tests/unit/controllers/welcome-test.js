import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:welcome', 'Unit | Controller | welcome', {
  // Specify the other units that are required for this test.
  needs: ['service:auth']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});
