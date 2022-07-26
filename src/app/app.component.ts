import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'infinite-scroll';
  data: number[] = [];
  uiState = { loading: true }

  @ViewChild('container') container!: ElementRef; 

  ngOnInit() {
    this.uiState.loading = true;
    setTimeout(() => {
      this.loadNextBatch(this.data);
      this.uiState.loading = false;
    }, 1000)

  }

  ngAfterViewInit() {
    const el = this.container.nativeElement;
    const isNearBottom = this.isNearBottom;
    const loadNextBatch = this.loadNextBatch;
    const uiState = this.uiState;
    const data = this.data;

    el.addEventListener('scroll', function() {
      if (el.scrollTop + el.offsetHeight >= el.scrollHeight - 100) {
          isNearBottom(uiState, loadNextBatch, data);
      }
    })
  }

  loadNextBatch(data: number[]) {
    for (let i = 1; i < 20; i++) {
      data.push(i * Math.random() * 1000)
    }
  }

  isNearBottom(uiState: { loading: boolean }, cb: Function, data: number[]) {
    if (uiState.loading) return;
    uiState.loading = true;
    setTimeout(() => {
      cb(data);
      uiState.loading = false;
    }, 1000)
  }
}
