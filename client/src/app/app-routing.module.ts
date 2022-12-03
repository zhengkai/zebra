import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchComponent } from './search/search.component';
import { SettingComponent } from './setting/setting.component';
import { BookmarkComponent } from './bookmark/bookmark.component';
import { HistoryComponent } from './history/history.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
	{ path: '', component: SearchComponent },
	{ path: 'setting', component: SettingComponent },
	{ path: 'bookmark', component: BookmarkComponent },
	{ path: 'history', component: HistoryComponent },
	{ path: 'about', component: AboutComponent },
	{ path: '**', redirectTo: '/' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class RoutingModule { }
