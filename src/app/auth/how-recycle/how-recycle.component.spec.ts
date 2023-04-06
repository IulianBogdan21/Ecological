import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowRecycleComponent } from './how-recycle.component';

describe('HowRecycleComponent', () => {
  let component: HowRecycleComponent;
  let fixture: ComponentFixture<HowRecycleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HowRecycleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HowRecycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
