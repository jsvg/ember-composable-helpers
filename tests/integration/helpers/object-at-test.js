import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const { A: emberArray, run } = Ember;

moduleForComponent('object-at', 'Integration | Helper | {{object-at}}', {
  integration: true
});

test('It gets an object by index', function(assert) {
  this.set('array', ['apples', 'oranges', 'bananas']);
  this.set('index', 1);

  this.render(hbs`{{object-at index array}}`);

  assert.equal(this.$().text().trim(), 'oranges', 'the correct object is displayed');
});

test('It returns undefined with the index is outside the bounds of the array', function(assert) {
  this.set('array', ['apples', 'oranges', 'bananas']);
  this.set('index', 5);

  this.render(hbs`{{if (object-at index array) 'true' 'false'}}`);

  assert.equal(this.$().text().trim(), 'false', 'the returned value is falsey');
});

test('It returns an updated value when the object at the given index changes', function(assert) {
  this.set('array', emberArray(['apples', 'oranges', 'bananas']));
  this.set('index', 1);

  this.render(hbs`{{object-at index array}}`);

  assert.equal(this.$().text().trim(), 'oranges', 'the original object is display');

  run(() => this.get('array').removeAt(1, 1));

  assert.equal(this.$().text().trim(), 'bananas', 'the new object is displayed');
});

test('It returns undefined if using an non-array-like object', function(assert) {
  this.set('array', 'foo');
  this.set('index', 1);

  this.render(hbs`{{object-at index array}}`);

  assert.equal(this.$().text().trim(), '', 'nothing is displayed');
});
