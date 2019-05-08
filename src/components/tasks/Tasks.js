import React, { Component } from 'react';
   import Row from 'react-bootstrap/Row';
   import Col from 'react-bootstrap/Col';
   import List from './list/List';
   import CreateTask from './create_tasks/CreateTasks';
   import Button from 'react-bootstrap/Button';

  class Tasks extends Component {

    constructor(props) {
      super(props);
      this.state = {
        tasks: []
      };
      this.loadTasks = this.loadTasks.bind(this);
    }
    
    async loadTasks() {
      let response = await fetch(`https://gentle-beyond-69584.herokuapp.com/tasks`);
      const tasks = await response.json();
      this.setState({ tasks: tasks });
    }

    async deleteDoneTask(tasks) {
      if (window.confirm(`Are you sure you want to delete?"`)) {
      }
      // this.props.loadTasks();
    }
    
    componentDidMount() {
      this.loadTasks();
    }

    filterDoneTasks() {
      return this.state.tasks.filter((task) => task.done == true)
    }

    render() {
       return (
         <Row>
           <Col xs={{ span: 8, offset: 2 }} className="tasks_list">
             <p className="title">To-do</p>
             <List loadTasks={this.loadTasks} tasks={this.state.tasks.filter((task) => task.done != true)}/>
             <CreateTask loadTasks={this.loadTasks}/>
           </Col>
           <Col xs={{ span: 8, offset: 2 }} className="tasks_list">
             <p className="title">Done</p>
             <List loadTasks={this.loadTasks} tasks={this.state.tasks.filter((task) => task.done == true)}/> 
             <Button variant="red" className="float-right remove_tasks_btn" onClick={() => this.deleteDoneTask(this.filterDoneTasks())}>Remove all tasks</Button>
           </Col>
         </Row>
       );
    }

  }
   
   export default Tasks;