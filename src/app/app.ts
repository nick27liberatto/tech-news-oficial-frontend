import { AfterViewInit, Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit{
  @ViewChild('bgVideo') bgVideo!: ElementRef<HTMLVideoElement>;
  private themeService = inject(ThemeService);
  isPaused:boolean = false;
  backgroundPath:string = '/assets/background/grid-sci-fi-background-dark.mp4';
  themeIcon:string = 'wb_sunny';
  videoIcon:string = 'pause';

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

  toggleTheme() {
    this.themeService.toggleTheme();
    this.themeIcon = this.themeIcon == 'wb_sunny' ? 'nights_stay' : 'wb_sunny';
    this.backgroundPath = this.backgroundPath == 
    '/assets/background/grid-sci-fi-background-dark.mp4' ?
    '/assets/background/grid-sci-fi-background-light.mp4' :
    '/assets/background/grid-sci-fi-background-dark.mp4';
  }

  pauseVideo(){
    const video = this.bgVideo.nativeElement;

    if(video.paused) {
      video.play();
      this.isPaused = false;
      this.videoIcon = 'pause';
    } else {
      video.pause();
      this.isPaused = true;
      this.videoIcon = 'play_arrow';
    }
  }
}
