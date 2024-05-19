import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  private readonly currencyApiKey = this.configService.get(
    'currencyExchangeApiKey',
  );

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly dataSource: DataSource,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async getRate(): Promise<number> {
    if (!this.currencyApiKey) {
      throw new InternalServerErrorException(
        'Missing env variable for currency exchange API',
      );
    }

    try {
      const url = `https://api.currencybeacon.com/v1/latest?base=USD&symbols=UAH&api_key=${this.currencyApiKey}`;

      const { data } = await firstValueFrom(this.httpService.get(url));

      return data.rates.UAH;
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException('Invalid status value');
    }
  }

  async subscribe(email?: string) {
    if (!email) {
      throw new BadRequestException('Invalid payload');
    }

    try {
      const user = await this.usersRepository.findOne({ where: { email } });

      if (!!user) {
        throw new ConflictException(
          'User with this email is already subscribed',
        );
      }

      const newUser = await this.usersRepository.create({ email });
      await this.usersRepository.save(newUser);
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  async getSubscribers(): Promise<any> {
    try {
      return this.usersRepository.find();
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException();
    }
  }
}
