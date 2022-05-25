import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TreeViewService } from 'src/app/services/tree-view.service';

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.css']
})
export class TreeViewComponent implements OnInit {
  nodeData?: any[];
  searchQuery: any="";
  loading = false;
  hoverIndex:any = -1;
  constructor(private treeViewService: TreeViewService,
    private toasterService: ToastrService) { }

  ngOnInit(): void {
    this.loadAllNodes();
  }

  loadAllNodes(){
    this.loading = true;
    this.treeViewService.getAllNodes()
    .subscribe((response:any)=>{
      this.loading = false;
      this.nodeData = response?.result;
    }, (error:any)=>{
      console.log(error);
      this.loading = false;
    });
  }

  deleteNodeById(id:any){
    this.treeViewService.deleteConfirmation().then((result) => {
      if (result.value) {
        this.treeViewService.deleteNodeByID(id)
        .subscribe((response:any)=>{
          this.toasterService.success('Node has been deleted successfully.', '');
          this.loadAllNodes();
        }, (error:any)=>{
          console.log(error);
        });
      }
    })
  }

  public enter(i:any) {
    this.hoverIndex = i;
   }

   public leave(i:any) {
    this.hoverIndex = null;
   }

}
