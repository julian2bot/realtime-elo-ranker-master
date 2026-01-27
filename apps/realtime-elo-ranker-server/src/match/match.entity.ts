import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Match {
    @PrimaryGeneratedColumn()
    id: number; // autoincremente 

    @Column()
    player1: string;

    @Column()
    player2: string;
    
    @Column()
    player1Rank: number;

    @Column()
    player2Rank: number;

    @Column()
    player1NewRank: number;

    @Column()
    player2NewRank: number;
}
