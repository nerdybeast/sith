import { moduleFor, test } from 'ember-qunit';

moduleFor('route:authorize', 'Unit | Route | authorize', {
  // Specify the other units that are required for this test.
  needs: ['service:auth']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
