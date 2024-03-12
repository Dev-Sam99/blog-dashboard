import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlPostComponent } from './al-post.component';

describe('AlPostComponent', () => {
  let component: AlPostComponent;
  let fixture: ComponentFixture<AlPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlPostComponent]
    });
    fixture = TestBed.createComponent(AlPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
