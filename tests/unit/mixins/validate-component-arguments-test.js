import EmberObject from '@ember/object';
import ValidateComponentArgumentsMixin from 'sith/mixins/validate-component-arguments';
import { module, test } from 'qunit';

module('Unit | Mixin | validate-component-arguments');

// Replace this with your real tests.
test('it works', function(assert) {
  let ValidateComponentArgumentsObject = EmberObject.extend(ValidateComponentArgumentsMixin);
  let subject = ValidateComponentArgumentsObject.create();
  assert.ok(subject);
});
