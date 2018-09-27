import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('sobject-field-data-type', 'Integration | Component | sobject-field-data-type', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{sobject-field-data-type}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#sobject-field-data-type}}
      template block text
    {{/sobject-field-data-type}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
