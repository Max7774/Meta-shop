import { Injectable } from '@nestjs/common';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class PaginationService {
  getPagination(dto: PaginationDto, defaultPerPage = 10) {
    const page = dto.page ? +dto.page : 1;
    const perPage = dto.perPage ? +dto.perPage : defaultPerPage;

    const skip = (page - 1) * perPage;

    return { perPage, skip };
  }
}
