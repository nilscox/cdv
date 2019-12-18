import { IsEnum, IsOptional, IsString, IsInt, IsIn, MaxLength } from 'class-validator';

export class CreateReactionInDto {

  @IsInt()
  readonly informationId: number;

  @IsInt()
  @IsOptional()
  readonly subjectId?: number;

  @IsOptional()
  @IsInt()
  readonly parentId?: number;

  @IsString()
  @MaxLength(40000)
  readonly text: string;

}
