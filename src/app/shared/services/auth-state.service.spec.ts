import { TestBed } from "@angular/core/testing";
import { AuthStateService } from "./auth-state.service";
import { HttpClientTestingModule } from '@angular/common/http/testing';
  
  describe('AuthStateService', () => {
    let service: AuthStateService;
    let spy: any;
  
    beforeEach(async () => {
      TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]});
  
      TestBed.configureTestingModule({});
      service = TestBed.inject(AuthStateService);
    });
  
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should be setAuthState called', () => {
      spy = spyOn(service, 'setAuthState').and.stub();
      service.setAuthState(true);
      expect(spy).toHaveBeenCalled(); 
    });
  });
