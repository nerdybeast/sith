import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:main/index', 'Unit | Controller | main/index', {
  // Specify the other units that are required for this test.
  needs: ['controller:main', 'service:auth']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});
