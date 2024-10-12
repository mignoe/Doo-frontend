import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUsersAndAdminsPageComponent } from './add-users-and-admins-page.component';

describe('AddUsersAndAdminsPageComponent', () => {
  let component: AddUsersAndAdminsPageComponent;
  let fixture: ComponentFixture<AddUsersAndAdminsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUsersAndAdminsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddUsersAndAdminsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
