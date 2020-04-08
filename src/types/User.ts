export class User {
    id: string;
    name: string;
    email: string;

    constructor(id: string, name: string, email: string = "") {
        this.id = id;
        this.name = name;
        this.email = email;
    }
}

export class UserCreationDto {
    name: string;
    email: string;

    constructor(name: string, email: string = "") {
        this.name = name;
        this.email = email;
    }
}
