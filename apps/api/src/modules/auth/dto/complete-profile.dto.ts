import { IsString, MinLength, MaxLength } from 'class-validator';

export class CompleteProfileDto {
  @IsString()
  @MinLength(2, { message: 'نام باید حداقل ۲ کاراکتر باشد' })
  @MaxLength(50, { message: 'نام نباید بیشتر از ۵۰ کاراکتر باشد' })
  name: string;
}
