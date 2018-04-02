import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:main/logging', 'Unit | Controller | main/logging', {
  // Specify the other units that are required for this test.
  needs: ['service:ajax', 'service:auth']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});
