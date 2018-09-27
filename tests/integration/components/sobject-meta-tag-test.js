import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('sobject-meta-tag', 'Integration | Component | sobject-meta-tag', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{sobject-meta-tag}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#sobject-meta-tag}}
      template block text
    {{/sobject-meta-tag}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
