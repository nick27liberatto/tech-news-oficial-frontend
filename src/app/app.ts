import { AfterViewInit, Component, ElementRef, OnInit, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit{
  @ViewChild('bgVideo') bgVideo!: ElementRef<HTMLVideoElement>;
  isPaused:boolean = false;
  iconPath:string = '/assets/images/pause-icon.png';

   ngAfterViewInit(): void {
    const video = this.bgVideo.nativeElement;

    video.muted = true; 

    video.play().then(() => {
      this.isPaused = false;
    }).catch((err) => {
      console.warn("Autoplay bloqueado pelo navegador:", err);
      this.isPaused = true;
    });
  }

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
