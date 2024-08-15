import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { AudioComponent } from './components/audio/audio.component';
import { CamerasComponent } from './components/cameras/cameras.component';
import { LightsComponent } from './components/lights/lights.component';
import { ServersComponent } from './components/servers/servers.component';
import { WeatherComponent } from './components/weather/weather.component';

export const routes: Routes = [  { path: '', component: WelcomeComponent },
  { path: 'audio', component: AudioComponent },
  { path: 'cameras', component: CamerasComponent },
  { path: 'lights', component: LightsComponent },
  { path: 'servers', component: ServersComponent },
  { path: 'weather', component: WeatherComponent },
];
