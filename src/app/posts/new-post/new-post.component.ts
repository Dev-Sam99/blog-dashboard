import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {
   permalink = '';
  constructor(){}

  ngOnInit(): void {
    
  }
  onTitleChanged(e){
    let val = e.target.value;
    console.log(val);
    this.permalink = val.trim().replace(/\s+/g,'-');
    console.log(this.permalink);
  }

}
