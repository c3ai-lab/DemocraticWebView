import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router, public storageService: StorageService) { }

  ngOnInit(): void {
  }

  public navigateThroughSidebar(page: string): void {
    this.router.navigate(['/' + page]);
  }

}
