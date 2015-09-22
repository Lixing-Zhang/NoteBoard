/**
 * Created by JACK on 2015/9/22.
 */

var Note = React.createClass({
  render : function() {
    return (
        <div className="note">
          <span>
            <button className="btn btn-primary glyphicon glyphicon-pencil"></button>
            <button className="btn btn-danger glyphicon glyphicon-trash"></button>
          </span>
        </div>
    );
  }
});


React.render(<Note>Hello world</Note>, document.getElementById('react-container'));