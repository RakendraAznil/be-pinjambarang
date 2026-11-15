import { IsString, IsNotEmpty, MinLength, IsIn } from 'class-validator';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Nama barang minimal harus 3 karakter.' })
  nama: string;

  @IsString()
  @IsIn(['Elektronik', 'Praktikum'], { message: 'Kategori harus Elektronik atau Praktikum.' })
  kategori: string;

  @IsString()
  @IsNotEmpty()
  pemilik: string;

  @IsString()
  @IsNotEmpty()
  deskripsi: string;
}