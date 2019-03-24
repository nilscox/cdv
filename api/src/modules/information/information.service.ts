import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../user/user.entity';
import { Reaction } from '../reaction/reaction.entity';
import { ReactionService } from '../reaction/reaction.service';

import { SlugService } from './services/slug.service';
import { YoutubeService } from './services/youtube.service';
import { PaginationService } from './services/pagination.service';

import { Information } from './information.entity';
import { CreateInformationInDto } from './dtos/create-information-in.dto';

import * as labels from 'Utils/labels';

@Injectable()
export class InformationService {

  constructor(

    @InjectRepository(Information)
    private readonly informationRepository: Repository<Information>,

    @InjectRepository(Reaction)
    private readonly reactionRepository: Repository<Reaction>,

    private readonly reactionService: ReactionService,
    private readonly slugService: SlugService,
    private readonly youtubeService: YoutubeService,
    private readonly paginationService: PaginationService,

  ) {}

  async findAll(page: number = 1): Promise<Information[]> {
    return this.informationRepository.find(
      this.paginationService.paginationOptions(page),
    );
  }

  async findOne(where: object): Promise<Information> {
    const information = await this.informationRepository.findOne({ where });

    if (!information)
      return null;

    return information;
  }

  async findRootReactions(information: Information, page: number = 1): Promise<Reaction[]> {
    return this.reactionService.addRepliesCounts(await this.reactionRepository.find({
      where: { information, parent: null },
      ...this.paginationService.paginationOptions(page),
    }));
  }

  async create(dto: CreateInformationInDto, creator: User): Promise<Information> {
    const information = new Information();

    Object.assign(information, {
      ...dto,
      slug: this.slugService.slugify(dto.title),
      youtubeId: this.youtubeService.getYoutubeId(dto.url),
      creator,
    });

    return this.informationRepository.save(information);
  }

}
