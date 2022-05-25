import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Res,
    UploadedFile,
    UseInterceptors,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {CreateObjectDto} from "../dto/createObject.dto";
import {ObjectService} from "../service/object.service";
import {Response} from 'express';
import {FileInterceptor} from "@nestjs/platform-express";
import {Observable, of} from "rxjs";
import {diskStorage} from "multer";
import {join} from 'path';
import {ConfigService} from "@nestjs/config";
import path = require('path');

export const storage = {
    storage: diskStorage({
        destination: './uploads/profileimages',
        filename: (req, file, cb) => {
            const filename: string = path.parse(file.originalname).name
            const extension: string = path.parse(file.originalname).ext;

            cb(null, `${filename}${extension}`)
        }
    })

}

@Controller('objects')
export class ObjectsController {

    constructor(private readonly objectService: ObjectService, private configService: ConfigService) {
    }


    @Get()
    getObjects() {
        return this.objectService.findAll();
    }

    @Get('/:id')
    async getObjectById(@Param('id') id: number, @Res() res) {
        const object = this.objectService.findById(id);
        const photo = await object.then(data => data.photo);
        const name = this.configService.get<string>('name');

        return of(res.send(await object), res.sendFile(join(process.cwd(), 'uploads/profileimages/' + photo)))
    }

    @Post()
    @UseInterceptors(FileInterceptor('file', storage))
    @UsePipes(ValidationPipe)
    createObject(@Body() createObjectDto: CreateObjectDto, @UploadedFile() file) {
        createObjectDto.photo = file.originalname
        return this.objectService.createObject(createObjectDto)
    }

    @Delete('/:id')
    async deleteObject(@Param('id') id: number, @Res() res: Response) {
        return res
            .status(HttpStatus.ACCEPTED)
            .json(await this.objectService.remove(id));
    }

    @Post('/upload')
    @UseInterceptors(FileInterceptor('file', storage))
    uploadFile(@UploadedFile() file): Observable<Object> {
        console.log(file);
        return of({
            imagePath: file.originalname
        });
    }

    @Get("/photos/:image")
    findImageByName(@Res() res, @Param('image')image): Observable<Object> {
        return of(res.sendFile(join(process.cwd(), 'uploads/profileimages/' + image)));
    }

    @Get("/photos")
    findImages(): Observable<Object> {
        return of((join(process.cwd(), 'uploads/profileimages/')));
    }
}
