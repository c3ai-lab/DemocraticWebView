import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VotesPage } from './pages/votes/votes.component';
import { PollsPage } from './pages/polls/polls.component';

const routes: Routes = [
  { path: '', redirectTo: 'polls', pathMatch: 'full'},
  //{ path: 'repositories', component: RepositoriesPage},
  //{ path: 'pullrequests/:repoid/:reponame', component: PullrequestPage},
  { path: 'votes/:pullid', component: VotesPage},
  { path: 'polls', component: PollsPage}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
