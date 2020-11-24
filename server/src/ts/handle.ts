import { Connection } from "typeorm";

export class Handle {
    public static dbConnection: Connection; //싱글톤 으로 만들어야함.
}