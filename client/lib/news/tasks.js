import { Template } from 'meteor/templating';
import './tasks.html';


Template.task.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Tasks.update(this._id, {
      $set: { checked: ! this.checked },
    });
  },
  'click .delete'() {
    News.remove(this._id);
  },
});
