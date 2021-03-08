import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {}

  // Header transparent si la ruta és /home
  getClassesIfRouteIsHome(classesToAdd: string): string {
      
    let route = 'home';
    let currRoute = this.router.url;
    let curr = currRoute.split('/', 2);

    if (curr[1] == route) return classesToAdd + ' bg-transparent';

    return classesToAdd + ' i-a';
  }
}
