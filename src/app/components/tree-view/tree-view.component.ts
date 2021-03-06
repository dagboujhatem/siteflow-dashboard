import { Component, OnDestroy, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { TreeViewService } from 'src/app/services/tree-view.service';

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.css']
})
export class TreeViewComponent implements OnInit, OnDestroy {
  nodeData: any[] = [];
  searchQuery: any = "";
  loading = false;
  hoverIndex: any = -1;
  nodeGroup = "nodes";
  subNodeGroup = "subNodes";
  dragulaSubscription = new Subscription();

  constructor(private treeViewService: TreeViewService,
    private toasterService: ToastrService,
    private dragulaService: DragulaService) { }

  ngOnInit(): void {
    this.loadAllNodes();
    this.createDragulaSubscription();
    this.dragulaService.createGroup(this.nodeGroup, {
      direction: "horizontal",
      removeOnSpill: true,
      moves: (el, source, target: any) => {
        return target.classList.contains("card-header");
      },
    });
  }

  loadAllNodes() {
    this.loading = true;
    this.treeViewService.getAllNodes()
      .subscribe((response: any) => {
        this.loading = false;
        this.nodeData = response?.result;
      }, (error: any) => {
        console.log(error);
        this.loading = false;
      });
  }

  deleteNodeById(id: any) {
    this.treeViewService.deleteConfirmation().then((result) => {
      if (result.value) {
        this.treeViewService.deleteNodeByID(id)
          .subscribe((response: any) => {
            this.toasterService.success('Node has been deleted successfully.', '');
            this.loadAllNodes();
          }, (error: any) => {
            console.log(error);
          });
      }
    })
  }

  public enter(i: any) {
    this.hoverIndex = i;
  }

  public leave(i: any) {
    this.hoverIndex = null;
  }

  private createDragulaSubscription() {
    this.dragulaService.dropModel(this.nodeGroup).subscribe((args: any) => {
      this.treeViewService.saveOrderNode(args?.item?.id, args?.item?.position, args?.sourceIndex, args?.targetIndex)
          .subscribe((response: any) => {
            this.toasterService.success('Order has been deleted successfully.', '');
            this.nodeData = response?.result;
          }, (error: any) => {
            console.log(error);
          });
    });
  }

  ngOnDestroy() {
    this.dragulaSubscription.unsubscribe();
    this.dragulaService.destroy(this.nodeGroup);
  }
}
