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
export class App implements AfterViewInit, OnInit {
  @ViewChild('bgVideo') bgVideo!: ElementRef<HTMLVideoElement>;
  private themeService = inject(ThemeService);
  isPaused: boolean = false;
  backgroundPath: string = '';
  themeIcon: string = 'wb_sunny';
  videoIcon: string = 'pause';

  ngOnInit(): void {
    this.themeService.currentTheme.subscribe(value => {
      this.backgroundPath = `/assets/background/background-${value}-theme.mp4`;
      this.themeIcon = value === 'dark' ? 'wb_sunny' : 'nights_stay';
    });
  }

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
    return this.themeService.toggleTheme();
  }

  pauseVideo() {
    const video = this.bgVideo.nativeElement;

    if (video.paused) {
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
