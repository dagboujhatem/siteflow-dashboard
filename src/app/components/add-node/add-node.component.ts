import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TreeViewService } from 'src/app/services/tree-view.service';

@Component({
  selector: 'app-add-node',
  templateUrl: './add-node.component.html',
  styleUrls: ['./add-node.component.css']
})
export class AddNodeComponent implements OnInit {
  submitted = false;
  nodeForm?:FormGroup;
  constructor(private treeViewService: TreeViewService,
    private router:Router,
    private toasterService: ToastrService,
    private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    const nodeParam = this.activatedRoute.snapshot.params['parentNode'];
    const parentNode = nodeParam ? nodeParam : -1;
    this.nodeForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      parentNode: new FormControl(parentNode)
    });
  }

  createNewNode()
  {
    this.submitted = true;
    if(this.nodeForm?.invalid){
      return;
    }
    this.treeViewService.createNewNode(this.nodeForm?.value)
    .subscribe((response:any)=>{
      this.toasterService.success('Node has been added successfully.', '');
      this.router.navigateByUrl('/tree-view');
    }, (error:any)=>{
      console.log(error);
    });
  }

}
