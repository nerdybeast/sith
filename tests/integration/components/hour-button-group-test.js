import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
//import { run } from '@ember/runloop';

moduleForComponent('hour-button-group', 'Integration | Component | hour button group', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(0);
  this.on('updateExpiration', () => {});
  this.render(hbs`{{hour-button-group onClick=(action "updateExpiration")}}`);
});

// test('lksdlfksdlfk', function(assert) {

//   assert.expect(0);

//   //this.render(hbs`{{hour-button-group traceFlag=mockTraceFlag onClick=(action onClickAction)}}`);
//   this.render(hbs`{{hour-button-group}}`);

//   this.$('p:first-child a').click();

//   // const mockTraceFlag = 'replace-me-with-mock-traceflag';
//   // this.set('mockTraceFlag', mockTraceFlag);

//   // this.set('onClickAction', async (traceFlag, numberOfHours) => {
//   //   assert.equal(traceFlag, mockTraceFlag);
//   //   assert.equal(numberOfHours, 1);
//   // });

// });
