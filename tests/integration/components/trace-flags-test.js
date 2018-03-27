import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('trace-flags', 'Integration | Component | trace flags', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  assert.expect(0);

  this.set('mockTraceFlags', []);
  this.set('mockDebugLevels', []);

  this.render(hbs`{{trace-flags traceFlags=mockTraceFlags debugLevels=mockDebugLevels}}`);
});
