import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RoutingModule } from './app-routing.module';
import { BootstrapComponent } from './common/bootstrap.component';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { SearchComponent } from './search/search.component';
import { SettingComponent } from './setting/setting.component';
import { BookmarkComponent } from './bookmark/bookmark.component';
import { HistoryComponent } from './history/history.component';
import { AboutComponent } from './about/about.component';

// import { A11yModule } from '@angular/cdk/a11y';
// import { CdkAccordionModule } from '@angular/cdk/accordion';
// import { ClipboardModule } from '@angular/cdk/clipboard';
// import { DragDropModule } from '@angular/cdk/drag-drop';
// import { PortalModule } from '@angular/cdk/portal';
// import { ScrollingModule } from '@angular/cdk/scrolling';
// import { CdkStepperModule } from '@angular/cdk/stepper';
// import { CdkTableModule } from '@angular/cdk/table';
// import { CdkTreeModule } from '@angular/cdk/tree';
// import { MatBadgeModule } from '@angular/material/badge';
// import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
// import { MatButtonToggleModule } from '@angular/material/button-toggle';
// import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
// import { MatChipsModule } from '@angular/material/chips';
// import { MatStepperModule } from '@angular/material/stepper';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatDialogModule } from '@angular/material/dialog';
// import { MatDividerModule } from '@angular/material/divider';
// import { MatExpansionModule } from '@angular/material/expansion';
// import { MatGridListModule } from '@angular/material/grid-list';
// import { MatListModule } from '@angular/material/list';
// import { MatMenuModule } from '@angular/material/menu';
// import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
// import { MatPaginatorModule } from '@angular/material/paginator';
// import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { MatRadioModule } from '@angular/material/radio';
// import { MatSelectModule } from '@angular/material/select';
// import { MatSidenavModule } from '@angular/material/sidenav';
// import { MatSliderModule } from '@angular/material/slider';
// import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
// import { MatTabsModule } from '@angular/material/tabs';
// import { MatTooltipModule } from '@angular/material/tooltip';
// import { MatTreeModule } from '@angular/material/tree';
// import { OverlayModule } from '@angular/cdk/overlay';
// import { CdkMenuModule } from '@angular/cdk/menu';
// import { DialogModule } from '@angular/cdk/dialog';

@NgModule({
	declarations: [
		BootstrapComponent,
		SearchComponent,
		SettingComponent,
		BookmarkComponent,
		HistoryComponent,
		AboutComponent,
	],
	imports: [
		BrowserModule,
		RoutingModule,
		// NoopAnimationsModule,
		BrowserAnimationsModule,
		FormsModule,
		MatFormFieldModule,
		HttpClientModule,

		MatToolbarModule,
		MatInputModule,
		MatIconModule,
		MatAutocompleteModule,
		MatButtonModule,
		MatCheckboxModule,
		MatProgressSpinnerModule,
	],
	providers: [],
	bootstrap: [
		BootstrapComponent,
	],
})
export class AppModule {
	ignore = [
		// A11yModule,
		// CdkAccordionModule,
		// CdkMenuModule,
		// CdkStepperModule,
		// CdkTableModule,
		// CdkTreeModule,
		// ClipboardModule,
		// DialogModule,
		// DragDropModule,
		// MatBadgeModule,
		// MatBottomSheetModule,
		// MatButtonToggleModule,
		// MatCardModule,
		// MatChipsModule,
		// MatDatepickerModule,
		// MatDialogModule,
		// MatDividerModule,
		// MatExpansionModule,
		// MatGridListModule,
		// MatListModule,
		// MatMenuModule,
		// MatNativeDateModule,
		// MatPaginatorModule,
		// MatProgressBarModule,
		// MatRadioModule,
		// MatRippleModule,
		// MatSelectModule,
		// MatSidenavModule,
		// MatSlideToggleModule,
		// MatSliderModule,
		// MatSnackBarModule,
		// MatSortModule,
		// MatStepperModule,
		MatTableModule,
		// MatTabsModule,
		// MatTooltipModule,
		// MatTreeModule,
		// OverlayModule,
		// PortalModule,
		// ScrollingModule,
	];
}
