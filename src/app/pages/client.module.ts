import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { SharedModule } from 'src/shared.module';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { title: 'Home' } },
  { path: 'chat', component: ChatComponent, data: { title: 'Chat' } },
  { path: 'notifications', component: NotificationsComponent, data: { title: 'Notifications' } },
  { path: 'profile', component: ProfileComponent, data: { title: 'Profile' } },
  { path: 'search', component: SearchComponent, data: { title: 'Search' } },
  { path: 'settings', component: SettingsComponent, data: { title: 'Settings' } },
];

@NgModule({
  declarations: [HomeComponent, ChatComponent, NotificationsComponent, ProfileComponent, SearchComponent, SettingsComponent],
  imports: [
    RouterModule.forChild(routes), CommonModule, SharedModule.forRoot()
  ]
})
export class ClientModule { }
