import { moduleForModel, test } from 'ember-qunit';

moduleForModel('sobject-metadata-base', 'Unit | Serializer | sobject metadata base', {
  // Specify the other units that are required for this test.
  needs: ['serializer:sobject-metadata-base']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
