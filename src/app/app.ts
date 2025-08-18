import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('auth-system');
  @ViewChild('bgVideo') bgVideo!: ElementRef<HTMLVideoElement>;
  isPaused:boolean = false;
  iconPath:string = '/assets/images/pause-icon.png';

  pauseVideo(){
    const video = this.bgVideo.nativeElement;

    if(video.paused) {
      video.play();
      this.isPaused = false;
      this.iconPath = '/assets/images/pause-icon.png';
    } else {
      video.pause();
      this.isPaused = true;
      this.iconPath = '/assets/images/play-icon.png';
    }
  }
}
