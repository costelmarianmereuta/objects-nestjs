import {IsNotEmpty, MinLength} from "class-validator"

export class CreateObjectDto {


    @IsNotEmpty()
    @MinLength(3)
    name: string;

    @IsNotEmpty()
    @MinLength(10)
    description: string;

    photo: string;
    active: boolean;
    idUser: number;


    set setPhoto(value: string) {
        this.photo = value;
    }
}