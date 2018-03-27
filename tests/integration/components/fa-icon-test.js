import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('fa-icon', 'Integration | Component | fa icon', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  assert.expect(0);

  const profile = {
    urls:{}
  };

  window.sessionStorage.setItem('profile', JSON.stringify(profile));

  this.on('delete', () => {});

  this.render(hbs`
    {{fa-icon
      icon="times"
      animationIcon="cog"
      colorClass="danger"
      animationColorClass="success"
      onClick=(action "delete" traceFlag)
    }}
  `);

});
