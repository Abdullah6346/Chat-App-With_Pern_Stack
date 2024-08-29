class User {
  public name: string;
  private city: string; //hash can also be used #city
  public email: string;
  constructor(name: string, email: string, city: string) {
    this.name = name;
    this.email = email;
    this.city = city;
  }
}
class Readonly {
  readonly username: string;
  constructor(username: string) {
    this.username = username;
  }
}

const userone = new User("gladdy", "gladdy@.com", "Faisalabad");
// userone.city not possible
const user = new Readonly("gladdy");
// user.username Possible in Readonly
console.log(userone);

// TODO: Modern Way: to write classes constructures
class Students {
  constructor(public name: string, public email: string, private id: string) {}
}
const firstStudent = new Students("gladdy", "gladdy1234@gmail.com", "8-990-9");
const secondStudent = new Students("Umar", "Umar664@gmail.com", "890-98-98");
console.log(firstStudent, secondStudent);
export {};
//TODO:getters and setters and use of protected
class Student {
  protected _coursecount = 1;
  constructor(public name: string, public email: string, private id: string) {}
  get studentemail(): string {
    return `Email is ${this.email}`;
  }
  get coursecount(): number {
    return this._coursecount;
  }
  set coursecount(coursecount) {
    if (coursecount <= 1) {
      throw new Error("Not possible Beacause You are on a free trial ");
    }
    this._coursecount = coursecount;
  }
}
class SubStudent extends Student {
  // now I can use _course
  chang_course_count() {
    this._coursecount = 10;
    console.log(this._coursecount);
  }
}
const subabdullah = new SubStudent("Gladdy", "gladdy@gmail.com", "888");
subabdullah.chang_course_count();

const abdullah = new Student("Abdullah", "h@hgmail.com", "123");
// abdullah._coursecount

console.log(abdullah.coursecount);
