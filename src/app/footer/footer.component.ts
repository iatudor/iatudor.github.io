import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {}

  // Header transparent si la ruta es /home
  getClassesIfRouteIsHome(classesToAdd: string): string {
    let route = 'home';
    let currRoute = this.router.url;
    let curr = currRoute.split('/', 2);

    if (curr[1] == route) return classesToAdd + ' bg-transparent';

    return classesToAdd + ' i-a';
  }
}
