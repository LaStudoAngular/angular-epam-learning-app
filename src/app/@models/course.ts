import { Author } from './author';

export class Course {
  constructor(
    public name: string,
    public description: string,
    public isTopRated: boolean,
    public date: string,
    public authors: Author[],
    public length: number,
    public id?: number,
  ) {}
}
