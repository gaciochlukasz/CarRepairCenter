import { MatPaginatorIntl } from '@angular/material';

export class PLPaginator {
    getPaginatorIntl(): MatPaginatorIntl {
        const paginatorIntl = new MatPaginatorIntl();
        paginatorIntl.itemsPerPageLabel = 'Elementów na stronie:';
        paginatorIntl.nextPageLabel = 'Pierwsza strona';
        paginatorIntl.previousPageLabel = 'Poprzednia strona';
        paginatorIntl.firstPageLabel = 'Pierwsza strona';
        paginatorIntl.lastPageLabel = 'Ostatnia strona';
        paginatorIntl.getRangeLabel = this.getRangeLabel.bind(this);
        return paginatorIntl;
    }

    private getRangeLabel(page: number, pageSize: number, length: number): string {
        if (length === 0 || pageSize === 0) {
            return '1';
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return '2';
    }
}
