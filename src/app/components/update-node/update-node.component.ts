import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TreeViewService } from 'src/app/services/tree-view.service';

@Component({
  selector: 'app-update-node',
  templateUrl: './update-node.component.html',
  styleUrls: ['./update-node.component.css']
})
export class UpdateNodeComponent implements OnInit {
  submitted = false;
  nodeForm?:FormGroup;
  id?:any;

  constructor(private treeViewService: TreeViewService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private toasterService: ToastrService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.loadNodeData();
    this.nodeForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });
  }

  loadNodeData(){
    this.treeViewService.getNodeByID(this.id)
    .subscribe((response:any)=>{
      this.nodeForm?.patchValue(response?.result);
    }, (error:any)=>{
      console.log(error);
    });
  }

  updateNode()
  {
    this.submitted = true;
    if(this.nodeForm?.invalid){
      return;
    }
    this.treeViewService.updateNodeByID(this.id, this.nodeForm?.value)
    .subscribe((response:any)=>{
      this.toasterService.success('Node has been updated successfully.', '');
      this.router.navigateByUrl('/tree-view');
    }, (error:any)=>{
      console.log(error);
    });
  }


}
