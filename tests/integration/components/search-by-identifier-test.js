import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('search-by-identifier', 'Integration | Component | search-by-identifier', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{search-by-identifier}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#search-by-identifier}}
      template block text
    {{/search-by-identifier}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
