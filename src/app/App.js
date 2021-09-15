import React, { Component, useDebugValue } from 'react';

class App extends Component {

    constructor() {
        super();
        this.state = {
            title: '',
            description: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.addTask = this.addTask.bind(this);
    }

    addTask(e) {
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
            .then(data => {
                M.toast({html: 'Task Saved'});
                this.setState({
                    title:'',
                    description:''
                });
            })
            .catch(err => console.error(err));
        e.preventDefault(); //Evita que se recargue la página
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
                                                <input name="title" onChange={this.handleChange} type="text" placeholder="Task title" value={this.state.title}/>
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

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;