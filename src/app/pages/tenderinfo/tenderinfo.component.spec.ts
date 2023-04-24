import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderinfoComponent } from './tenderinfo.component';

describe('TenderinfoComponent', () => {
  let component: TenderinfoComponent;
  let fixture: ComponentFixture<TenderinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenderinfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenderinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
