import express, { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";

interface DbConfig {
    host: string;
    user: string;
    password: string;
    database: string;
}

class AuthRouter{
    router: Router
    dbConfig: DbConfig;
}