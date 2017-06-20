import {Component, OnInit} from '@angular/core';
import {TaskListService} from './task-list.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  private tasks: String[];

  constructor(private taskListService: TaskListService) {
  }

  ngOnInit() {
    this.loadTasks();
  }

  private loadTasks() {
    this.taskListService.loadTasks$().subscribe(response => this.tasks = response.json(), error => console.log(error));
  }

  taskAddedHandler(task) {
    this.taskListService.addTask$(task).subscribe(response => this.loadTasks(), error => console.log());
  }

  deleteTask(task) {
    this.taskListService.deleteTask$(task).subscribe(response => this.loadTasks(), error => console.log());
  }

}
