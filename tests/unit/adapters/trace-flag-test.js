import { moduleFor, test } from 'ember-qunit';

moduleFor('adapter:trace-flag', 'Unit | Adapter | trace flag', {
  // Specify the other units that are required for this test.
  needs: ['service:auth']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let adapter = this.subject();
  assert.ok(adapter);
});
