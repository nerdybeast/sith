import { moduleFor, test } from 'ember-qunit';

moduleFor('service:toast', 'Unit | Service | toast', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

// Replace this with your real tests.
test('it exists', function(assert) {

  const profile = {
    urls:{}
  };
  
  window.sessionStorage.setItem('profile', JSON.stringify(profile));

  let service = this.subject();
  assert.ok(service);
});
