import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(nodeList?: any[], searchQuery?: string): any[] {
    if (nodeList) {
      if (searchQuery) {
        const searchTerm = searchQuery?.toLowerCase();
        return nodeList.filter((item: any) => {
          return this.lookForNestedObject(item, searchTerm);
        });
      } else {
        return nodeList;
      }
    } else {
      return [];
    }
  }

  lookForNestedObject(item: any, searchTerm: any): boolean {
    return (
      item?.name?.toLowerCase().includes(searchTerm) ||
      item?.children.some((item: any) => item?.name?.toLowerCase().includes(searchTerm))
    );
  }

}
