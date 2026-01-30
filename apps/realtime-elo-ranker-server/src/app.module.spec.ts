import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('AppModule', () => {
    let module: TestingModule;

    beforeEach(async () => {
        module = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideProvider(TypeOrmModule)
            .useValue({})
            .compile();
    });

    it('should be defined', () => {
        expect(module).toBeDefined();
        expect(module.get(AppService)).toBeDefined();
        expect(module.get(AppController)).toBeDefined();
    });
});
