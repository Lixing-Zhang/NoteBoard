'use strict';

var Board = React.createClass({
  displayName: 'Board',

  propTypes: {
    count: function count(props, propName) {
      if (typeof props[propName] !== 'number') {
        return new Error('The count property must be a number');
      }

      if (props[propName] > 100) {}
      return new Error('Creating ' + props[propName] + ' notes is too much');
    }
  },

  getInitialState: function getInitialState() {
    return {
      notes: []
    };
  },

  nextId: function nextId() {
    this.uniqueId = this.uniqueId || 0;
    return this.uniqueId++;
  },

  componentWillMount: function componentWillMount() {
    var self = this;

    if (this.props.count) {
      $.getJSON("http://baconipsum.com/api/?type=all-meat&sentences=" + this.props.count + "&start-with-lorem=1&callback=?", function (results) {
        results[0].split('. ').forEach(function (sentence) {
          self.add(sentence.substring(0, 40));
        });
      });
    }
  },

  add: function add(text) {
    var arr = this.state.notes;
    arr.push({
      id: this.nextId(),
      note: text
    });
    this.setState({ notes: arr });
  },

  update: function update(newText, i) {
    var arr = this.state.notes;
    arr[i].note = newText;
    this.setState({ notes: arr });
  },

  remove: function remove(i) {
    var arr = this.state.notes;
    arr.splice(i, 1);
    this.setState({ notes: arr });
  },

  eachNote: function eachNote(note, i) {
    return React.createElement(
      Note,
      { key: note.id, index: i, onChange: this.update, onRemove: this.remove },
      note.note
    );
  },

  render: function render() {
    return React.createElement(
      'div',
      { className: 'board' },
      this.state.notes.map(this.eachNote),
      React.createElement('button', { className: 'btn btn-sm btn-success glyphicon glyphicon-plus', onClick: this.add.bind(null, "New Note") })
    );
  }

});