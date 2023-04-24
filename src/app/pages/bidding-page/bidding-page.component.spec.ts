import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiddingPageComponent } from './bidding-page.component';

describe('BiddingPageComponent', () => {
  let component: BiddingPageComponent;
  let fixture: ComponentFixture<BiddingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiddingPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BiddingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
