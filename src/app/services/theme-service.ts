import { DOCUMENT, Inject, Injectable, Renderer2, RendererFactory2 } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class ThemeService {
  private themeSubject: BehaviorSubject<string> = new BehaviorSubject('light');
  public currentTheme: Observable<string> = this.themeSubject.asObservable();

  private renderer: Renderer2;
  private readonly DARK_THEME_CLASS = 'dark-theme';
  private readonly STORAGE_KEY = 'theme';

  constructor(
    rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.loadInitialTheme();
  }

  private loadInitialTheme(): void {
    const savedTheme = localStorage.getItem(this.STORAGE_KEY);
    if (savedTheme) {
      this.themeSubject.next(savedTheme);
      if (savedTheme === 'dark') {
        this.renderer.addClass(this.document.body, this.DARK_THEME_CLASS);
      }
    }
  }

  toggleTheme() {
    const isDark = this.themeSubject.value === 'dark';
    const newTheme = isDark ? 'light' : 'dark';

    if (isDark) {
      this.renderer.removeClass(this.document.body, this.DARK_THEME_CLASS);
    } else {
      this.renderer.addClass(this.document.body, this.DARK_THEME_CLASS);
    }

    this.themeSubject.next(newTheme);

    localStorage.setItem(this.STORAGE_KEY, newTheme);
  }
}