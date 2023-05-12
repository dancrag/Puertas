import { TestBed } from '@angular/core/testing';

import { GroupsPersonalizationService } from './groups-personalization.service';

describe('GroupsPersonalizationService', () => {
  let service: GroupsPersonalizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupsPersonalizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
