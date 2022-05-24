import { Component, OnInit } from '@angular/core';
import { TreeViewService } from 'src/app/services/tree-view.service';

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.css']
})
export class TreeViewComponent implements OnInit {
  nodeData?: any[];
  searchQuery: any="";
  constructor(private treeViewService: TreeViewService) { }

  ngOnInit(): void {
    this.loadAllNodes();
  }

  loadAllNodes(){
    this.treeViewService.getAllNodes()
    .subscribe((response:any)=>{
      this.nodeData = response?.result;
    }, (error:any)=>{
      console.log(error);
    });
  }

  deleteNodeById(id:any){
    this.treeViewService.deleteNodeByID(id)
    .subscribe((response:any)=>{
      this.loadAllNodes();
    }, (error:any)=>{
      console.log(error);
    });
  }

}
