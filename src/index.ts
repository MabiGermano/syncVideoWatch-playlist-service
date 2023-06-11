import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./models/User";

createConnection().then(async connection => {


}).catch(error => console.log(error));
