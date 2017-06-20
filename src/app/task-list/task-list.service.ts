import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthHttp} from 'angular2-jwt';

@Injectable()
export class TaskListService {

  private static TASKS_ENDPOINT = 'https://wt-9c1d95c67ecbeba54daaeec5278641fa-0.run.webtask.io/tasks';

  constructor(private authHttp: AuthHttp) {
  }

  loadTasks$(): Observable<any> {
    return this.authHttp.get(TaskListService.TASKS_ENDPOINT);
  }

  addTask$(task): Observable<any> {
    return this.authHttp.post(TaskListService.TASKS_ENDPOINT, {description: task})
  }

  deleteTask$(task): Observable<any> {
    return this.authHttp.delete(TaskListService.TASKS_ENDPOINT + '?id=' + task._id);
  }


}
