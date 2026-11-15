import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  private items: Item[] = [
    {
      id: 1,
      nama: 'Kabel Roll 10 Meter',
      kategori: 'Elektronik',
      pemilik: 'Mahasiswa SE-1',
      deskripsi: 'Kondisi normal siap pakai untuk praktikum.',
      status: true,
    },
    {
      id: 2,
      nama: 'Proyektor Epson',
      kategori: 'Elektronik',
      pemilik: 'Mahasiswa SE-2',
      deskripsi: 'Resolusi HD, kabel HDMI lengkap.',
      status: true,
    },
  ];

  create(createItemDto: CreateItemDto): Item {
    const newItem: Item = {
      id: Date.now(),
      nama: createItemDto.nama,
      kategori: createItemDto.kategori,
      pemilik: createItemDto.pemilik,
      deskripsi: createItemDto.deskripsi,
      status: true,
    };
    this.items.push(newItem);
    return newItem;
  }

  findAll(): Item[] {
    return this.items;
  }

  findOne(id: number): Item {
    if (isNaN(id)) {
      throw new BadRequestException('ID harus berupa angka yang valid.');
    }
    const item = this.items.find((i) => i.id === id);
    if (!item) {
      throw new NotFoundException(`Item dengan ID ${id} tidak ditemukan.`);
    }
    return item;
  }

  update(id: number, updateItemDto: UpdateItemDto): Item {
    const itemIndex = this.items.findIndex((i) => i.id === id);
    if (itemIndex === -1) {
      throw new NotFoundException(
        `Gagal mengupdate: Item dengan ID ${id} tidak ditemukan.`,
      );
    }

    this.items[itemIndex] = {
      ...this.items[itemIndex],
      ...updateItemDto,
    };
    return this.items[itemIndex];
  }

  remove(id: number) {
    const itemIndex = this.items.findIndex((i) => i.id === id);
    if (itemIndex === -1) {
      throw new NotFoundException(
        `Gagal menghapus: Item dengan ID ${id} tidak ditemukan.`,
      );
    }
    const deleted = this.items.splice(itemIndex, 1);
    return { message: `Item dengan ID ${id} berhasil dihapus`, deleted };
  }
}
