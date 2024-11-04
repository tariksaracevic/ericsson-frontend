import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateEditTaskListComponent} from './create-edit-task-list.component';

describe('CreateEditColumnComponent', () => {
  let component: CreateEditTaskListComponent;
  let fixture: ComponentFixture<CreateEditTaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditTaskListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CreateEditTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
