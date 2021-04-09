export class Project {
  private _id: string;
  private _title: string;
  private _desc: string;
  private _image: string;
  private _html: string;
  private _tags: string[];

  constructor() {
    this._id = "";
    this._title = "";
    this._desc = "";
    this._image = "";
    this._html = "";
    this._tags = [];
  }

  public loadProject(pro: Project) {
    this._id = pro.id;
    this._title = pro.title;
    this._desc = pro.desc;
    this._image = pro.image;
    this._html = pro.html;
    this._tags = pro.tags;
  }

  public get id(): string {
    return this._id;
  }

  public set id(id: string) {
    this._id = id;
  }

  public get title(): string {
    return this._title;
  }

  public set title(title: string) {
    this._title = title;
  }

  public get desc(): string {
    return this._desc;
  }

  public set desc(desc: string) {
    this._desc = desc;
  }

  public get image(): string {
    return this._image;
  }

  public set image(image: string) {
    this._image = image;
  }

  public get html(): string {
    return this._html;
  }

  public set html(html: string) {
    this._html = html;
  }

  public get tags(): string[] {
    return this._tags;
  }

  public set tags(tags: string[]) {
    this._tags = [];
    tags.forEach(t => {
      this._tags.push(t);
    });
  }
}
