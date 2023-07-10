import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { Model } from 'mongoose';
import { Match } from './entities/match.entity';
import { InjectModel } from '@nestjs/mongoose';
import { IMatch } from './interface/match.interface';

@Injectable()
export class MatchesService {
  constructor(@InjectModel(Match.name) private MatchModel: Model<IMatch>) { }

  async createMatch(createMatchDto: CreateMatchDto): Promise<IMatch> {
      console.log(Model<IMatch>);

      const newMatch = await new this.MatchModel(createMatchDto);
      return newMatch.save();
  }

  async updateMatch(MatchId: string, updateMatchDto: UpdateMatchDto): Promise<IMatch> {
      const existingMatch = await this.MatchModel.findByIdAndUpdate(MatchId, updateMatchDto, { new: true });
      if (!existingMatch) {
          throw new NotFoundException(`Match #${MatchId} not found`);
      }
      return existingMatch;
  }
  // async findAll(skip: number = 0, limit?: number, page?: number, keys?: { names?: string[] }) {

  //     let paginate = await this.utils.generatePaginationDate<IMatch>(this.MatchModel, 'Match', limit, skip, page, keys);

  //     return { ...paginate };
  // }
  async getAllMatchs(): Promise<IMatch[]> {
      const MatchData = await this.MatchModel.find();
      if (!MatchData || MatchData.length == 0) {
          throw new NotFoundException('Matchs data not found!');
      }
      return MatchData;
  }

  async getMatch(MatchId: string): Promise<IMatch> {
      const existingMatch = await this.MatchModel.findById(MatchId).exec();
      if (!existingMatch) {
          throw new NotFoundException(`Match #${MatchId} not found`);
      }
      return existingMatch;
  }

  async deleteMatch(MatchId: string): Promise<IMatch> {
      const deletedMatch = await this.MatchModel.findByIdAndDelete(MatchId);
      if (!deletedMatch) {
          throw new NotFoundException(`Match #${MatchId} not found`);
      }
      return deletedMatch;
  }
}