import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('apex-log-menu', 'Integration | Component | apex log menu', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });


  // Template block usage:
  this.render(hbs`
    {{#apex-log-menu}}
      template block text
    {{/apex-log-menu}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
