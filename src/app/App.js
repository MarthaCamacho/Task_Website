import React, { Component, useDebugValue } from 'react';

//Prueba

class App extends Component {

    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            _id: '',
            tasks: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.addTask = this.addTask.bind(this);
    }

    addTask(e) {
        if (this.state._id) {
            console.log("AAAAAAAAAA");
            fetch(`/api/task/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    title: this.state.title,
                    description: this.state.description
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(() => {
                    M.toast({ html: 'Task Updated' });
                    this.setState({ _id: '', title: '', description: '' });
                    this.fetchTask();
                })
                .catch(err => console.error(err));
            e.preventDefault(); //Evita que se recargue la página
        } else {
            //Enviar al servidor datos
            fetch('/api/task', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(() => {
                    M.toast({ html: 'Task Saved' });
                    this.setState({
                        title: '',
                        description: ''
                    });
                    this.fetchTask();
                })
                .catch(err => console.error(err));
            e.preventDefault(); //Evita que se recargue la página
        }
    }

    deleteTask(id) {
        if (confirm('Are you sure you want delete it?')) {
            fetch(`/api/task/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data),
                        M.toast({ html: 'Task Deleted' });
                    this.fetchTask();
                });
        }
    }

    editTask(id) {
        fetch(`/api/task/${id}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    title: data.title,
                    description: data.description,
                    _id: data._id
                });
            });
    }

    componentDidMount() {
        this.fetchTask();
    }

    fetchTask() {
        fetch('/api/task')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({ tasks: data });
                console.log(this.state.tasks);
            });
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div>
                {/*Navigation*/}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">MERN</a>
                    </div>
                </nav>
                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field cols12">
                                                <input name="title" onChange={this.handleChange} type="text" placeholder="Task title" value={this.state.title} />
                                            </div>
                                            <div className="input-field cols12">
                                                <textarea name="description" onChange={this.handleChange} type="text" placeholder="Task description" className="materialize-textarea" value={this.state.description}>
                                                </textarea>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn light-blue darken-4">Send</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task => {
                                            return (
                                                <tr key={task._id}>
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
                                                    <td>
                                                        <button className="btn light-blue darken-4"><i className="material-icons" onClick={() => this.editTask(task._id)}>edit</i></button>
                                                        <button className="btn red darken-4" style={{ margin: "4px" }} onClick={() => this.deleteTask(task._id)}><i className="material-icons">delete</i></button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;