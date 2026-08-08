import { IsString, IsOptional, IsInt, MinLength, MaxLength } from 'class-validator';

export class CreateSectionDto {
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  title: string;

  @IsString()
  courseId: string;

  @IsOptional()
  @IsInt()
  order?: number;
}
