import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(nodeList?: any[], searchQuery?: string): any[] {
   if(nodeList){
    if(searchQuery){
      return nodeList.filter((item:any)=> item?.name?.toLowerCase().includes(searchQuery?.toLowerCase()));
    }else {
     return nodeList;
    }
   }else {
    return [];
   }
  }

}
