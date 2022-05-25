import {Injectable} from '@nestjs/common';
import {CreateObjectDto} from "../dto/createObject.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {ObjectEntity} from "../dto/object.entity";
import {Repository} from "typeorm";
import {ObjectNotFoundException} from "../exceptions/ObjectNotFoundException";

@Injectable()
export class ObjectService {
    constructor(@InjectRepository(ObjectEntity) private readonly objectRepository: Repository<ObjectEntity>) {
    }

    findAll(): Promise<ObjectEntity[]> {
        return this.objectRepository.find();
    }

    async findById(id: number): Promise<ObjectEntity> {
        const objectEntity = await this.objectRepository.findOne(id);
        if (!objectEntity) {
            throw new ObjectNotFoundException()
        }
        return objectEntity;
    }

    createObject(createObjectDto: CreateObjectDto) {
        const objectEntity = this.objectRepository.create(createObjectDto);
        return this.objectRepository.save(objectEntity);
    }

    async remove(id: number): Promise<String> {
        //    const objects:ObjectEntity[]=[]
        //    objects.find((object)=>object.description==="tet")
        const deleteResult = await this.objectRepository.delete(id);
        if (deleteResult.affected) {
            return "object deleted"
        }
        //can add the message that we want and also the status
        throw new ObjectNotFoundException()
    }

}
