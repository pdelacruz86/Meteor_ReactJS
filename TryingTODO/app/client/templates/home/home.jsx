/**
 * Created by pdelacruz on 9/26/15.
 */
Home = React.createClass({

    mixins: [ReactMeteorData],

    getMeteorData() {
        return {
            tasks : Tasks.find( {}, {$sort : { createdAt : -1 }} ).fetch()
        }
    },


    renderTasks() {
        return this.data.tasks.map((task) => {
                        return <Task key={task._id} task={task} />;
        });
    },

    render() {
        return (
            <div className="container">
                <header>
                <h1>Todo List</h1>

                <form className="new-task" onSubmit={this.handleSubmit} >
                    <input
                        type="text"
                        ref="textInput"
                        placeholder="Type to add new tasks" />
                </form>

                </header>

                <ul>
                    {this.renderTasks()}
                </ul>
            </div>
    );
    },

    handleSubmit(evt) {
        evt.preventDefault();

        var text = React.findDOMNode(this.refs.textInput).value.trim();

        Tasks.insert({
            text : text,
            createdAt : new Date()
        });

        //clear text input
        React.findDOMNode(this.refs.textInput).value = '';

    }

    });


Task = React.createClass({
    propTypes :  {
        task:  React.PropTypes.object.isRequired
    },

    toggleChecked() {
        Tasks.update(
            this.props.task._id
            ,{
                $set : {checked : ! this.props.task.checked}
            }
        )
    },
    deleteThisTask() {
        var valud = confirm("are you sure?");

        if(valud)
            Tasks.remove(this.props.task._id)
    },
    render() {

        const taskClassName = this.props.task.checked ? "checked" : "";

        return (
            <li className={taskClassName}>
                <button className="delete" onClick={this.deleteThisTask}>
                &times;
                </button>

                <input
                    type="checkbox"
                    readOnly={true}
                    checked={this.props.task.checked}
                    onClick={this.toggleChecked} />

                <span className="text">{this.props.task.text}</span>
            </li>
        )

    }
})