import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {firstValueFrom, map} from "rxjs";

const BASE_URL = 'http://localhost:4200/api/';
const PLAYER_MAC = '00:04:20:07:eb:17';
const HEADERS = { 'Content-Type': 'application/json' };
const FRED: string = '00:04:20:07:eb:17';

export interface Response {
  result: {
    value: string
  }
}

@Component({
  selector: 'app-audio',
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './audio.component.html',
  styleUrl: './audio.component.css'
})

export class AudioComponent {

  pauseState: boolean = false;
  constructor(private http: HttpClient) {
  }

  private getHeaders() {
    return { headers: HEADERS };
  }

  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): T => {
  //     // Log to console or send to remote logging infrastructure
  //     console.error(`${operation} failed: ${error.message}`);
  //     // Return an empty result to keep the app running
  //     return result as T;
  //   };
  // }

  private sendPost(payloadBody: object) {
    return this.http.post<any>(`${BASE_URL}jsonrpc.js`, payloadBody, this.getHeaders());
  }

  // Deprecated, make gooder :)
  private sendLMSCommand(playerName: string, action: string, command: string) {
    //{"id":1,"method":"slim.request","params":["00:04:20:07:eb:17",["mixer","volume","-2"]]}:

    const jcall = 'id:1' + '"method":"slim.request","params":["'+FRED+'",["mixer"';

    const theCall = 'status.html?' + 'player=' + FRED + '&p0=' + action + '&p1=' + command;
    return this.http.get<any>(theCall);
  }

  async playerPower(state: string): Promise<Response | undefined> {
    const payloadBody = {
      id: 1,
      method: "slim.request",
      params: [PLAYER_MAC, ['power', state]]
    };

    try {
      const response = await firstValueFrom(this.sendPost(payloadBody));
      // console.log('Power State Response:', response?.result);
      // You can do more with the response if required
      return response?.result; // Return the relevant part of the response
    } catch (error) {
      console.error('Error:', error);
      return undefined; // Handle the error as needed
    }
  }

  async powerOn() {
    const result = await this.playerPower('1');
    console.log('Power On Result:', result);
  }

  async powerOff() {
    const result = await this.playerPower('0');
    console.log('Power Off Result:', result);
  }

  async powerState() {
    const result = await this.playerPower('?');
    console.log('Power state Result:', result);
  }

  async sendButton(buttonName: string): Promise<Response | undefined> {
    const payloadBody = {
      id: 1,
      method: "slim.request",
      params: [PLAYER_MAC, ['button', buttonName]]
    };

    try {
      const response = await firstValueFrom(this.sendPost(payloadBody));
      // console.log('Button Response:', response?.result);
      // You can do more with the response if required
      return response?.result; // Return the relevant part of the response
    } catch (error) {
      console.error('Error:', error);
      return undefined; // Handle the error as needed
    }
  }

  async pause() {
    // Toggle
    this.pauseState = !this.pauseState;
    // Convert to string
    const pauseState = this.pauseState? 'pause': 'play';
    const result = await this.sendButton(pauseState);
    console.log('Pause button Result:', result);
  }

  async next() {
    const result = await this.sendButton('next');
    console.log('Next button Result:', result);
  }

  async previous() {
    const result = await this.sendButton('previous');
    console.log('Next button Result:', result);
  }

  async playerVolume(state: string): Promise<Response | undefined> {
    const payloadBody = {
      id: 1,
      method: "slim.request",
      params: [PLAYER_MAC, ['mixer', 'volume', state]]
    };

    try {
      const response = await firstValueFrom(this.sendPost(payloadBody));
      // console.log('Power State Response:', response?.result);
      // You can do more with the response if required
      return response?.result; // Return the relevant part of the response
    } catch (error) {
      console.error('Error:', error);
      return undefined; // Handle the error as needed
    }
  }

  async volumeState() {
    const result = await this.playerVolume('?');
    console.log('Volume state Result:', result);
  }

  async volume(level: string) {
    const result = await this.playerVolume(level);
    console.log('Volume button Result:', result);
  }

  async louder() {
    const result = await this.playerVolume('+2');
    console.log('Louder button Result:', result);
  }

  async softer() {
    const result = await this.playerVolume('-2');
    console.log('Softer button Result:', result);
  }

  async trackDetails(query: string): Promise<Response | undefined> {
    const payloadBody = {
      id: 1,
      method: "slim.request",
      params: [PLAYER_MAC, [query, '?']]
    };

    try {
      const response = await firstValueFrom(this.sendPost(payloadBody));
      // console.log('Power State Response:', response?.result);
      // You can do more with the response if required
      return response?.result; // Return the relevant part of the response
    } catch (error) {
      console.error('Error:', error);
      return undefined; // Handle the error as needed
    }
  }

  setStation(playerName: string, station: string) {
    this.sendLMSCommand(playerName, 'setStation', station).subscribe(result => {
      console.log(result);
    });
  }

async getTitle() {
  const result = await this.trackDetails('title');
  console.log('Song title Result:', result);
  }

  async getArtist() {
    const result = await this.trackDetails('artist');
    console.log('Song title Result:', result);
  }

  async getAlbum() {
    const result = await this.trackDetails('album');
    console.log('Song title Result:', result);
  }

  async getDuration() {
    const result = await this.trackDetails('duration');
    console.log('Song title Result:', result);
  }

  async getCurrentTitle() {
    const result = await this.trackDetails('current_title');
    console.log('Song title Result:', result);
  }

  async getPath() {
    const result = await this.trackDetails('path');
    console.log('Song title Result:', result);
  }

  async getRemote() {
    const result = await this.trackDetails('remote');
    console.log('Song title Result:', result);
  }

  async playListTracks(): Promise<Response | undefined> {
    const payloadBody = {
      id: 1,
      method: "slim.request",
      params: [PLAYER_MAC, ['playlist', 'tracks', '?']]
    };

    try {
      const response = await firstValueFrom(this.sendPost(payloadBody));
      console.log('Playlist tracks Response:', response?.result);
      // You can do more with the response if required
      return response?.result; // Return the relevant part of the response
    } catch (error) {
      console.error('Error:', error);
      return undefined; // Handle the error as needed
    }
  }

  async playListDetails(query:string, index: number): Promise<Response | undefined> {
    const payloadBody = {
      id: 1,
      method: "slim.request",
      params: [PLAYER_MAC, ['playlist', 'artist', index.toString(), '?']]
    };

    try {
      const response = await firstValueFrom(this.sendPost(payloadBody));
      // console.log('Playlist detail Response:', response?.result);
      // You can do more with the response if required
      return response?.result; // Return the relevant part of the response
    } catch (error) {
      console.error('Error:', error);
      return undefined; // Handle the error as needed
    }
  }

  async getplaylistArtist() {
    const result = await this.playListDetails('artist', 0);
    console.log('Song title Result:', result);
  }

  async getTime(): Promise<Response | undefined> {
    const payloadBody = {
      id: 1,
      method: "slim.request",
      params: [PLAYER_MAC, ['time', '?']]
    };

    try {
      const response = await firstValueFrom(this.sendPost(payloadBody));
      console.log('Time Response:', response?.result);
      // You can do more with the response if required
      return response?.result; // Return the relevant part of the response
    } catch (error) {
      console.error('Error:', error);
      return undefined; // Handle the error as needed
    }
  }

}
