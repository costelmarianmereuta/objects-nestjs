import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('objects')
export class ObjectEntity extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: "bigint",
        comment: 'the quiz unique identifier'
    })
    id: number
    @Column({
        type: "varchar",
        nullable: false
    })
    name: string

    @Column({
        type: "varchar",
        nullable: false
    })
    description: string
    @Column({
        type: "varchar"
    })
    photo: string
    @Column({
        type: "tinyint"
    })
    active: boolean
    @Column({
        type: "bigint",
    })
    idUser: number
}