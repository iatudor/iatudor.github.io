import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Project } from 'src/app/models/project';
import { FirebaseDBService } from 'src/app/services/firebase-db.service';
import * as ClassicEditor from '../../../ckeditor5/build/ckeditor';

@Component({
  selector: 'app-manage-projects',
  templateUrl: './manage-projects.component.html',
  styleUrls: ['./manage-projects.component.css']
})
export class ManageProjectsComponent {

  private _project: Project;
  private _projects: Project[] = [];
  public allProjectsTags: string[] = [];
  public tags: string = "";
  public mode: string = "add";
  public managing: boolean = false;
  public titleFilter: string = "";
  public dataEditor = ClassicEditor;
  public editorConfig: any = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fireDBService: FirebaseDBService) {

    //* Paràmetres filtre
    this.route.params.subscribe((params: Params) => {

      let tagFilter = params['tag_pro'];
      this.titleFilter = params['title_pro'];

      if (tagFilter != null)
        this.filterProjects(tagFilter);
      else if (this.titleFilter != null)
        this.filterProjects();
      else
        this.router.navigate(['manage']);
    });

    //* Obtenir tots els tags dels projectes
    this.fireDBService.getProjectsTags().subscribe(
      (oProjects: Project[]) => {
        oProjects.forEach(
          (oProject) => {
            oProject.tags.forEach(
              (oTag) => {
                //* Evitar duplicats
                if (this.allProjectsTags.includes(oTag) === false)
                  this.allProjectsTags.push(oTag);
              }
            )
          }
        )
      }
    );

    this._project = new Project();

    this.fireDBService.getProjects().subscribe(
      (oProjects: Project[]) => {
        this._projects = oProjects;
      });

    this.editorConfig = {
      toolbar: {
        items: [
          'undo', 'redo', '|', 'heading', '|', 'horizontalLine', '|',
          'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', 'link', 'bulletedList', 'numberedList', 'todoList', '|',
          'fontBackgroundColor', 'fontColor', 'fontsize', 'fontfamily', 'highlight', '|',
          'alignment', 'indent', 'outdent', '|',
          'code', 'codeBlock', 'htmlEmbed', '|',
          //'-', // break point
          'ckfinder', 'imageUpload', 'imageInsert', 'blockQuote', 'insertTable', 'mediaEmbed', '|',
          'MathType', 'ChemType', 'specialCharacters'
        ],
        shouldNotGroupWhenFull: true
      },
      image: {
        toolbar: [
          'imageStyle:full', 'imageStyle:side', '|',
          'imageTextAlternative'
        ],
        styles: ['full', 'side']
      }
    }
  }

  ngOnInit(): void { }

  get project(): Project {
    return this._project;
  }

  get projects(): Project[] {
    return this._projects;
  }

  clearProject() {
    this.mode = "add";
    this.managing = true;
    this.tags = "";
    this._project = new Project();
  }

  filterProjects(tag?: string) {

    if (tag) {
      //* LListar-los per tags
      this.fireDBService.getProjectsByTags(tag).subscribe(
        (oProjects: Project[]) => {
          this._projects = oProjects;
        });
    } else if (this.titleFilter != undefined && this.titleFilter != "") {
      //* Llisatar-los per filtre
      this.fireDBService.getProjectsByTitle(this.titleFilter).subscribe(
        (oProjects: Project[]) => {
          this._projects = oProjects;
        });
    } else { //* Llisatar-los tots
      this.fireDBService.getProjects().subscribe(
        (oProjects: Project[]) => {
          this._projects = oProjects;
        });
    }
  }

  loadProject(i: number, managing: boolean = true) {

    if (managing)
      this.managing = true;

    this.mode = "update";
    this._project = new Project();
    this._project.loadProject(this._projects[i]);

    this.tags = "";
    //* Obtenir els tags del projecte
    this._project.tags.forEach(
      (t) => {
        this.tags += " " + t;
      }
    );
    //* Eliminar el primer espai
    this.tags = this.tags.substring(1, this.tags.length);
  }

  addProject() {
    this.splitTags();
    this.fireDBService.addProjects(this._project);
    this.managing = false;
  }

  updateProject() {
    this.splitTags();
    this.fireDBService.updateProject(this._project.id, this._project);
    this.managing = false;
  }

  deleteProject(i: number) {
    this.fireDBService.deleteProject(this._projects[i].id);
  }

  projectsFound(): boolean {
    return this._projects.length > 0;
  }

  // onKeyDown(evt: KeyboardEvent): void {
  //   if (evt.key === "Enter")
  //     this.searchProjects();
  // }

  // searchProjects() {
  //   if (this.titleFilter == "") {
  //     this.fireDBService.getProjects().subscribe(
  //       (oProjects: Project[]) => {
  //         this._projects = oProjects;
  //       });
  //   } else {
  //     this.fireDBService.getProjectsByTitle(this.titleFilter).subscribe(
  //       (oProjects: Project[]) => {
  //         this._projects = oProjects;
  //       });
  //   }
  // }

  private splitTags() {
    let tagss = this.tags.split(" ");
    this._project.tags = tagss;
  }

  //* Si la imatge ha carregat correctament
  isImageLoaded() {

    let image = new Image();
    image.src = this._project.image;
    let isLoaded = image.complete && image.naturalHeight !== 0;

    return isLoaded;
  }

  onKeyDown(evt: KeyboardEvent): void {
    if (evt.key === "Enter")
      this.listProjectByTitle();
  }

  viewProject(id_pro: string) {
    this.router.navigate(['project', id_pro]);
  }

  listProjectByTitle() {
    this.router.navigate(['manage', 'title', this.titleFilter]);
  }

  listProjectByTag(tag_pro: string) { //*
    this.router.navigate(['manage', 'tags', tag_pro]);
  }
}
