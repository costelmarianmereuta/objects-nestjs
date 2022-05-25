import {TypeOrmModuleOptions} from "@nestjs/typeorm";
import {entities} from "../dto";

export const typeOrmConfig: TypeOrmModuleOptions = {

    type: 'mysql',
    host: 'localhost',
    port: 3308,
    username: 'root',
    password: 'root',
    database: 'objects',
    entities: entities,
    synchronize: true,
}