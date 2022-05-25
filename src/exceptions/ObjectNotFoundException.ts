import {HttpException, HttpStatus} from "@nestjs/common";

export class ObjectNotFoundException extends HttpException {

    constructor(msg?: string, status?: HttpStatus) {
        super(msg || "object not found with this id", status || HttpStatus.NOT_FOUND);
    }
}