import {Module} from '@nestjs/common';
import {AppController} from '../controller/app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {typeOrmConfig} from "../config/typeorm.config";
import {ObjectsController} from '../controller/objects.controller';
import {ObjectService} from './object.service';
import {ObjectEntity} from "../dto/object.entity";
import {EurekaModule} from "nestjs-eureka";
import {ConfigModule} from '@nestjs/config';
import configurationYaml from '../config/configuration.yaml';


@Module({

    imports: [TypeOrmModule.forRoot(typeOrmConfig), TypeOrmModule.forFeature([ObjectEntity]),
        EurekaModule.forRoot({
            eureka: {
                host: 'localhost:',
                port: 8761,
                registryFetchInterval: 1000,
                servicePath: '',
                maxRetries: 3,
            },
            service: {
                name: 'objects',
                port: 3000,
            },
        }),
        // ConfigModule.forRoot(
        //     {isGlobal:true}
        // )
        ConfigModule.forRoot(({load: [configurationYaml]}))
    ],

    controllers: [AppController, ObjectsController],
    providers: [AppService, ObjectService],

})

export class AppModule {
}
