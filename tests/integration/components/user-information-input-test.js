import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('user-information-input', 'Integration | Component | user information input', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  assert.expect(0);

  this.on('onCopy', () => { });
  this.on('onCopyError', () => { });

  this.render(hbs`{{user-information-input onCopy=(action "onCopy") onCopyError=(action "onCopyError")}}`);
});
