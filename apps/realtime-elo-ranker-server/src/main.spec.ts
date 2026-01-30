import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

jest.mock('@nestjs/core', () => ({
    NestFactory: {
        create: jest.fn().mockResolvedValue({
            enableCors: jest.fn(),
            listen: jest.fn(),
            getHttpAdapter: jest.fn().mockReturnValue({
                getInstance: jest.fn(),
            }),
        }),
    },
}));

jest.mock('@nestjs/swagger', () => ({
    SwaggerModule: {
        createDocument: jest.fn(),
        setup: jest.fn(),
    },
    DocumentBuilder: jest.fn().mockImplementation(() => ({
        setTitle: jest.fn().mockReturnThis(),
        setDescription: jest.fn().mockReturnThis(),
        setVersion: jest.fn().mockReturnThis(),
        build: jest.fn(),
    })),
}));

describe('Main', () => {
    it('should bootstrap the application', async () => {
        // Import main to trigger bootstrap (if it autostarts) or call a function if exposed.
        // Since main.ts calls bootstrap() immediately, we can just require it.
        // However, usually we might want to refactor main.ts to verify it easily.
        // For now, let's just invoke the file and verify NestFactory.create was called.

        jest.isolateModules(async () => {
            const { AppModule } = require('./app.module');
            const { NestFactory } = require('@nestjs/core');
            require('./main');
            expect(NestFactory.create).toHaveBeenCalledWith(AppModule);
        });
    });
});
