import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TreeViewService } from 'src/app/services/tree-view.service';

@Component({
  selector: 'app-add-node',
  templateUrl: './add-node.component.html',
  styleUrls: ['./add-node.component.css']
})
export class AddNodeComponent implements OnInit {
  submitted = false;
  nodeForm?:FormGroup;
  constructor(private treeViewService: TreeViewService, private router:Router) { }

  ngOnInit(): void {
    this.nodeForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
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
      this.router.navigateByUrl('/tree-view');
    }, (error:any)=>{
      console.log(error);
    });
  }

}
