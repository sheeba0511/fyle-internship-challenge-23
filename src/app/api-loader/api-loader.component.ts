import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-api-loader',
  templateUrl: './api-loader.component.html',
  styleUrls: ['./api-loader.component.scss']
})
export class ApiLoaderComponent {
  @Input() type = "line" ;
  @Input() animation = 'progress';
  @Input() style: any;
  @Input() count = 1;
  css: Object = {}

  ngOnInit(): void {
    this.css = { 'background-color': '#354650', 'border-radius': '12px', border: '1px solid transparent', ...this.style }
  }

}
