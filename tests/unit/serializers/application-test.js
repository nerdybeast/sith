import { moduleFor, test } from 'ember-qunit';
import attr from 'ember-data/attr';
import Model from 'ember-data/model';
import wait from 'ember-test-helpers/wait';
import { getOwner } from '@ember/application';

moduleFor('serializer:application', 'Unit | Serializer | application', {
  // Specify the other units that are required for this test.
});

// Replace this with your real tests.
test('it serializes records', function(assert) {

  const owner = getOwner(this);
  const store = owner.lookup('service:store');

  // create a dummy model for application
  let DummyModel = Model.extend({
      name: attr('string'),
      address: attr('string')
  });
  
  owner.register('model:application', DummyModel);

  let basicModel = {
      name: 'Test Name',
      address: 'SOme Dummy Address'
  };

  let expectedHash = {
      data: {
          attributes: {
              name: basicModel.name,
              address: basicModel.address
          },
          type: 'applications'
      }
  };

  return wait().then(() => {
      // Create an instance of DummyModel and serialize
      let serializedRecord = store.createRecord('application', basicModel).serialize();
      assert.deepEqual(serializedRecord, expectedHash);
  });
});
