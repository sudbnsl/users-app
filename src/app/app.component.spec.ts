import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { UsersService } from '../services/users.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let usersService: UsersService;
  let getUsersSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
      ],
      providers: [UsersService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    usersService = TestBed.inject(UsersService);

    getUsersSpy = spyOn(usersService, 'getUsers').and.callThrough();
  });

  afterEach(() => {
    getUsersSpy.calls.reset();
  });

  it('should create the AppComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should populate users property with data returned from UsersService', () => {
    const mockUsers = [
      { id: 1, name: 'User 1' },
      { id: 2, name: 'User 2' },
    ];
    getUsersSpy.and.returnValue(of(mockUsers));
    component.ngOnInit();
    expect(component.users).toEqual(mockUsers);
  });

  it('should call getUsers() method on UsersService when component initializes', () => {
    component.ngOnInit();
    expect(getUsersSpy).toHaveBeenCalled();
  });
});
