import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RoutingModule } from './app-routing.module';
import { BootstrapComponent } from './common/bootstrap.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';

import { SearchComponent } from './search/search.component';
import { SettingComponent } from './setting/setting.component';

@NgModule({
	declarations: [
		BootstrapComponent,
		SearchComponent,
		SettingComponent,
	],
	imports: [
		BrowserModule,
		RoutingModule,
		NoopAnimationsModule,
		MatToolbarModule,
		MatInputModule,
		MatAutocompleteModule,
		MatIconModule,
		FormsModule,
	],
	providers: [],
	bootstrap: [
		BootstrapComponent,
	],
})
export class AppModule { }
